const router = require("express").Router()

const todoSchema = require("../model/todoSchema.js")

router.route("/tasks")
// SHOW ALL TASKS
    .get((req,res)=>{
        todoSchema.find().then(foundAll=>{
            res.json(foundAll)
        })
    })

// CREATE ONE TASK
    .post((req,res)=>{
        todoSchema.create(req.body).then(created=>{
            res.json(created)
        })
    })


router.route("/tasks/:id")
// SHOW A TASK BY ID
    .get((req,res)=>{
        todoSchema.findById(req.params.id).then(found=>{
            res.json(found)
        })
    })

// DELETE A TASK BY ID
    .delete((req,res)=>{
        todoSchema.findByIdAndDelete(req.params.id).then(deleted=>{
            res.json(deleted)
        })
    })

// DELETE MULTIPLE TASK BY SELECTIONS

// 

// EDIT A TASK BY ID 
    .put((req,res)=>{
        todoSchema.findByIdAndUpdate(req.params.id,req.body,{new:true}).then(edited=>{
            res.json(edited)
        })
    })

module.exports = router