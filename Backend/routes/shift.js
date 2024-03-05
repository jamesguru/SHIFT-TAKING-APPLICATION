const express = require("express");
const router = express.Router();
const Shift = require("../models/Shift");
const { SendShiftAssignmentEmail } = require("../EmailService/ShiftAssignment");

// ADD SHIFT
router.post("/", async (req, res) => {
  const newShift = Shift(req.body);
  try {
    const shift = await newShift.save();
    
    if(req.body.staffEmail){
      await SendShiftAssignmentEmail(
        req.body.location,
        req.body.date,
        req.body.time,
        req.body.type,
        req.body.duration,
        req.body.client,
        req.body.staffEmail,
        req.body.notes
      );
    }

    res.status(201).json(shift);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL SHIFTS

router.get("/", async (req, res) => {
  try {
    const shifts = await Shift.find().sort({ createdAt: -1 });
    res.status(200).json(shifts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE SHIFT

router.put("/:id", async (req, res) => {
  try {
    const shift = await Shift.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(shift);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USERS SHIFT
router.post("/me", async (req, res) => {
  
  try {
    const shifts = await Shift.find({staffEmail:req.body.email}).sort({ createdAt: -1 });
    res.status(200).json(shifts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET UNASSIGNED SHIFTS

router.get("/unassigned", async (req, res) => {
  
  try {
    const shiftsNoEmail = await Shift.find({ staffEmail:''}).sort({ createdAt: -1 });
    res.status(200).json(shiftsNoEmail);
  } catch (error) {
    res.status(500).json(error);
  }
});


// GET SHIFT
router.get("/find/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const shift = await Shift.findById(id);
    res.status(200).json(shift);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE SHIFT

router.delete("/:id", async (req, res) => {
  try {
    await Shift.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Shift has been deleted!" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ASSIGN SHIFT

router.put("/assign/:id", async (req, res) => {
  try {
    const updatedShift = await Shift.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if(req.body.staffEmail){
      await SendShiftAssignmentEmail(
        req.body.location,
        req.body.date,
        req.body.time,
        req.body.type,
        req.body.duration,
        req.body.client,
        req.body.staffEmail,
        req.body.notes
      );
    }
    res.status(200).json(updatedShift);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// ADD CASE NOTES

router.put("/casenote/:id", async (req, res) => {
  const { event, time, notes } = req.body;
  try {
    if (event && time && notes) {
      const caseNote = await Shift.findByIdAndUpdate(req.params.id, {
        $push: { casenotes: { event, time, notes } },
      });
      res.status(201).json(caseNote);
    } else {
      res.status(500).json("No case notes");
    }
  } catch (error) {
    res.status(500).json("Something went wrong");
  }
});

// CLOCK IN

router.put("/clockin/:id", async (req, res) => {
  const { time, coords, accuracy } = req.body;
  
  try {
    if (time && coords) {
      const clockin = await Shift.findByIdAndUpdate(req.params.id, {
        $push: { clockin: { time, coords, accuracy } },
      });
      res.status(201).json(clockin);
    } else {
      res.status(500).json({ message: "Clock in failed" });
    }
  } catch (error) {
    res.status(500).json("Something went wrong");
  }
});

//CLOCKOUT

router.put("/clockout/:id", async (req, res) => {
  const { time, coords, accuracy } = req.body;
  try {
    if (time && coords) {
      const clockout = await Shift.findByIdAndUpdate(req.params.id, {
        $set: {status: "Completed"},
        $push: { clockout: { time, coords, accuracy } },
      });
      res.status(201).json(clockout);
    } else {
      res.status(500).json({ message: "Clock out failed" });
    }
  } catch (error) {
    res.status(500).json("Something went wrong");
  }
});

module.exports = router;
