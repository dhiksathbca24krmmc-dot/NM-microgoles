const express = require("express")
const router = express.Router()

const authMiddleware = require("../Middlewares/authMiddleware")
const Goal = require("../Model/GoalModel")

// CREATE GOAL
router.post("/goal",authMiddleware,async(req,res)=>{

try{

const goal = new Goal({
title:"My First Goal",
user:req.user.id
})

await goal.save()

res.json({
message:"Goal created successfully",
goal:goal
})

}catch(err){

res.status(500).json({
message:err.message
})

}

})


// GET ALL GOALS
router.get("/goals",authMiddleware,async(req,res)=>{

try{

const goals = await Goal.find({user:req.user.id})

res.json(goals)

}catch(err){

res.status(500).json({
message:err.message
})

}

})


// DELETE GOAL
router.delete("/goal/:id",authMiddleware,async(req,res)=>{

try{

await Goal.findByIdAndDelete(req.params.id)

res.json({
message:"Goal deleted successfully"
})

}catch(err){

res.status(500).json({
message:err.message
})

}

})

module.exports = router