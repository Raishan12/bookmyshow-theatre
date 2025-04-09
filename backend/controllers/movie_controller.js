import movieSchema from "../models/movie.models.js"

export const addmovie = async (req, res) => {
    try {
        const { name, screen, language, duration, certificate, category, releaseDate, poster, banner } = req.body

        console.log("in try");


        if (!(name && screen && language && duration && certificate && category && releaseDate && poster && banner)) {
            return res.status(404).send({ error: "please fill all fields" })
        }
        const data = await movieSchema.create({ name, screen, language, duration, certificate, category, releaseDate, poster, banner })
        res.status(201).send(data)
    } catch (error) {
        console.log(error);

        res.status(500).send(error)
    }
}

export const loadmovie = async (req, res) => {
    try {
        const data = await movieSchema.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({ error })
    }
}

export const moviedata = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        const data = await movieSchema.find({ _id: id })

        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({ error })
    }
}

export const deletemovie = async (req, res) => {
    try {
        const { id } = req.params
        const data = await movieSchema.findByIdAndDelete(
            id,
            { new: true }
        )
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send({ err })
    }
}

export const updatemovie = async (req, res) => {
    try {
        const { id } = req.params
        let { name, screen, language, duration, certificate, category, releaseDate, poster, banner } = req.body
        const data = await movieSchema.findByIdAndUpdate(
            id,
            { name, screen, language, duration, certificate, category, releaseDate, poster, banner },
            { new: true }
        )
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send({ error: err })
    }
}