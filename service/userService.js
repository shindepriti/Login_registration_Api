/***************************************************************
 * @purpose  : Define Login And Regiser Function Using callback
 * @file     : userService.js              
 * @overview : Define Function To Handle Business Logic
 * @author   : priti shinde
 * @since    : 14/5/2020
***************************************************************/

const userModels = require("../app/models/userModel")

class UserService { 

  create (data,callback)  {
    userModels.create(data,(err,result) => { 
      if (err) {
        return callback(err);
      }
        return callback(null, result)
    })
  }

  login = (data,callback) => {
      userModels.login(data,(err,result) => { 
        if (err) {
          callback(err);
        }
        callback(null, result)
      })
  } 
}

module.exports = new UserService;