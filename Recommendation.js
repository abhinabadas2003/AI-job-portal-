const mongoose = require("mongoose");

const RecommendationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    score: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recommendation", RecommendationSchema);
