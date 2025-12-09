const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// DB connect
connectDB();

// Routes
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// Test route
app.get("/", (req, res) => res.send("AI Job Portal API Running ✅"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
