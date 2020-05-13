const mongoose = require('mongoose')

const registrationSchema = mongoose.Schema({
    firstName:{type : String,required : true},
    lastName:{type : String},
    emailId:{ type : String , required : true},
    password:{ type : String,required : true},
},{
        timestamps:true

});

module.exports = mongoose.model('registrations',registrationSchema)


