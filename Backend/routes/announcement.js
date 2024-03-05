const express = require("express");
const router = express.Router();
const Announcement = require("../models/Announcement");
const announcementEmail = require("../EmailService/Announcement");

router.post("/", async (req, res) => {
    const newAnnouncement = Announcement(req.body);
    await announcementEmail(req.body.title,req.body.description)
    try {
      const announcement = await newAnnouncement.save();     
      res.status(201).json(announcement);
    
    } catch (error) {
      res.status(500).json(error);
    }
  });
  router.get("/", async (req, res) => {
    try {
      const announcements = await Announcement.find().sort({ createdAt: -1 });
      res.status(200).json(announcements);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      await Announcement.findByIdAndDelete(req.params.id);
  
      res.status(200).json({ message: "Announcement has been deleted!" });
    } catch (error) {
      res.status(500).json(error);
    }
  });
  module.exports = router;