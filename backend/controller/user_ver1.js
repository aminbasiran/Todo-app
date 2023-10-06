const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userSchema = require("../model/userSchema.js")
const {protect} = require("../middleware/authMiddleware.js")
require("dotenv").config()


const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}

router.route("/register")
    .post(async (req,res,next)=>{
        try{
            const user = await userSchema.findOne({username:req.body.username})
            user  ? 
            res.status(400).json("Account already exists") :
            bcrypt.genSalt(10, (err, salt) => {
                // handle err
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    // handle err
                    req.body.password = hash
                    userSchema.create(req.body).then(created => {
                        if(created){
                            res.status(201).json({
                                id: created._id,
                                name: created.username,
                                password: created.password
                            })
                        }
                    })
                });
            });
                
        }

        catch(err){
            next(err)

        }
    })

router.route("/signin")
    .post(async (req,res,next)=>{
        try{
            const user = await userSchema.findOne({username:req.body.username})

            if(!user){
                return res.json("there is no account registered")
            }

            if(!await bcrypt.compare(req.body.password,user.password)){
                return res.json("incorrect password")
            }

            res.status(200).json({
                id: user._id,
                name: user.username,
                password: user.password,
                // SAVE THIS TOKEN SERVER SIDE (localStorage, cookies)
                token: generateToken(user._id)    
            })

        }catch (error) {
            next(error)
        }
    })

router.route("/private")
    .get(protect,(req,res)=>{
        res.json(req.verifiedUser)
    })

module.exports = router