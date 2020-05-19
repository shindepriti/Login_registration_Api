/**************************************************************
 * @purpose  : Define Express Validation For Email 
 * @file     : userValid.js
 * @overview : Define Function To validate User When Register 
 *             And Login. 
 * @author   : priti shinde
 * @since    : 18/5/2020
**************************************************************/

const { check} = require('express-validator');

class userValidation {

    dataValidation() {
        check('firstName',"Fistname must contain 3 characters").isLength({ min : 3})
        check('lastName',"Lastname must contain 3 characters").isLength({ min : 1})
        check('emailId',"Invalid Email").isEmail()
        check('password',"password must contain 8 character").isLength({min:8})
}
   
}
module.exports = new userValidation();