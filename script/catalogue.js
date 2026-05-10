const catsPerPage = 10;
let currentPage = 1;
let allCats = [];

import { addToCart } from "./cart.js";

// Global variable to store all cats for searching and pagination
async function LoadCatalogue() {
    try {
        allCats = await getCats(); // store globally
        renderPage(currentPage, allCats);

        const searchInput = document.getElementById("searchInput");
        if (searchInput) {
            searchInput.addEventListener("input", function() {
                const searchWord = this.value.toLowerCase();
                const filtered = allCats.filter(cat =>
                    cat.breeds[0].name.toLowerCase().includes(searchWord) ||
                    cat.breeds[0].origin.toLowerCase().includes(searchWord) ||
                    cat.breeds[0].description.toLowerCase().includes(searchWord)
                );
                renderPage(1, filtered);
            });
        }
    } catch (error) {
        console.log("Error loading cat gallery:", error.message);
    }
}

const template = document.getElementById("cardTemplate");

// Render the current page of cats
function renderPage(page, cats) {
    const template = document.getElementById("cardTemplate");
    const container = document.getElementById("container");
    const pagination = document.getElementById("pagination");

    // Clear existing content
    container.innerHTML = "";
    const start = (page - 1) * catsPerPage;
    const pageCats = cats.slice(start, start + catsPerPage);

    // Render cat cards for the current page
    pageCats.forEach((cat) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector("h3").textContent = cat.breeds[0].name;
        clone.querySelector("small").textContent = cat.breeds[0].origin;
        clone.querySelector("p").textContent = cat.breeds[0].description;

        clone.querySelector("img").src = cat.url ?? "pics/cute-smiling-cat-flat-style-doodle-cartoon.png";

        const price = (Math.random() * 100).toFixed(2); // Random price for demo
        clone.querySelector("[data-price]").textContent = `$${price}`;

        clone.querySelector(".btn").textContent = "Add to Cart";
        clone.querySelector(".btn").addEventListener("click", () => {
            addToCart({ name: cat.breeds[0].name, price, image: cat.url });
            console.log(`Added to cart: ${cat.breeds[0].name} - $${price}`);
        });

        container.appendChild(clone);
    });

    updatePagination(page, Math.ceil(cats.length / catsPerPage), cats);
}

// Update pagination controls based on the current page and total pages
function updatePagination(page, totalPages, cats) {
    // Clear existing pagination
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    // Previous button
    const prevButton = document.createElement("li");
    prevButton.innerHTML = `<a href="#" ${page === 1 ? 'class="disabled"' : ""}>&laquo;</a>`;
    if (page > 1) prevButton.querySelector("a").addEventListener("click", (e) => {
        e.preventDefault();
        renderPage(page - 1, cats);
    });
    pagination.appendChild(prevButton);

    // Page number buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("li");
        pageButton.innerHTML = `<a href="#" ${i === page ? 'class="active"' : ""}>${i}</a>`;
        pageButton.querySelector("a").addEventListener("click", (e) => {
            e.preventDefault();
            renderPage(i, cats);
        });
        pagination.appendChild(pageButton);
    }
    
    // Next button
    const nextButton = document.createElement("li");
    nextButton.innerHTML = `<a href="#" ${page === totalPages ? 'class="disabled"' : ""}>&raquo;</a>`;
    if (page < totalPages) nextButton.querySelector("a").addEventListener("click", (e) => {
        e.preventDefault();
        renderPage(page + 1, cats);
    });
    pagination.appendChild(nextButton);
}

LoadCatalogue();