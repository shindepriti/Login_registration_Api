module.exports  = (app) =>   {

    const user = require("../controller/UserController")

    app.post('/register',user.create)

    app.get('/login',user.login)
}


