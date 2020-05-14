const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{type : String,required : true,minlength:3},
    lastName:{type : String,required : true,minlength:3},
    emailId:{type : String ,required : true,unique:true,match:[/^([a-zA-Z]{3,}([._+-]?[a-zA-Z0-9])*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}[.]?[a-zA-Z]*)$/,'is invalid']},
    password:{type : String,required : true,minlength:8},
},{
        timestamps:true

});

module.exports = mongoose.model('user',userSchema)



