const express = require("express")
const mongoConnect = require("./mongooseConnect.js")
const v1_route = require("./controller/v1.js")

const app = express()
const PORT = process.env.PORT || 3000


app.use(express.json())

app.use("/v1/api",v1_route)

app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`)
})

mongoConnect()