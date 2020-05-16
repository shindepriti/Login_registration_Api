const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/userRoutes')
require('dotenv').config();

// create express app
const app = express();

//parse Text As url Encoded Data
app.use(bodyParser.urlencoded({ extended: true }))

// It parses incoming requests with JSON payloads and is based on body-parser.
app.use(bodyParser.json())

const dbConfig = require("./config/database.config") (mongoConnection)

app.use('/',route)

app.listen(process.env.PORT,() =>{
        console.log(`Server Listening On Port ${process.env.PORT}`)
})