import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRoute from "./routes/cartRoute.js"
import 'dotenv/config'
import orderRoute from "./routes/orderRoute.js"

//app config
const app = express()

const port = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors())

//DB connection
connectDB()

// API endPoints
app.use("/api/food" , foodRouter)
app.use('/images',express.static('uploads'))
app.use("/api/user" , userRouter)
app.use("/api/cart" , cartRoute)
app.use("/api/order",orderRoute)

app.get('/',(req,res)=>{
    res.status(200).json("API working")
})

app.listen(port , ()=>{
    console.log("Server run on port http://localhost:4000")
})

