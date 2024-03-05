const mongoose = require("mongoose");
const ShiftSchema = mongoose.Schema(
  {
    location: { type: String, require: true },  
    date: { type: String, require: true },
    time: { type: String, require: true },
    type: { type: String, require: true },
    duration: { type: String, require: true },
    client: { type: String, require: true },
    staffEmail:{type:String,default:""},
    amount:{type:Number,default:0},
    paid: {type:Number, default:0},
    distance: {type:Number, default:0},
    status: {type:String, default:'Pending'},
    notes: { type: String },
    clockin: [{
        time:{type:String},
        accuracy:{type:Number},
        coords:{
          lat:{type:Number},
          lng:{type:Number}
        },
    }],
    clockout: [{
        time:{type:String},
        accuracy:{type:Number},
        coords:{
          lat:{type:Number},
          lng:{type:Number}
        }
    }],
    casenotes: [
      {
        time: {type:String},
        event: { type: String },
        notes: { type: String },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shift", ShiftSchema);
