const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

//parse Text As url Encoded Data
app.use(bodyParser.urlencoded({ extended: true }))

// It parses incoming requests with JSON payloads and is based on body-parser.
app.use(bodyParser.json())

const dbConfig = require("./config/database.config")
const mongoose = require("mongoose")

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url,{
   useNewUrlParser:true 
}).then(() => {
    console.log("Sucessfully connect to database")
}).catch(err => {
    console.log("Could Not Connect To Database",err)
    process.exit();
})

app.get('/',(req,res) => {
    res.json({"message":"Welcome To Registartion Page"})
});

//setting registration route express app 
require('./routes/user.routes')(app)


app.listen(3000,() =>{
        console.log("Server Listening On Port 3000")
})