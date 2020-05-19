/***************************************************************
 * @purpose  : Define Schema
 * @file     : userService.js              
 * @overview : Define Schema And Function To CRUD Operation
 * @author   : priti shinde
 * @since    : 13/5/2020
***************************************************************/

const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const jsonToken = require("jsonwebtoken")
const regex = require("../models/regexValid")
const userSchema = new mongoose.Schema({
    firstName:{
        type : String,
        required:true,
        minlength:3,
    },
    lastName:{
        type : String,
        required:true,
        minlength:1,
    },
    emailId:{
        type : String,
        required:true,
        unique:true,
        index:{
            unique:true
        },
        match:regex.emailRegx()
    },
    password:{type : String,required:true,minlength:8},
},{
        timestamps:true

});

module.exports = userData = mongoose.model('user',userSchema)
 
function  usermodel() {     
}

usermodel.prototype.create =(data,callback) => {
    userData.find({'emailId':data.emailId},(err,data) =>{
      if(err){
        callback(err);
      }else if(data.length > 0){
        var response = {
            "error":true,
            "message":"Email Already Exist",
            "errorCode":404
        }
        callback(response)
      }else if(data==undefined || data==null){
          var response = {
              "error":true,
              "message":"User Undefinde Or Null",
              "errorCode":500
          }
          callback(response)
      }else{
            const user = new userData() 
            user.firstName = data.firstName,
            user.lastName = data.lastName,
            user.emailId = data.emailId,
            user.password = data.password
        
            user.save().then(data => {
                callback(null,data)
            })
            .catch(err =>{
                callback(err)
            })
        }
    })

}

 exports.login=(data,callback)=>{
    userData.findOne({emailId:data.emailId},(err,data)=>{
        if(err){
            callback('Server Error');
        }else {
            if(data){
                var token = jsonToken.sign({password:data.password}, 'secretKey', {expiresIn: '1h'});
                console.log(token)
                let user ={
                    message :"success",
                    emailId : data.emailId,
                    password : data.password,
                    token : token
                    }
                    callback(null,user)
            }
            else {
                callback('Login Info Incorrect')
            }    
        }
    })
}

