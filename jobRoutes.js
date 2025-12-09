const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// Add job (protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const job = new Job({
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      description: req.body.description,
      skillsRequired: req.body.skillsRequired || []
    });

    await job.save();
    res.json({ message: "Job added successfully", job });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error adding job", error: err.message });
  }
});

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching jobs", error: err.message });
  }
});

// Recommendations
router.get("/recommendations/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const jobs = await Job.find();

    const recommendations = jobs
      .map((job) => {
        const matchCount = job.skillsRequired.filter((s) =>
          (user.skills || []).includes(s)
        ).length;

        return { job, score: matchCount };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score);

    res.json(recommendations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating recommendations", error: err.message });
  }
});

module.exports = router;
