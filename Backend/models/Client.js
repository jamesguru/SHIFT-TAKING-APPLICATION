const mongoose = require("mongoose");
const ClientSchema = mongoose.Schema({
    fullname:{type:String},
    phone:{type:String},
    address:{type:String},
    gender:{type:String},
    DOB:{type:String},
    ndisNo:{type:String},
    startdate:{type:String},
    enddate:{type:String},
    desc:{type:String},
    password:{type:String},
    role:{type:String, default:"client"},
    isActive:{type:Boolean, default:true},
    img:{type:String},
    documents:{type: Array},
},{timestamps:true})

module.exports = mongoose.model("Client", ClientSchema);
