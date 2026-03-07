require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const authRoute = require("./Router/AuthRouter")
const goalRoute = require("./Router/GoalRouter")

const PORT = process.env.PORT
const Mongo_Url = process.env.MONGO_URI

mongoose.connect(Mongo_Url)
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err))

app.get("/",(req,res)=>{
res.send("API running")
})

app.use("/",authRoute)
app.use("/",goalRoute)

app.listen(PORT,()=>{
console.log("Server running on port "+PORT)
})
