import express from "express"
import { addmovie, deletemovie, loadmovie, moviedata, updatemovie } from "../controllers/movie_controller.js"



const movieRoutes=express.Router()

movieRoutes.post("/addmovie",addmovie)
movieRoutes.get("/loaddata", loadmovie)
movieRoutes.get("/moviedata/:id", moviedata)
movieRoutes.get('/delete/:id', deletemovie)
movieRoutes.post('/updatemovie/:id', updatemovie)

export default movieRoutes
