const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const  morgan = require('morgan')

// Requiring in-built https for creating
// https server
const https = require("https");


// Requiring file system to use local files
const fs = require("fs");

// Parsing the form of body to take
// input from forms
const bodyParser = require("body-parser");

// Configuring express to use body-parser
// as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dotenv.config()
//middleWares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
//Routes
app.use("/",require("./routes/userroutes"))
app.use("/",require("./routes/auth"))
app.use("/",require("./routes/masterroute"))
app.use("/",require("./routes/projectroute"))
app.use("/",require("./routes/leadroute"))
app.use("/",require("./routes/reportroute"))
// Creating object of key and certificate
// for SSL
const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
};
const server = https.createServer(options, app).listen(process.env.PORT,()=>{
    console.log("Backend Up",server.address().port)
})
