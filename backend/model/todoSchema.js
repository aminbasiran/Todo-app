const mongoose = require("mongoose")

const todoSchema = mongoose.Schema(
    {
        id:{type:String,required:true},
        title: {type:String}
    },
    {timestamps:true}
)

module.exports = mongoose.model("todo",todoSchema)