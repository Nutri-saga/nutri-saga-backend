const mongoose = require('mongoose')
const userSchema = new  mongoose.Schema({
    username:{
        type:String,
        unique:true,
        minlength:[8, 'Username must be of 8 characters'],
        maxlength:[20, 'Username not be less than 20 characters'],
        required:true
    },
    name:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        default:"user",
        required:false
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const userModel = mongoose.model('user', userSchema);

module.exports =  userModel