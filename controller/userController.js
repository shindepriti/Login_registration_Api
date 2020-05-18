const service = require("../service/userService")
const { check, validationResult } = require('express-validator');
const bcrypt = require("bcrypt")
const jsonToken = require("jsonwebtoken")

class UserController {

    hash = (password) =>{
        var salt = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(password,salt)
        return hashPassword
    }

    create = (req, res) => {
        check('firstName',"Fistname must contain 3 characters").isLength({ min : 3})
        check('lastName',"Lastname must contain 3 characters").isLength({ min : 1})
        check('emailId',"Invalid Email").isEmail()
        check('password',"password must contain 8 character").isLength({min:8})
        
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

    // login=(req,res)=>{
    //     service.login({emailId: req.body.emailId},(err,data)=>{
    //         if(err){
    //             res.send('Server Error');
    //         }else if(data==undefined){
    //                 res.send('User Not Defined ');
    //             }
    //             else {
    //                 let password = req.body.password
    //                 bcrypt.compare(password,data.password,(err,result)=>{
    //                 if(result){
    //                     var token = jsonToken.sign({password: data.password}, 'secretKey', {expiresIn: '1h'});
    //                     res.send({message:'Login Successfull',token:token})
    //                 }
    //                 else {
    //                     res.send('Login Info Incorrect')
    //                 }
    //             })
    //         }
    //     })
    // }

    login = (req,res)=>{
        check('emailId', 'Invalid em￼ail').isEmail();
        check('password', 'passwor￼d must contain minimum 8 digits').isLength({ min: 8 });
        var errors = validationResult(req);
        var responseResult = {};
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {
            var user = {
                emailId : req.body.emailId,
                password :req.body.password
            }
            service.login(user, (err, result) => {
                if (err) {
                    responseResult.success = false;
                    responseResult.error = err;
                    res.status(422).send(responseResult)
                } else {
                     responseResult.success = true;
                    var token = jsonToken.sign({password:result.password}, 'secretKey', {expiresIn: '1h'});
                    responseResult.token = token.token;
                    responseResult.result = result
                    res.status(200).send(responseResult)

                }
            })
        }
    }

}
module.exports = new UserController;