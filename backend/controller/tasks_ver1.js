const router = require("express").Router()
const todoSchema = require("../model/todoSchema.js")
const passport = require("passport")
require("../middleware/passportMiddleware.js")
const asyncHandler = require("express-async-handler")

router.route("")
// SHOW ALL TASKS
    .get(passport.authenticate("jwt",{session:false}), asyncHandler (async (req,res)=>{
            const foundAll = await todoSchema.find({id:req.user._id})
            res.json(foundAll)
    }))

// CREATE ONE TASK
    .post(passport.authenticate("jwt",{session:false}), asyncHandler(async (req,res)=>{
            req.body.id = req.user._id
            todoSchema.create(req.body).then(created=>{
                res.json(created)
            })
        
    }))


router.route("/:id")
// SHOW A TASK BY ID
    .get((req,res)=>{
        todoSchema.findById(req.params.id).then(found=>{
            res.json(found)
        })
    })

// DELETE A TASK BY ID
    .delete(passport.authenticate("jwt",{session:false}), asyncHandler(async (req,res)=>{
        const deleted = await todoSchema.findByIdAndDelete(req.params.id)
        res.json(deleted)
    }))

// DELETE MULTIPLE TASK BY SELECTIONS

// 

// EDIT A TASK BY ID 
    .put((req,res)=>{
        todoSchema.findByIdAndUpdate(req.params.id,req.body,{new:true}).then(edited=>{
            res.json(edited)
        })
    })

module.exports = router