import React from "react";

const VideoPlayer = ({ lecture, onVideoEnded }) => {
  if (!lecture) {
    return (
      <div className="bg-black aspect-video flex items-center justify-center rounded-lg">
        <p className="text-white text-xl">Select a lecture to start learning</p>
      </div>
    );
  }

  return (
    <div className="bg-black rounded-lg overflow-hidden">
      <h2 className="text-xl font-bold p-4 bg-gray-800 text-white">
        {lecture.title}
      </h2>
      {/* The `key` prop is VITAL. It forces React to re-mount the video element when the src changes. */}
      <video
        key={lecture._id}
        className="w-full aspect-video"
        controls
        autoPlay
        onEnded={onVideoEnded} // This event fires when the video finishes
      >
        <source src={lecture.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="p-4 text-gray-300">
        <p>{lecture.description || "No description for this lecture."}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
