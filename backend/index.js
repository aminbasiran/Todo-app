const express = require("express")
const cors = require('cors');
const mongoConnect = require("./mongooseConnect.js")
const task_route = require("./controller/tasks_ver1.js")
const user_route = require("./controller/user_ver1.js")
const passport = require("passport")
require("./middleware/passportMiddleware.js")
const expressAsyncHandler = require("./middleware/asyncMiddleware.js")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.json())

app.use("/v1/api/tasks",passport.initialize(),task_route)
app.use("/v1/api/users",user_route)
app.use(expressAsyncHandler)

app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`)
})

mongoConnect()