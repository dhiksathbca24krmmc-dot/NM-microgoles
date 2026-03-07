const mongoose = require("mongoose")

const GoalSchema = new mongoose.Schema({

title:{
type:String,
required:true
},

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}

})

module.exports = mongoose.model("Goal",GoalSchema)
