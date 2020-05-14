const userModels = require("../app/models/UserModel")

class UserService { 

    create = (data,callback) => {
    
        const user = new userModels() 
        user.firstName = data.firstName,
        user.lastName =data.lastName,
        user.emailId = data.emailId,
        user.password = data.password

        user.save().then(data => {
            console.log("data After save:",data)
            return callback(null,data)
        })
        .catch(err =>{
            return callback({message:"Some Error Occur while Registration"})
        })  

    }

    login = (data,callback)=>{

        userModels.find().then(data => {
            return callback(null,data).json("login sucessfull")
        }).catch(err =>{
            return callback({message:"Error While reterving login id "})
        })

    }
}

module.exports = new UserService;