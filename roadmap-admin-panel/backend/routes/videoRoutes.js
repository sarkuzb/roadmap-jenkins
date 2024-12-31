// routes/videoRoutes.js
const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");

// Get all videos
router.get("/", videoController.getAllVideos);

// Get a single video
router.get("/:id", videoController.getVideoById);

// Add a new video
router.post("/", videoController.addVideo);

// Update a video
router.put("/:id", videoController.updateVideo);

// Delete a video
router.delete("/:id", videoController.deleteVideo);

module.exports = router;
