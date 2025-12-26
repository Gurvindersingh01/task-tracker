const express = require("express");
const router = express.Router();
const multer = require("multer");
const Task = require("../models/Task");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    const task = new Task({
      title,
      description,
      dueDate,
      image: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : "",
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
