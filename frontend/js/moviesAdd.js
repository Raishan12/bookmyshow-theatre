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
    let screen=[]
    let language=[]
    let category=[]
    let name = document.getElementById("name").value
    // let screen = document.getElementById("screen").value
    // let language = document.getElementById("language").value
    let duration = document.getElementById("duration").value
    let certificate = document.getElementById("certificate").value
    // let category = document.getElementById("category").value
    let releaseDate = document.getElementById("releaseDate").value

    s2k = document.getElementById("2k")
    s4k = document.getElementById("4k")
    simax = document.getElementById("imax")

    if(s2k.checked)
        screen.push("2K")
    if(s4k.checked)
        screen.push("4K")
    if(simax.checked)
        screen.push("imax")

    console.log(screen);
    
    malayalam = document.getElementById("malayalam")
    english = document.getElementById("english")
    tamil = document.getElementById("tamil")
    hindi = document.getElementById("hindi")
    telugu = document.getElementById("telugu")
    kannada = document.getElementById("kannada")

    if(malayalam.checked)
        language.push("Malayalam")
    if(english.checked)
        language.push("English")
    if(tamil.checked)
        language.push("Tamil")
    if(hindi.checked)
        language.push("Hindi")
    if(telugu.checked)
        language.push("Telugu")
    if(kannada.checked)
        language.push("Kannada")

    console.log(certificate);
    console.log(duration);
    let hm = duration.split(":")
    hm[0] = hm[0].slice(1,)
    duration = hm[0]+"hr "+hm[1]+"min"
    console.log(duration);
    
    comedy = document.getElementById("Action")
    action = document.getElementById("Comedy")
    thriller = document.getElementById("Thriller")
    crime = document.getElementById("Crime")
    romantic = document.getElementById("Romantic")
    horror = document.getElementById("Horror")
    animation = document.getElementById("Animation")
    drama = document.getElementById("Drama")
    scifi = document.getElementById("Sci-fi")

    genre = [action, comedy, thriller, crime, romantic, horror, animation, drama, scifi]

    for(let i of genre){
        
        if(i.checked){
            category.push(i.value)
        }
    }
    console.log(category);
    
    

    try {
        const res = await fetch("http://localhost:5000/addmovie",{
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify({name,screen,language,duration,certificate,category,releaseDate,poster,banner})
        })
        const data = await res.json()
        if(res.status===201){
            // #want to redirect to index.html
            // window.location.href="http://localhost:5000/"    
            alert("success")  
        }else{
            console.log(data);
            
            alert(data.error)
        }

    } catch (error) {
        console.log(error);
    }
})
