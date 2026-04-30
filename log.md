## api.js file ##

async function getCats(){
    const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
    if (!response.ok){
        throw new Error(`HTTP Error: ${response.status}`);
    }
    const cats = await response.json();
    return cats;
}

## filterGallery.js ##
filterSelection("all") // Execute the function and show all columns
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    HideCategory(x[i], "show");
    if (x[i].className.indexOf(c) > -1) ShowCategory(x[i], "show");
  }
}

// Show filtered elements
function ShowCategory(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function HideCategory(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

const searchInput = document.getElementById('searchInput');
const cats = await getCats();
searchFunction()
function searchFunction(element, name) {
    if (typeof name !== "string" || name.trim() === "") {
        console.error("Invalid search query. Please provide a non-empty string.");
        return;
    }

    return cats.filter(cat => cat.name.toLowerCase().includes(name.toLowerCase()));
}

## loadGallery ##
async function LoadGallery(){
    try{
        const template = document.getElementById("cardTemplate");
        const container = document.getElementById("container");
        
        const cats = await getCats();

        cats.forEach((cat) => {
            console.log(cat.name);

            const clone = template.content.cloneNode(true);
            clone.querySelector("h3").textContent = cat.name;
            clone.querySelector("p").textContent = cat.description;
            clone.querySelector("img").src = cat.reference_image_id ?
             `https://api.thecatapi.com/v1/images/${cat.reference_image_id}.jpg` : "pics/cute-smiling-cat-flat-style-doodle-cartoon.png";

            container.appendChild(clone);
            // Code to display each cat in the gallery
        });
    } catch (error){
        console.error("Error loading cat gallery:", error.message);
    }
}

LoadGallery();

<!doctype html>
<input type="text">
<input type="email" for="email">
<input type="text" for="address">
*{
    margin: 0; padding: 0; box-sizing: border-box; 
}
body{
    font-family: arial, sans-serif;
    padding: 2rem;
    background: #f8fafc;
}
.form{
    color:
    background:
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid black;
}

const listofcats = [];

listofcats.push("katt");

console.log(listofcats[0]);

## catalogue.js ##
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="description" content="Catalogue of the cat store"/>
        <title>Meowstore</title>
        <link rel="stylesheet" href="/css/catalogueStyle.css"/>
        <link rel="stylesheet" href="/css/navigationStyle.css"/>
        <script src="/script/api.js" defer></script>
        <script src="/script/loadGallery.js" defer></script>
        <script src="/script/searchBar.js" defer></script>
    </head>
    <body>
        <header>
            <h1 style="text-align: center;">Meowstore</h1>
            <nav>
                <ul>
                    <li><a href="home.html">Home</a></li>
                    <li><a href="catalogue.html">Catalogue</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li><a href="cart.html">Cart</a></li>
                </ul>
            </nav>
        </header>
        <main>
            <div id="myBtnContainer">
                <button class="btn active" onclick="filterSelection('all')">All</button>
                <button class="btn" onclick="filterSelection('pets')">Pets & Accessories</button>
                <button class="btn" onclick="filterSelection('food')">Food & Nutrition</button>
                <button class="btn" onclick="filterSelection('hygiene')">Hygiene & Litter</button>
                <button class="btn" onclick="filterSelection('toys')">Toys & Enrichment</button>
                <button class="btn" onclick="filterSelection('sleep')">Furniture & Resting</button>
                <button class="btn" onclick="filterSelection('health')">Health & Grooming</button>
                <input type="text" id="searchInput" onchange="searchFunction()" placeholder="Search catalogue...">
            </div>
            <template id="cardTemplate">
                <div class="row">
                    <div class="column placeholder">
                        <div class="content">
                            <img src="" alt="Image Reference" style="width:100%"/>
                            <h3></h3>
                            <p></p>
                        </div>
                    </div>
                </div>
            </template>
            <div id="container"></div>
        </main>
        <footer>
            <nav>

            </nav>
            <p><a href="privacy.html">Privacy Policy</a></p>
            <p><a href="contact.html">Contact Us</a></p>
            <p>Copyright © 2024 Meowstore AB. All rights reserved.</p>
        </footer>
        <script src="/script/filterGallery.js"></script>
    </body>
</html>