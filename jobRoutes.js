const express = require("express");
const Job = require("../models/Job");
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// GET /api/jobs - list all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error("Get jobs error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/jobs - create job (recruiter)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters can create jobs" });
    }

    const { title, company, location, description, skillsRequired, salary } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      description,
      skillsRequired: skillsRequired || [],
      salary,
      createdBy: req.user.userId,
    });

    res.status(201).json({ message: "Job created", job });
  } catch (err) {
    console.error("Create job error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/jobs/recommend?userId=... OR ?skills=python,react
router.get("/recommend", async (req, res) => {
  try {
    let userSkills = [];

    if (req.query.userId) {
      const user = await User.findById(req.query.userId);
      if (user && user.skills) {
        userSkills = user.skills.map((s) => s.toLowerCase());
      }
    } else if (req.query.skills) {
      userSkills = req.query.skills
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
    }

    const jobs = await Job.find();

    // very simple "AI": score jobs by matching skills count
    const scored = jobs
      .map((job) => {
        const jobSkills = (job.skillsRequired || []).map((s) =>
          s.toLowerCase()
        );
        const matches = jobSkills.filter((s) => userSkills.includes(s));
        return {
          job,
          score: matches.length,
        };
      })
      .sort((a, b) => b.score - a.score);

    res.json(
      scored.map((item) => ({
        ...item.job.toObject(),
        matchScore: item.score,
      }))
    );
  } catch (err) {
    console.error("Recommend jobs error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
