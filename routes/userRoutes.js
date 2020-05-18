const express = require('express')
const router = express.Router()

    const user = require("../controller/userController")

    router.post('/register',user.create)

    router.post('/login',user.login)

module.exports=router


