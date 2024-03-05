const ejs = require("ejs");
const dotenv = require("dotenv");
const sendMail = require("../helpers/sendEmail");
const path = require("path");
dotenv.config();
const attachmentPath = path.join(__dirname, 'attachments', 'manual.pdf');
const sendResetPasswordEmail = async (email) => {
  console.log(email);
  ejs.renderFile(
    "templates/resetPassord.ejs",
    async (err, data) => {
      let messageoption = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your reset password link",
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

module.exports={sendResetPasswordEmail};
