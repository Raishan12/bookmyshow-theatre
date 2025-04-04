import mongoose from "mongoose"
import { release } from "os"

const movieSchema = new mongoose.Schema({
    name:{type:String, required:true},
    screen:{type:Array, required:true},
    language:{type:Array, required:true},
    duraion:{type:String, required:true},
    category:{type:Array, required:true},
    releaseDate:{type:Date, required:true},
    certificate:{type:String, required:true},
    poster:{type:String, required:true},
    banner:{type:String, required:true}
})

export default mongoose.model.Movies || mongoose.model("Movie",movieSchema)