/*************************************************************
 * @purpose : Require Express Framework And BodyParser
 *            connetion Mongodb And Server
 * @file    : server.js
 * @author  : priti shinde
 * @since   : 12/5/2020
***********************************************************/
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

app.get("/",(req,res) =>{
        res.json({ message :"User Backend Api"})
})

app.listen(process.env.PORT,() =>{
        console.log(`Server Listening On Port ${process.env.PORT}`)
})

module.exports = app