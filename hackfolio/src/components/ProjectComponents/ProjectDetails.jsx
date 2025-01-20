import React from "react";
import { motion } from "framer-motion";

import { useNavigate, useParams } from "react-router-dom";

const ProjectDetails = ({ project, error }) => {
  const navigate = useNavigate();
  const {projectId} = useParams();

  // Function to check if the video link is valid and convert it to embed format
  const getEmbedUrl = (link) => {
    if (!link) return null;

    // Check for youtu.be link
    if (link.includes("youtu.be")) {
      return link.replace("youtu.be/", "www.youtube.com/embed/");
    }
    // Check for youtube.com/watch?v= link
    if (link.includes("watch?v=")) {
      return link.replace("watch?v=", "embed/");
    }
    return null;
  };

  const embedUrl = getEmbedUrl(project.videoDemo);

  return (
    <div className=" min-h-screen w-full p-6">
         {/* Background Animations */}
         <div className=" inset-0 -z-10">
                    <motion.div
                        className="line-animation absolute top-[400px] right-[30px] w-32 h-32"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2 }}
                    >
                        <motion.svg
                            viewBox="0 0 100 100"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <motion.path
                                d="M10 10 L 50 50 L 90 10"
                                fill="transparent"
                                stroke="#3b82f6"
                                strokeWidth="4"
                            />
                        </motion.svg>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-[1000px] right-[250px] w-32 h-32 bg-blue-100 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    />
{/* 
                    <motion.div
                        className="absolute bottom-[50px] left-[10px] w-48 h-48 bg-purple-300 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                    /> */}

                    <motion.div
                        className="absolute top-[700px] right-[250px] w-48 h-48 bg-purple-300 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                    />

                    <motion.div
                        className="absolute bottom-[800px] left-[1500px] w-48 h-48 bg-purple-300 rounded-full -z-10"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                    />

                    <motion.div
                        className="absolute bottom-[720px] right-[200px] w-32 h-32 bg-blue-100 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    />

                    <motion.div
                        className="absolute bottom-[400px] right-[500px] w-32 h-32 bg-blue-100 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    />
                </div>
      {/* Header Section */}
      <div className="flex items-center mb-8">
        <div>

        </div>
          {/* Logo Section */}
          {project.logoUrl && (
            <div className="mr-4">
              <img src={project.logoUrl} alt="logo" className="h-20 w-20 rounded-lg shadow-lg" />
            </div>
          )}

        {/* Project Name and Tagline */}
        <div>
          <h1 className="text-4xl text-black font-bold">{project.projectName}</h1>
          <p className="text-black mt-2">{project.tagline}</p>
        </div>

        <button
          className="mb-4 px-4 py-2 bg-[#5f3abd] text-white rounded hover:bg-blue-600 transition-colors"
          onClick={() => navigate(`/editprojectdetails/${projectId}`)}
        >
          Edit Project
        </button>
      </div>

      {/* Error Section */}
      {error && (
        <div className="mb-6 w-full max-w-4xl bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg">
          <h2 className="font-semibold">Error</h2>
          <p>{error.message || "An unexpected error occurred. Please try again later."}</p>
        </div>
      )}

      {/* Video and Gallery Section */}
      <div className="flex justify-between mb-6 w-full max-w-6xl">
        {/* Video Section */}
        <div className="w-3/5">
          {embedUrl ? (
            <iframe
              width="100%"
              height="400"
              src={embedUrl}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
              className="mb-4"
            ></iframe>
          ) : project.videoDemo ? (
            <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-blue-400 rounded-lg bg-blue-50 shadow-lg p-4">
              <p className="text-lg font-semibold text-blue-700">The provided video link is invalid.</p>
              <span className="mt-2 text-blue-600">Please check the link and try again.</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-blue-400 rounded-lg bg-blue-50 shadow-lg p-4">
              <p className="text-lg font-semibold text-blue-700">No video available</p>
              <span className="mt-2 text-blue-600">Please check back later.</span>
            </div>
          )}
        </div>

        {/* Gallery Section */}
        <div className="w-2/5 flex gap-2 overflow-x-auto">
          {project.imageUrls &&
            project.imageUrls.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`image-${index}`}
                className="rounded-lg shadow-lg h-40 w-64 object-cover"
              />
            ))}
        </div>
      </div>

      {/* Problem Statement */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">
        <h2 className="text-xl font-semibold mb-4">The problem {project.projectName} solves</h2>
        <p className="text-gray-700">{project.problem}</p>
      </div>

      {/* Challenges */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">
        <h2 className="text-xl font-semibold mb-4">Challenges Faced</h2>
        <p className="text-gray-700">{project.challenges}</p>
      </div>

      {/* Technologies Used */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">
        <h2 className="text-xl font-semibold mb-4">Technologies Used</h2>
        <p className="text-gray-700">{project.technologies}</p>
      </div>

      {/* Links Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">
        <h2 className="text-xl font-semibold mb-4">Useful Links</h2>
        <a href={project.links} className="text-[#5f3abd] underline">
          {project.links}
        </a>
      </div>
    </div>
  );
};

export default ProjectDetails;
