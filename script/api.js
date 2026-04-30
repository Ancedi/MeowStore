async function getCats(){
    const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1&api_key=live_h8YWhscJZVWoGk9IshWtNApDx9WMXumpAH8aQcBHXoRxFNnsoL5c60KQRigQvrJV');
    if (!response.ok){
        throw new Error(`HTTP Error: ${response.status}`);
    }

    const cats = await response.json();
    return cats;
}