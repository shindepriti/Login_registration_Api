const userModels = require("../app/models/userModel")

class UserService { 

  create = (data,callback) => {
    userModels.create(data,(err,result) => { 
      if (err) {
        callback(err);
      }
      callback(null, result)
    })
  }

  login = (data,callback) => {
      userModels.findOne(data,(err,result) => { 
        if (err) {
          callback(err);
        }
        callback(null, result)
      })
  }
   
}

module.exports = new UserService;