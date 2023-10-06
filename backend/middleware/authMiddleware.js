const jwt = require("jsonwebtoken")
const userSchema = require("../model/userSchema.js")
require("dotenv").config()

const protect = async (req,res,next) =>{

    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.verifiedUser = await userSchema.findById(decoded.id).select("-password")
            next()
        } catch (error) {
            res.status(401).json("not authorized")
        }
    }

    if(!token){
        res.status(401).json("no token, not authorized")

    }
}



module.exports = {protect}