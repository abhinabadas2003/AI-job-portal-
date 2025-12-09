const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    description: { type: String },
    skillsRequired: { type: [String], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
