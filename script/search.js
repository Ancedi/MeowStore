const searchInput = document.getElementById('searchInput');

async function searchFunction() {
    const cats = await getCats();
    const query = searchInput.value.trim();
    
    try{
        if (query === ""){
            console.warn("Search query is empty. Please enter a search term.");
            return []; // Return all cats if the search query is empty
        }

        return cats.filter(cat => cat.name.toLowerCase().includes(query.toLowerCase()));
    }
    catch (error){
        console.error("Error fetching cats:", error.message);
        return [];
    }

}