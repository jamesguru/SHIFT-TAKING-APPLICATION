const ejs = require("ejs");
const dotenv = require("dotenv");
const sendMail = require("../helpers/sendEmail");
const User = require("../models/User");
dotenv.config();

const announcementEmail = async (title,description) => {
  const users = await User.find();
  if (users.length > 0) {
    for (let user of users) {
      ejs.renderFile(
        "templates/announcement.ejs",
        {description},
        async (err, data) => {
          let messageoption = {
            from: process.env.EMAIL,
            to: user.email,
            subject: `${title}`,
            html: data,
          };
          await sendMail(messageoption);
        }
      );

    }
  }
};

module.exports = announcementEmail;