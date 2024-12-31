import React, { useState, useEffect } from "react";
import axios from "axios";

// Function to get YouTube thumbnail from a YouTube link
const getYouTubeThumbnail = (url) => {
  const youtubeIdRegex =
    /(?:https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]*\S+)?(?:v|e(?:mbed)?)\/|youtu\.be\/))([^"&?/ ]{11})/;
  const match = url.match(youtubeIdRegex);
  if (match && match[1]) {
    return `https://img.youtube.com/vi/${match[1]}/sddefault.jpg`;
  }
  return "";
};

const AdminPanel = () => {
  const [newVideo, setNewVideo] = useState({
    name: "",
    link: "",
    thumbnail: "",
    section: "two",
    id: null, // Track the id for editing
  });
  const [videos, setVideos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch videos function outside of useEffect
  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/videos");
      setVideos(response.data);
    } catch (error) {
      console.error("Failed to fetch videos:", error.message);
      setErrorMessage("Failed to load videos. Please try again later.");
    }
  };

  useEffect(() => {
    fetchVideos(); // Call fetchVideos on component mount
  }, []);

  // Add a new video
  const handleAddVideo = async () => {
    if (!newVideo.name || !newVideo.link || !newVideo.section) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const thumbnail = getYouTubeThumbnail(newVideo.link);
    if (!thumbnail) {
      setErrorMessage("Invalid YouTube link. Please provide a valid link.");
      return;
    }

    const videoData = {
      name: newVideo.name,
      link: newVideo.link,
      thumbnail: thumbnail,
      section: newVideo.section,
    };

    try {
      await axios.post("http://localhost:5000/api/videos", videoData);
      alert("Video added successfully!");
      setNewVideo({
        name: "",
        link: "",
        thumbnail: "",
        section: "two",
        id: null,
      });
      setErrorMessage("");
      fetchVideos(); // Fetch videos again after adding
    } catch (error) {
      console.error("Error saving video:", error);
      setErrorMessage("Failed to save the video. Please try again later.");
    }
  };

  // Edit an existing video
  const handleEditVideo = async () => {
    if (!newVideo.name || !newVideo.link || !newVideo.section || !newVideo.id) {
      setErrorMessage(
        "Please fill in all fields and ensure the video ID is set."
      );
      return;
    }

    const thumbnail = getYouTubeThumbnail(newVideo.link);
    if (!thumbnail) {
      setErrorMessage("Invalid YouTube link. Please provide a valid link.");
      return;
    }

    const videoData = {
      name: newVideo.name,
      link: newVideo.link,
      thumbnail: thumbnail,
      section: newVideo.section,
    };

    try {
      await axios.put(
        `http://localhost:5000/api/videos/${newVideo.id}`,
        videoData
      );
      alert("Video updated successfully!");
      setNewVideo({
        name: "",
        link: "",
        thumbnail: "",
        section: "two",
        id: null,
      });
      setErrorMessage("");
      fetchVideos(); // Fetch videos again after editing
    } catch (error) {
      console.error("Error updating video:", error);
      setErrorMessage("Failed to update the video. Please try again later.");
    }
  };

  // Delete a video
  const handleDelete = async (id) => {
    try {
      if (!id || id.length !== 24) {
        console.error("Invalid video ID:", id);
        return;
      }

      await axios.delete(`http://localhost:5000/api/videos/${id}`);
      setVideos(videos.filter((video) => video._id !== id));
    } catch (error) {
      console.error("Failed to delete video:", error);
      alert("Failed to delete video.");
    }
  };

  // Set form fields for editing an existing video
  const handleEditVideoDetails = (video) => {
    setNewVideo({
      id: video._id,
      name: video.name,
      link: video.link,
      thumbnail: video.thumbnail,
      section: video.section,
    });
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = [
    { label: "Section Two", value: "two" },
    { label: "Section Three", value: "three" },
  ];

  const handleSelect = (value) => {
    setNewVideo({ ...newVideo, section: value });
    setIsDropdownOpen(false);
  };

  return (
    <div className="">
      <h1 className="bg-slate-500 h-16 flex items-center justify-center font-semibold text-white">
        Admin Panel
      </h1>
      <div className="w-10/12 mx-auto max-w-full flex flex-col bg-slate-200">
        <div className="px-4 pt-6">
          <h2 className="bg-white p-2 px-4 inline-block font-semibold text-yellow-600 text-lg">
            {newVideo.id ? "Edit Video" : "Add Video"}
          </h2>
        </div>

        <div className=" px-4 pt-2">
          <div className="flex">
            <input
              className="outline-none p-2 mr-2 w-48 whitespace-nowrap text-ellipsis overflow-hidden border border-gray-300"
              type="text"
              placeholder="Video Name"
              value={newVideo.name}
              onChange={(e) =>
                setNewVideo({ ...newVideo, name: e.target.value })
              }
            />
            <input
              className="outline-none p-2 mr-2 w-48 whitespace-nowrap text-ellipsis overflow-hidden border border-gray-300"
              type="text"
              placeholder="Video Link"
              value={newVideo.link}
              onChange={(e) =>
                setNewVideo({ ...newVideo, link: e.target.value })
              }
            />
            <input
              className="bg-white p-2 mr-2 cursor-not-allowed border border-gray-300"
              type="text"
              placeholder="Thumbnail URL"
              value={newVideo.thumbnail}
              disabled
            />
            <div className="custom-dropdown">
              {/* Dropdown Header */}
              <div
                className="dropdown-header"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>
                  {
                    options.find((option) => option.value === newVideo.section)
                      ?.label
                  }
                </span>
                <span className="dropdown-icon">▼</span>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  {options.map((option) => (
                    <div
                      key={option.value}
                      className="dropdown-item"
                      onClick={() => handleSelect(option.value)}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-2 flex">
            {newVideo.id === null ? (
              <button
                className="bg-yellow-500 border-b-2 border-yellow-600 hover:border-slate-300 active:scale-90 p-2 rounded-md w-28 flex justify-center text-sm font-semibold text-white hover:bg-white active:bg-slate-200 hover:text-yellow-500 cursor-pointer transition duration-200"
                onClick={handleAddVideo}
              >
                Add Video
              </button> // Add Video Button
            ) : (
              <button
                className="bg-yellow-500 border-b-2 border-yellow-600 hover:border-slate-300 active:scale-90 p-2 rounded-md w-28 flex justify-center text-sm font-semibold text-white hover:bg-white active:bg-slate-200 hover:text-yellow-500 cursor-pointer transition duration-200"
                onClick={handleEditVideo}
              >
                Save Changes
              </button> // Edit Video Button
            )}
            {errorMessage && (
              <p className="flex items-center font-semibold ml-2 bg-white text-red-600 px-2 p-1 transitio duration-300">
                {errorMessage}
              </p>
            )}
          </div>
        </div>

        <div className="px-4 pt-6">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div>
                <h2 className="bg-white p-2 px-4 inline-block font-semibold text-yellow-600 text-lg">
                  Video List
                </h2>
              </div>
            </div>
            <div className="border-2 border-slate-300 my-2 p-3 flex flex-col rounded-md">
              {videos.map((video, index) => (
                <div
                  key={video._id}
                  className="flex justify-start items-center"
                >
                  {/* Video Name */}
                  <div className=" text-slate-800 p-2 h-32 border-x border-gray-300">
                    <p className="flex flex-row items-center gap-2 text-lg font-semibold text-slate-700">
                      <span className="text-slate-400 text-[10px]">
                        {index + 1}
                      </span>{" "}
                      Video Name
                    </p>

                    <p className="text-slate-500 w-60 whitespace-nowrap text-ellipsis overflow-hidden">
                      {video.name}
                    </p>
                  </div>

                  {/* Video Link */}
                  <div className="text-slate-800 p-2 h-32 border-r border-gray-300">
                    <p className="text-lg font-semibold text-slate-700">
                      Video Link
                    </p>
                    <p className="text-slate-500 w-60 whitespace-nowrap text-ellipsis overflow-hidden">
                      {video.link}
                    </p>
                  </div>

                  {/* Thumbnail */}
                  <div className="p-2 h-32 border-r border-gray-300">
                    <p className="text-lg font-semibold text-slate-700">
                      Thumbnail
                    </p>
                    <img
                      src={video.thumbnail}
                      alt={video.name}
                      className="w-28 h-16 object-cover"
                    />
                  </div>

                  {/* Section */}
                  <div className="flex flex-col p-2 h-32 w-20 border-r border-gray-300">
                    <p className="text-lg font-semibold text-slate-700">
                      Section
                    </p>
                    <p className="text-slate-500 w-48 whitespace-nowrap text-ellipsis overflow-hidden capitalize text-sm">
                      {video.section}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-1 flex-col p-2">
                    <button
                      className="text-sm text-slate-400 hover:text-slate-700 transition duration-200"
                      onClick={() => handleDelete(video._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="text-sm text-slate-400 hover:text-slate-700 transition duration-200"
                      onClick={() => handleEditVideoDetails(video)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
