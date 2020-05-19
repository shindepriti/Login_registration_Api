/***************************************************************
 * @purpose  : Define Login and Register Function 
 * @file     : userController.js              
 * @overview : Hash Function To Encrypt password And Send User 
 *             Status Code And Response And Error
 * @author   : priti shinde
 * @since    : 12/5/2020
***************************************************************/
const service = require("../service/userService")
const validFields = require("../validation/userValid")
const { check, validationResult } = require('express-validator');
const bcrypt = require("bcrypt")

class UserController {

    hash = (password) =>{
        var salt = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(password,salt)
        return hashPassword
    }

    create = (req, res) => {
        if(validFields.dataValidation)
            var errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
        }
        else{
            var user = {
                firstName: req.body.firstName,
                lastName : req.body.lastName,
                emailId : req.body.emailId,
                password :this.hash(req.body.password)
            }
            service.create(user,(err,data) => {
                if(err){
                     res.status(500).json({
                        message:err
                    })
                }else{
                    res.status(200).json({
                        message: "Registration sucessfull",Data:data
                    })
                }
                
            })
        } 
    }    

    login = (req,res)=>{
        if(validFields.dataValidation)
            var errors = validationResult(req);
            var responseResult = {};
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
        }else {
            var user = {
                emailId : req.body.emailId,
                password :req.body.password
            }
            service.login(user, (err, result) => {
                if (err) {
                    responseResult.success = false;
                    responseResult.error = err;
                    res.status(422).send(responseResult)
                }else {
                     responseResult.success = true
                    responseResult.result = result
                    res.status(200).send(responseResult)
                }
            })
        }
    }

}
module.exports = new UserController;