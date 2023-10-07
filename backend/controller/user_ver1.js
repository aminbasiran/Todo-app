const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userSchema = require("../model/userSchema.js")
const passport = require("passport")
const asyncHandler = require('express-async-handler')

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}

router.route("/register")
    .post(asyncHandler (async (req,res)=>{
        const user = await userSchema.findOne({username:req.body.username}) //check here and fix
        user  ? 
        res.status(400).json("Account already exists") :
        bcrypt.genSalt(10, (err, salt) => {

            if (err){
                console.log("there is an error while generating salt rounds", err)
            }

            bcrypt.hash(req.body.password, salt, (err, hash) => {

                if (err){
                    console.log("there is an error while hashing passwords", err)
                }

                req.body.password = hash
                userSchema.create(req.body).then(created => {

                    if(!created){
                        return res.status().json() // check here and fix
                    }

                    res.status(201).json({
                        id: created._id,
                        name: created.username,
                        password: created.password
                    })
                })
            });
        });
    }))

router.route("/signin")
    .post(asyncHandler (async (req,res)=>{
            const user = await userSchema.findOne({username:req.body.username})

            if(!user){
                return res.json("There is no account registered")
            }

            if(!await bcrypt.compare(req.body.password,user.password)){
                return res.json("Incorrect password")
            }

            res.status(200).json({
                _id: user._id,
                name: user.username,
                password: user.password,
                token: `Bearer ${generateToken(user._id)}`    // SAVE THIS TOKEN SERVER SIDE (localStorage, cookies)  
            })
    }))

router.route("/test")
    .get(asyncHandler(async (req, res) => {
	// throw new SyntaxError()
	throw new SyntaxError()
}))

module.exports = router