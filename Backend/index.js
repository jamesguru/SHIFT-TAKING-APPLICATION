const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const clientRoute = require("./routes/client");
const shiftRoute = require("./routes/shift");
const incidenceRoute = require("./routes/incidence");
const announcementRoute = require("./routes/announcement");
const mongoose = require("mongoose");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/files", express.static("files"));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/clients", clientRoute);
app.use("/api/v1/shifts", shiftRoute);
app.use("/api/v1/incidences", incidenceRoute);
app.use("/api/v1/announcements",announcementRoute);

const PORT = process.env.PORT;

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("DB connection is successfull");
  })
  .catch((e) => {
    console.log(e);
  });
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
