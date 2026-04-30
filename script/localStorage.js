async function SaveData(){
    localStorage.setItem("key", "value");
}

async function GetData(){
    return localStorage.getItem("key");
}

async function DeleteData(){
    localStorage.removeItem("key");
}