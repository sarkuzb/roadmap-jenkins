// app.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const videoRoutes = require("./routes/videoRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/videos", videoRoutes); // Make sure the prefix is correct

// Routes
app.use("/api/videos", videoRoutes);

// MongoDB Connection and Server Start
mongoose
  .connect("mongodb://localhost:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
