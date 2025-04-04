console.log("script page for add movies")


// catch and convert image 

let poster=""
document.getElementById("poster").addEventListener("change",async(e)=>{
    console.log(e.target.files)
    poster = await convertBase64(e.target.files[0])
    document.getElementById("posterpreview").innerHTML=`<img width="100%" src="${poster}" alt="image preview">`
})

let banner=""
document.getElementById("banner").addEventListener("change",async(e)=>{
    console.log(e.target.files)
    banner = await convertBase64(e.target.files[0])
    document.getElementById("bannerpreview").innerHTML=`<img width="100%" src="${banner}" alt="image preview">`
})


function convertBase64(file){
    return new Promise((resolve, reject)=>{
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)

        fileReader.onload=()=>{
            resolve(fileReader.result)
        }

        fileReader.onerror=(error)=>{
            reject(error)
        }
    }) 
}




// add movie
document.getElementById("movieForm").addEventListener("submit",async(e)=>{
    e.preventDefault()
    let name = document.getElementById("name").value
    let screen = document.getElementById("screen").value
    let language = document.getElementById("language").value
    let duration = document.getElementById("duration").value
    let certificate = document.getElementById("certificate").value
    let category = document.getElementById("category").value
    let releaseDate = document.getElementById("releaseDate").value
    console.log(name, screen, language, duration, certificate, category, releaseDate, poster, banner );


    try {
        const res = await fetch("http://localhost:5000/addmovie",{
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify({name,screen,language,duration,certificate,category,releaseDate,poster,banner})
        })
        const data = await res.json()
        if(res.status===201){
            // #want to redirect to index.html
            // window.location.href=".../index.html"    
            alert("success")  
        }else{
            console.log(data.error);
            
            alert(data.error)
        }

    } catch (error) {
        console.log(error);
        
    }
})
