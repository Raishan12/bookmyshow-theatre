const params = new URLSearchParams(window.location.search)
let id = params.get("id")
console.log(id);

async function moviedata(){
    const res = await fetch(`http://localhost:5000/api/movie/moviedata/${id}`)
    console.log(res);
    const data = await res.json()
    console.log(data)

    str = ""
    data.forEach(movie=>{

        screen=movie.screen.join(", ")
        language=movie.language.join(", ")
        category=movie.category.join(", ")
        document.getElementById("container").style.backgroundImage=`url(${movie.banner})`
        
        str += `
        <div class="poster"><img src=${movie.poster}></div>
        <div class="details">
        <div class="title">${movie.name}</div>
        <div class="sl"><span class="screen">${screen}</span>  <span class="screen">${language}</span></div>
        <div class="dccr">${movie.duration}  •  ${category}  •  ${movie.certificate}  •  ${movie.releaseDate.slice(0,10)}</div>
        <div class="buttons"><a href="/update?id=${movie._id}"><div>Edit</div></a> <div onclick="movieDelete()" class="delbtn">Delete</div></div>
        </div>
        `
    })
    document.getElementById("container").innerHTML = str
    
}

moviedata()

async function movieDelete() {
    console.log("delete function");
    console.log(id);
    try {
        const res = await fetch(`http://localhost:5000/api/movie/delete/${id}`)
        const data = res.json()
        if(res.status==200){
            window.location.href="http://localhost:5000/"  
        } else {
            alert(data.error)
        }
    } catch (error) {
        console.log(error);
        
    }        
}