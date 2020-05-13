const Registration = require("../models/user.models")

exports.create = (register,callback) => {
    
    const registration = new Registration() 
    registration.firstName = register.firstName,
    registration.lastName = register.lastName,
    registration.emailId = register.emailId,
    registration.password = register.password

    registration.save().then(data => {
        console.log("data After save:",data)
        return callback(null,data)
    }).catch(err =>{
        return callback({message:"Some Error Occur while Registration"})
    })  

}

exports.findAll = (data,callback)=>{
    console.log("login object model ---",data)

    Registration.find().then(data => {
         return callback(null,data).json("login sucessfull")
    }).catch(err =>{
         return callback({message:"Error While reterving login id "})
    })

}

exports.findOne = (data,callback)=>{
    console.log("login model ",data)

    Registration.findById().then(data => {
        return callback(null,data).json("login sucessful")
    }).catch(err =>{
        callback({message:"Error While reterving login id"})
    })
}