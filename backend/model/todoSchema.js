const mongoose = require("mongoose")


const todoSchema = mongoose.Schema(
    {
        title: {type:String},
        description : {type:String}
    },
    {timestamps:true}
)

module.exports = mongoose.model("todo",todoSchema)