const mongoose = require('mongoose')

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
        match:[/^([a-zA-Z]{3,}([._+-]?[a-zA-Z0-9])*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}[.]?[a-zA-Z]*)$/,'is invalid']},
    password:{type : String,required:true,minlength:8},
},{
        timestamps:true

});

var userData = mongoose.model('user',userSchema)
 function userModel(){

 }

userModel.prototype.create =(data,callback) => {
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

exports.findOne=(data,callback)=>{
    userData.findOne({})
    .then(data => {
        callback(null,data)
    })
    .catch(err => {
        callback({ message:"error to login"})
    })
}
module.exports = userData