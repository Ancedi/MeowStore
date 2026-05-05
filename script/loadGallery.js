const catsPerPage = 10;
let currentPage = 1;

async function LoadGallery(){
    try{
        const template = document.getElementById("cardTemplate");
        const container = document.getElementById("container");
        const pagination = document.getElementById("pagination");
        
        const cats = await getCats();

        function renderPage(page){
            container.innerHTML = "";
            const start = (page - 1) * catsPerPage;
            const pageCats = cats.slice(start, start + catsPerPage);
            pageCats.forEach((cat) => {
                const clone = template.content.cloneNode(true);
                clone.querySelector("h3").textContent = cat.breeds[0].name;
                clone.querySelector("small").textContent = cat.breeds[0].origin;
                clone.querySelector("p").textContent = cat.breeds[0].description;
                clone.querySelector("img").src = cat.url ?? "pics/cute-smiling-cat-flat-style-doodle-cartoon.png";
                container.appendChild(clone);

                console.log(cat.breeds[0].name + ": " + cat.breeds[0].description + " " + cat.url); 
            });

            updatePagination(page, Math.ceil(cats.length / catsPerPage));
        }

        function updatePagination(page, totalPages){
            pagination.innerHTML = "";

            // Previous Button
            const prevButton = document.createElement("li");
            prevButton.innerHTML = `<a href="#" ${page === 1 ? 'class="disabled"' : ""}>&laquo;</a>`;
            if (page > 1) prevButton.querySelector("a").addEventListener("click", (e) =>{
                e.preventDefault();
                renderPage(page - 1);
            });

            pagination.appendChild(prevButton);

            // Page Numbers
            for (let i = 1; i <= totalPages; i++){
                const pageButton = document.createElement("li");
                pageButton.innerHTML = `<a href="#" ${i === page ? 'class="active"' : ""}>${i}</a>`;
                pageButton.querySelector("a").addEventListener("click", (e) =>{
                    e.preventDefault();
                    renderPage(i);
                });

                pagination.appendChild(pageButton);
            }

            // Next Button
            const nextButton = document.createElement("li");
            nextButton.innerHTML = `<a href="#" ${page === totalPages ? 'class="disabled"' : ""}>&raquo;</a>`;
            if (page < totalPages) nextButton.querySelector("a").addEventListener("click", (e) =>{
                e.preventDefault();
                renderPage(page + 1);
            });

            pagination.appendChild(nextButton);
        }

        renderPage(currentPage);
    } catch (error){
        console.log("Error loading cat gallery:", error.message);
    }
}

LoadGallery();