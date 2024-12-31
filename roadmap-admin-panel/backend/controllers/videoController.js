const Video = require("../models/videoModel");

// Get all videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    return res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    return res.status(500).json({
      message: "Error fetching videos",
      error: error.message,
      stack: error.stack, // Add this for debugging
    });
  }
};

// Get a single video by ID
exports.getVideoById = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    return res.status(200).json(video);
  } catch (error) {
    console.error("Error fetching video:", error);
    return res.status(500).json({
      message: "Error fetching video",
      error: error.message,
      stack: error.stack, // Add this for debugging
    });
  }
};

// Add a new video
exports.addVideo = async (req, res) => {
  const { name, link, thumbnail, section } = req.body;

  if (!name || !link || !thumbnail || !section) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!["two", "three"].includes(section)) {
    return res.status(400).json({ message: "Invalid section value" });
  }

  try {
    const newVideo = new Video({ name, link, thumbnail, section });
    await newVideo.save();
    return res.status(201).json(newVideo);
  } catch (error) {
    console.error("Error adding video:", error);
    return res.status(500).json({
      message: "Error adding video",
      error: error.message,
      stack: error.stack, // Add this for debugging
    });
  }
};

// Update an existing video
exports.updateVideo = async (req, res) => {
  const { id } = req.params;
  const { name, link, thumbnail, section } = req.body;

  if (!name || !link || !thumbnail || !section) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!["two", "three"].includes(section)) {
    return res.status(400).json({ message: "Invalid section value" });
  }

  try {
    const updatedVideo = await Video.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    return res.status(200).json(updatedVideo);
  } catch (error) {
    console.error("Error updating video:", error);
    return res.status(500).json({
      message: "Error updating video",
      error: error.message,
      stack: error.stack, // Add this for debugging
    });
  }
};

// Delete a video
exports.deleteVideo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVideo = await Video.findByIdAndDelete(id);

    if (!deletedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    return res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    return res.status(500).json({
      message: "Error deleting video",
      error: error.message,
      stack: error.stack, // Add this for debugging
    });
  }
};
