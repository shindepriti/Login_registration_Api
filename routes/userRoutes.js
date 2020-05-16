module.exports  = (app) =>   {

    const user = require("../controller/userController")

    app.post('/register',user.create)

    app.get('/login',user.login)
}


