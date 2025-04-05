console.log("script page for load data")
// loaddata works here

async function loadData(){
    const res = await fetch("http://localhost:5000/loaddata")
    const data = await res.json()
    console.log(data);

    let str=""
    data.forEach(movie=>{
        str += `
        <div class="card">
            <img src="${movie.poster}" alt="${movie.name}">
            <p class="title">${movie.name}</p>
            <p class="category">${movie.category}</p>
        </div>
        `
    })
    document.getElementById("container").innerHTML=str
    
}
loadData()