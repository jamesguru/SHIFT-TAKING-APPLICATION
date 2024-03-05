const express = require("express");
const router = express.Router();
const Incidence = require("../models/Incidence");

router.post("/", async (req, res) => {
    const newIncidence = Incidence(req.body);
    try {
      const incidence = await newIncidence.save();     
      res.status(201).json(incidence);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  router.get("/", async (req, res) => {
    try {
      const incidences = await Incidence.find().sort({ createdAt: -1 });
      res.status(200).json(incidences);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.get("/find/:id", async (req, res) => {
    try {
      const incidence = await Incidence.findById(req.params.id);
  
      res.status(200).json(incidence);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      await Incidence.findByIdAndDelete(req.params.id);
  
      res.status(200).json({ message: "Incidence has been deleted!" });
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  module.exports = router;