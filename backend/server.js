import express from "express"
import connection from "./connection.js"
import movieSchema from "./models/movie.models.js"
import path from "path"
import url from "url"

const port = 5000
const app = express()

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const frontend = path.join(__dirname, "..", "frontend")

app.use(express.static(frontend))
app.use(express.json({limit:"15mb"}))
app.get("/moviesAdd", (req, res) => {
    res.status(200).sendFile(path.join(frontend, "moviesAdd.html"))
})

app.get("/moviesAdd.js", (req, res) => {
    res.status(200).sendFile(path.join(frontend, "moviesAdd.js"))
})

app.post("/addmovie", async (req, res) => {
    console.log("inside add movie")
    console.log(req.body.name);

    try {
        const { name, screen, language, duration, certificate, category, releaseDate, poster, banner } = req.body
        console.log("in try", name, screen, language, duration, certificate, category, releaseDate);

        if (!name || !screen || !language || !duration || !certificate || !category || !releaseDate || !poster || !banner) {
            return res.status(404).send({ error: "please fill all fields" })
        }
        const data = await movieSchema.create({ name, screen, language, duration, category, category, releaseDate, poster, banner })
        res.status(201).send(data)
    } catch (error) {
        res.status(500).send({ error: error })
    }
})


connection().then(() => {
    app.listen(port, () => {
        console.log(`server running at http://localhost:${port}`)
    })
}).catch((err) => console.log(err))