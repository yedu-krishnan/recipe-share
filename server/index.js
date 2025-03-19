const express = require("express")
const mongoose = require("mongoose")
const app =express()
const dotenv = require("dotenv").config()


const core = require("cors")
const PORT = process.env.PORT

app.use(express.json())
app.use(core())
app.use(express.static("public"))

app.use("/", require("./routes/user"))
app.use("/recipe", require("./routes/recipe"))

mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('connected to mongoDB')
})
.catch((err)=>{console.log(err)})

app.listen(PORT,(err)=>{
    console.log(`listning on port ${PORT}`)
})