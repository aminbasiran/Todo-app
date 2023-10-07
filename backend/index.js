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
app.use(passport.initialize())

app.use("/v1/api/tasks",task_route)
app.use("/v1/api/users",user_route)

// app.use((err, req, res,next) => {  // CHANGE THIS TO A ASYNC ERROR HANDLER MIDDLEWARE
//     console.error("trial",err); // Log the error

//     const statusCode = err instanceof SyntaxError ? 400 : 500;
//     res.status(statusCode).json({
//         error: {
//             message: err.message,
//         }
//     });
// });

app.use(expressAsyncHandler)

app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`)
})

mongoConnect()