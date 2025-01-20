import React from "react";

const HackathonProjectCard = ({ project }) => (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{project.projectName}</h2>
      <p className="text-gray-600">{project.tagline}</p>
      <p className="my-4">{project.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Built at {project.builtAt}</span>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-600">Likes: {project.Likes}</span>
        <button className="bg-[#5f3abd] text-white px-4 py-2 rounded">
          Like
        </button>
      </div>
    </div>
  );
  export default HackathonProjectCard;