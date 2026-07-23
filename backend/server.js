import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"

//app config
const app = express()

const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//DB connection
connectDB()

app.get('/',(req,res)=>{
    res.status(200).json("API working")
})

app.listen(port , ()=>{
    console.log("Server run on port http://localhost:4000")
})


// mongodb+srv://foodApp:<db_password>@foodapp.acgo31m.mongodb.net/?appName=foodApp