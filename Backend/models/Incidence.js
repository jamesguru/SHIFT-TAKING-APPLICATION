const mongoose = require("mongoose");
const IncidenceSchema = mongoose.Schema(
  {
    location: { type: String},  
    date: { type: String},
    time: { type: String},
    typeOfIncidence:{ type: Array},
    addressOfLocation: {type: String},
    afterIncident: {type: String},
    actualIncident: {type: String},
    dateOfReport: {type: String},
    person1: {type: String},
    phone1: {type: String},
    person2: {type: String},
    phone2: {type: String},
    person3: {type: String},
    phone3: {type: String},
    personAffected: {type: String},
    personCompletingForm: {type: String},
    personInjured: {type: String},
    reportBy: {type: String},
    roleOfPerson: {type: String},
    personAffected: {type: String},
    whatHappened: {type: String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Incidence", IncidenceSchema);
