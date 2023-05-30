const mongoose = require('mongoose');
const schema= mongoose.Schema;

const userSchema = new schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    description:{type:String, required:true},
    image: {type:String, required:true},
    isAdmin:{type:Boolean, required:true},
    address:{type:String, required:true},
})
module.exports = mongoose.model('Userdetails', userSchema)