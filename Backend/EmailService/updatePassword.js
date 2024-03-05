const ejs = require("ejs");
const dotenv = require("dotenv");
const sendMail = require("../helpers/sendEmail");
const path = require("path");
dotenv.config();
const attachmentPath = path.join(__dirname, 'attachments', 'manual.pdf');
const sendUpdatePasswordEmail = async (email,password) => {
  ejs.renderFile(
    "templates/updatePassword.ejs",
    {password},
    async (err, data) => {
      let messageoption = {
        from: process.env.EMAIL,
        to: email,
        subject: "You've changed your password.",
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

module.exports={sendUpdatePasswordEmail};
