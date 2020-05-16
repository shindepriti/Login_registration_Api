require('dotenv').config();
const mongoose = require("mongoose")

module.exports = mongoConnection=()=> {
  
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.DB_URL,{
       useNewUrlParser:true 
    }).then(() => {
        console.log("Sucessfully connect to database")
    }).catch(err => {
        console.log("Could Not Connect To Database",err)
        process.exit();
    })  
}



