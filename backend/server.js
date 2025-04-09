import express from "express"
import connection from "./connection.js"
import path from "path"
import url from "url"
import movieRoutes from "./routes/movie_route.js"
import userRoutes from "./routes/user_route.js"

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
app.get("/movie", (req, res) => {
    try {
        res.status(200).sendFile(path.join(frontend, "movie.html"))
    } catch (error) {
        console.log(error);
    }
})
app.get("/update", (req, res) => {
    res.status(200).sendFile(path.join(frontend, "updatemovie.html"))
})
app.get("/signup", (req, res) => {
    res.status(200).sendFile(path.join(frontend, "signup.html"))
})
app.get("/signin", (req, res) => {
    res.status(200).sendFile(path.join(frontend, "signin.html"))
})

app.use("/api/movie", movieRoutes)
app.use("/api/sign", userRoutes)

connection().then(() => {
    app.listen(port, () => {
        console.log(`server running at http://localhost:${port}`)
    })
}).catch((err) => console.log(err))