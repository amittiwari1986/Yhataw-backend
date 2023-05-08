const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const  morgan = require('morgan')
const port = 5000;
dotenv.config()
//middleWares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
//Routes
app.use("/",require("./routes/userroutes"))
app.use("/",require("./routes/auth"))
const server = app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})