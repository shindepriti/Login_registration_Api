const service = require("../service/userService")
const { check, validationResult } = require('express-validator');
const bcrypt = require("bcrypt")
const jsonTocken = require("jsonwebtoken")

class UserController {
    create = (req, res) => {
    check('firstName').isLength({ min : 3}).withMessage("Fistname must contain 3 characters")
    check('lastName').isLength({ min : 3}).withMessage("Lastname must contain 3 characters")
    check('emailId').isEmail().withMessage("Invalid Email")
    check('password').isLength({min:8}).withMessage("password must contain 8 character")
    
    var errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
    else{
        var user = {
            firstName: req.body.firstName,
            lastName : req.body.lastName,
            emailId : req.body.emailId,
            password :bcrypt.hashSync( req.body.password,10)
        }
        service.create(user,((err,data) => {
            if(err){
                res.status(500).send({
                    message:err.message || "Some Error has Occured"
                })
            }
            res.json(data)
        }))
    }
     
   
}

login=(req,res)=>{
    service.login({emailId: req.body.emailId},(err,data)=>{
        if(err){
            res.send('Server Error');
        }else if(data==undefined){
                res.send('User Not Defined ');
            }
            else {
                let password = req.body.password
                bcrypt.compare(password,data.password,(err,result)=>{
                if(result){
                    var token = jsonTocken.sign({password: data.password}, 'secretKey', {expiresIn: '1h'});
                    res.send({message:'Login Successfull',token:token})
                }
                else {
                    res.send('Login Info Incorrect')
                }
            })
        }
    });
}
}
module.exports = new UserController;