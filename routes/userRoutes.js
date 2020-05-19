/***************************************************************
 * @purpose  : Define Route
 * @file     : userRoute.js              
 * @overview : Define Route To Handle request 
 * @author   : priti shinde
 * @since    : 12/5/2020
***************************************************************/

const express = require('express')
const router = express.Router()

    const user = require("../controller/userController")

    router.post('/register',user.create)

    router.post('/login',user.login)

module.exports=router


