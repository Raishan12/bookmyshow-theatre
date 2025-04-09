import userSchema from "../models/user.models.js"

export const adduser = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body
        console.log(req.body);
        

        console.log("add user in controller");


        if (!(username && email && phone && password)) {
            return res.status(404).send({ error: "please fill all fields" })
        }
        const data = await userSchema.create({ username, email, phone, password })
        res.status(201).send(data)
    } catch (error) {
        console.log(error);

        res.status(500).send(error)
    }
}

export const loaduser = async (req, res) => {
    try {
        const { username, password} = req.body
        const data =await userSchema.findOne({username, password})

        if(!data){
            return res.status(404).send("User Not Found")
        }
        
        res.status(200).send(data)
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}