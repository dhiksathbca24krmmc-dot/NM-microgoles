const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../Model/UserModel")

// CREATE USER
router.post("/create",async(req,res)=>{

try{

const {name,email,password} = req.body

const existingUser = await User.findOne({email})

if(existingUser){
return res.json({
success:false,
message:"User already exists"
})
}

const hashedPassword = await bcrypt.hash(password,10)

const user = new User({
name,
email,
password:hashedPassword
})

await user.save()

const token = jwt.sign(
{id:user._id},
process.env.JWT_SECRET,
{expiresIn:"1d"}
)

res.json({
success:true,
message:"user is created",
token:token,
data:user
})

}catch(err){

res.status(500).json({
message:err.message
})

}

})

// LOGIN USER
router.post("/login",async(req,res)=>{

try{

const {email,password} = req.body

const user = await User.findOne({email})

if(!user){
return res.json({
success:false,
message:"User not found"
})
}

const isMatch = await bcrypt.compare(password,user.password)

if(!isMatch){
return res.json({
success:false,
message:"Invalid password"
})
}

const token = jwt.sign(
{id:user._id},
process.env.JWT_SECRET,
{expiresIn:"1d"}
)

res.json({
success:true,
message:"Login successful",
token:token
})

}catch(err){

res.status(500).json({
message:err.message
})

}

})

module.exports = router
