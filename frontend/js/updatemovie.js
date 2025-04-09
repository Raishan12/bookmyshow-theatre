const params = new URLSearchParams(window.location.search);
let id = params.get("id");
console.log(id);

var newposter = ""
var newbanner = ""

async function movieData() {
    const res = await fetch(`http://localhost:5000/api/movie/moviedata/${id}`)
    const data = await res.json()

    if (res.status === 200) {
        const movie = data[0]


        document.getElementById("name").value = movie.name


        if (movie.screen.includes("2K"))
            document.getElementById("2k").checked = true
        if (movie.screen.includes("4K"))
            document.getElementById("4k").checked = true
        if (movie.screen.includes("IMAX"))
            document.getElementById("imax").checked = true


        if (movie.language.includes("Malayalam"))
            document.getElementById("malayalam").checked = true
        if (movie.language.includes("English"))
            document.getElementById("english").checked = true
        if (movie.language.includes("Tamil"))
            document.getElementById("tamil").checked = true
        if (movie.language.includes("Hindi"))
            document.getElementById("hindi").checked = true
        if (movie.language.includes("Telugu"))
            document.getElementById("telugu").checked = true
        if (movie.language.includes("Kannada"))
            document.getElementById("kannada").checked = true


        dur=""
        duration=movie.duration.split(" ")
        dur="0"+duration[0].slice(0,1)+":"+duration[1].slice(0,2)
        document.getElementById("duration").value = dur


        movie.category.forEach((cat) => {
            if (document.getElementById(cat)) {
                document.getElementById(cat).checked = true
            }
        });

        newposter = movie.poster
        newbanner = movie.banner

        document.getElementById("posterpreview").innerHTML = `<img style="height:100%;" src="${movie.poster}" alt="poster preview">`

        document.getElementById("bannerpreview").innerHTML = `<img style="width:100%;" src="${movie.banner}" alt="banner preview">`

        document.getElementById("certificate").value = movie.certificate;


        document.getElementById("releaseDate").value = movie.releaseDate.slice(0, 10)
    } else {
        alert("Error fetching movie data!")
    }
}

movieData()

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

document.getElementById("movieForm").addEventListener("submit", async(e)=>{
    e.preventDefault()

    let screen = []
    let language = []
    let category = []
    let name = document.getElementById("name").value
    // let screen = document.getElementById("screen").value
    // let language = document.getElementById("language").value
    let duration = document.getElementById("duration").value
    let certificate = document.getElementById("certificate").value
    // let category = document.getElementById("category").value
    let releaseDate = document.getElementById("releaseDate").value
    
    let hm = duration.split(":")
    hm[0] = hm[0].slice(1,)
    duration = hm[0]+"hr "+hm[1]+"min"
    console.log(duration);

    if (document.getElementById("2k").checked)
        screen.push("2K")
    if (document.getElementById("4k").checked)
        screen.push("4K")
    if (document.getElementById("imax").checked)
        screen.push("IMAX")

    if (document.getElementById("malayalam").checked)
        language.push("Malayalam")
    if (document.getElementById("english").checked)
        language.push("English")
    if (document.getElementById("tamil").checked)
        language.push("Tamil")
    if (document.getElementById("hindi").checked)
        language.push("Hindi")
    if (document.getElementById("telugu").checked)
        language.push("Telugu")
    if (document.getElementById("kannada").checked)
        language.push("Kannada")


    if (document.getElementById("Action").checked)
        category.push("Action")
    if (document.getElementById("Comedy").checked)
        category.push("Comedy")
    if (document.getElementById("Thriller").checked)
        category.push("Thriller")
    if (document.getElementById("Romantic").checked)
        category.push("Romantic")
    if (document.getElementById("Horror").checked)
        category.push("Horror")
    if (document.getElementById("Drama").checked)
        category.push("Drama")


    if(poster=="")
        poster=newposter
    if(banner=="")
        banner=newbanner

    try {
        const res = await fetch(`http://localhost:5000/api/movie/updatemovie/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name,screen,language,duration,certificate,category,releaseDate,poster,banner}),
        });

        const data = await res.json()

        if (res.status === 200) {
            window.location.href = "http://localhost:5000/"
        } else {
            alert(data.error)
        }
    } catch (error) {
        console.log(error)
        alert(error)
    }
});

