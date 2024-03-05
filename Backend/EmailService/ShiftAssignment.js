const ejs = require("ejs");
const dotenv = require("dotenv");
const sendMail = require("../helpers/sendEmail");
dotenv.config();

const SendShiftAssignmentEmail = async (location,date,time,type,duration,client,email,notes) => {
  ejs.renderFile(
    "templates/ShiftAssignment.ejs",
    {location,date,time,type,duration,client,notes },
    async (err, data) => {
      let messageoption = {
        from: process.env.EMAIL,
        to: email,
        subject: "You have new shift",
        html: data,
      };

      try {
        sendMail(messageoption);
      } catch (error) {
        console.log(err);
      }
    }
  );
};

module.exports= {SendShiftAssignmentEmail};
