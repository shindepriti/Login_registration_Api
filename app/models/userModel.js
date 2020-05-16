const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{type : String,required : true,minlength:3},
    lastName:{type : String,required : true,minlength:3},
    emailId:{type : String ,required : true,unique:true,match:[/^([a-zA-Z]{3,}([._+-]?[a-zA-Z0-9])*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}[.]?[a-zA-Z]*)$/,'is invalid']},
    password:{type : String,required : true,minlength:8},
},{
        timestamps:true

});

var userData = mongoose.model('user',userSchema)

exports.create = (data,callback) => {
    userData.find({'emailId':data.emailId},(err,data) =>{
      if(err){
        return callback(err);
      }else if(data.length > 0){
       var response = {
          "error":true,
          "message":"Email Already Exist",
          "errorCode":404
        }
        return callback(response)
      }else if(data==undefined || data==null || data==" "){
          var response = {
              "error":true,
              "message":"User Undefinde Or Null or Empty",
              "errorCode":422
          }
          return callback(response)
      }
      else{
        const user = new userData() 
        user.firstName = data.firstName,
        user.lastName = data.lastName,
        user.emailId = data.emailId,
        user.password = data.password
        
        user.save().then(data => {
          return callback(null,data)
        })
        .catch(err =>{
          return callback(err)
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

   

