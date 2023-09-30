const mongoose = require("mongoose")
require("dotenv").config()

const base = 'mongodb+srv://'
const db_username = process.env.MONGO_USER
const db_password = process.env.MONGO_PS
const db_host = process.env.MONGO_HOST
const db_database =  process.env.MONGO_DATABASE
const connection = `${base}${db_username}:${db_password}@${db_host}/${db_database}`

const establishConnection = async()=>{
    try {
        await mongoose.connect(connection,{useNewUrlParser:true,useUnifiedTopology:true})
        console.log("established!")
    } catch (error) {
        console.error("Error to establish connection with MongoDB: "+error)
        
    }
}

module.exports = establishConnection