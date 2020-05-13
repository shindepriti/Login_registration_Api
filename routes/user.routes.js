module.exports  = (app) =>   {

    const user = require("../controller/user.controller")

    app.post('/register',user.create)

    app.get('/login',user.findAll)

    app.get('/login/:id',user.findOne)
}


