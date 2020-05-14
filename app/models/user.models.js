const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{type : String,required : true,minlength:3},
    lastName:{type : String,required:true,minlength:3},
    emailId:{ type : String , required : true,unique:true},
    password:{ type : String,required : true,minlength:8},
},{
        timestamps:true

});

module.exports= mongoose.model('user',userSchema)


