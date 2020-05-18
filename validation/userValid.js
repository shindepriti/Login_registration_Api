const { check} = require('express-validator');

class userValidation {

    dataValidation() {
        check('firstName',"Fistname must contain 3 characters").isLength({ min : 3})
        check('lastName',"Lastname must contain 3 characters").isLength({ min : 1})
        check('emailId',"Invalid Email").isEmail()
        check('password',"password must contain 8 character").isLength({min:8})
}
    emailRegx(){
        return [/^([a-zA-Z]{3,}([._+-]?[a-zA-Z0-9])*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}[.]?[a-zA-Z]*)$/,'is invalid']
    }

}
module.exports = new userValidation();