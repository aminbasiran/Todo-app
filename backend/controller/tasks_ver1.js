const router = require("express").Router()
const todoSchema = require("../model/todoSchema.js")
const passport = require("passport")
require("../middleware/passportMiddleware.js")
const asyncHandler = require("express-async-handler")

router.route("")
// SHOW ALL TASKS
    .get(passport.authenticate("jwt",{session:false}), async (req,res,next)=>{
        try{
            const foundAll = await todoSchema.find({id:req.user._id})
            res.json(foundAll)
        }

        catch(err){
            next(err)
        }
    })

// CREATE ONE TASK
    .post(passport.authenticate("jwt",{session:false}), async (req,res,next)=>{
        try{
            req.body.id = req.user._id
            todoSchema.create(req.body).then(created=>{
                console.log(created)
                res.json(created)
            })
        }
        catch(err){
            next(err)
        }
    })


router.route("/:id")
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