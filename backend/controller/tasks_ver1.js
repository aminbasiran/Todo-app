const router = require("express").Router()
const todoSchema = require("../model/todoSchema.js")
const {protect} = require("../middleware/authMiddleware.js")

router.route("")
// SHOW ALL TASKS
    .get(protect, async (req,res,next)=>{
        try{
            const foundAll = await todoSchema.find({id:req.verifiedUser.id})
            res.json(foundAll)
        }

        catch(err){
            next(err)
        }
    })

// CREATE ONE TASK
    .post(protect, async (req,res,next)=>{
        try{
            req.body.id = req.verifiedUser._id
            todoSchema.create(req.body).then(created=>{
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