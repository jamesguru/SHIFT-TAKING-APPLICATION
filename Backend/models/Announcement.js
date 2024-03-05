const mongoose = require("mongoose");
const AnnouncementSchema = mongoose.Schema({
title:{type:String, require:true},
description:{type:String, require:true},
time:{type:String},
},{timestamps:true})

module.exports = mongoose.model("Announcement", AnnouncementSchema);
