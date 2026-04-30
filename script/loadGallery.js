async function LoadGallery(){
    try{
        const template = document.getElementById("cardTemplate");
        const container = document.getElementById("container");
        
        const cats = await getCats();
        
        cats.forEach((cat) => {
            console.log(cat.breeds[0].name + ": " + cat.breeds[0].description + " " + cat.url);
            
            const clone = template.content.cloneNode(true);
            clone.querySelector("h3").textContent = cat.breeds[0].name;
            clone.querySelector("p").textContent = cat.breeds[0].description;
            clone.querySelector("img").src = cat.url ?
             `https://api.thecatapi.com/v1/images/${cat.url}.jpg` : "pics/cute-smiling-cat-flat-style-doodle-cartoon.png";

            container.appendChild(clone);
            // Code to display each cat in the gallery
        });
    } catch (error){
        console.log("Error loading cat gallery:", error.message);
    }
}

LoadGallery();