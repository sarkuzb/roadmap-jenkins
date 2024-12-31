const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  thumbnail: { type: String, required: true },
  section: { type: String, enum: ["two", "three"], required: true },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
