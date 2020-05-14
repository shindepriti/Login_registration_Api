const userData = require("../app/models/user.models")

exports.create = (register,callback) => {
    
    const user = new userData() 
    user.firstName = register.firstName,
    user.lastName = register.lastName,
    user.emailId = register.emailId,
    user.password = register.password

    user.save().then(data => {
        console.log("data After save:",data)
        return callback(null,data)
     })
    .catch(err =>{
        return callback({message:"Some Error Occur while Registration"})
    })  

}


exports.findAll = (data,callback)=>{
    console.log("login object model ---",data)

    userData.find().then(data => {
         return callback(null,data).json("login sucessfull")
    }).catch(err =>{
         return callback({message:"Error While reterving login id "})
    })

}
