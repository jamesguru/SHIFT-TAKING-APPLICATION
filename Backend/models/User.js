const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username:{type:String},
    fullname:{type:String, require:true},
    email:{type:String, require:true},
    phone:{type:String},
    address:{type:String},
    gender:{type:String},
    staffID:{type:String, require:true,unique:true},
    password:{type:String, required:true},
    role:{type:String, default:"user"},
    documents:{type: Array},
    isActive:{type:Boolean, default:true},
    img:{type:String},
},{timestamps:true})

module.exports = mongoose.model("User", UserSchema);
