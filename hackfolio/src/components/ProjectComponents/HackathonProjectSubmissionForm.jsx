import React, { useState } from "react";
import axios from "axios";
import LoadingPage from "../loading";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

function HackathonProjectSubmissionForm() {
  const navigate = useNavigate();
  const { name } = useParams();
  const [formData, setFormData] = useState({
    projectName: "",
    tagline: "",
    problem: "",
    challenges: "",
    technologies: "",
    links: "",
    videoDemo: "",
  });

  const [logo, setLogo] = useState(null);
  const [images, setImages] = useState([]);
  const [coverimage, setCoverimage] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (file) => {
    const uploadPreset = 'hackathonform';
    const cloudName = 'dgjqg72wo';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: false,
        });
        return response.data.secure_url;
    } catch (error) {
        console.error('Error uploading file:', error.response ? error.response.data : error.message);
        return null;
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);

    const logoUrl = logo ? await handleImageUpload(logo) : null;
    const imageUrls = await Promise.all(Array.from(images).map(handleImageUpload));
    const coverUrl = coverimage ? await handleImageUpload(coverimage) : null;

    const projectData = {
      ...formData,
      coverUrl,
      logoUrl,
      imageUrls,
    };

    try {
      console.log(projectData);
      console.log("name");
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/project/hackathonProject/${name}`, projectData);
      console.log('Server response:', response.data);
      navigate('/uploadsuccess');
    } catch (error) {
      console.error('Error sending data to /api/project:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingPage></LoadingPage>
      ) : (
        <div className=" min-w-[1000px] p-6">
          
          {/* Background Animations */}
          <div className="inset-0 -z-10">
            <motion.div
              className="line-animation absolute top-[400px] left-[30px] w-32 h-32 -z-10"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            >
              <motion.svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M10 10 L 50 50 L 90 10"
                  fill="transparent"
                  stroke="#3b82f6"
                  strokeWidth="4"
                />
              </motion.svg>
            </motion.div>

            <motion.div
              className="absolute bottom-[1000px] right-[250px] w-32 h-32 bg-blue-100 rounded-full -z-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />

            <motion.div
              className="absolute bottom-[50px] left-[10px] w-48 h-48 bg-purple-300 rounded-full -z-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1.2 }}
              transition={{ duration: 0.8 }}
            />

            <motion.div
              className="absolute bottom-[700px] left-[250px] w-48 h-48 bg-purple-300 rounded-full -z-10"
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
              className="absolute bottom-[720px] right-[200px] w-32 h-32 bg-blue-100 rounded-full -z-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />

            <motion.div
              className="absolute bottom-[400px] right-[500px] w-32 h-32 bg-blue-100 rounded-full -z-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
          </div>

          <div className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl text-center">
            Give more details about your project
          </div>
          <br />
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Project Submission Form</h1>
            <form onSubmit={handleSubmit}>
          {/* Project Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f3abd]"
              placeholder="What are you calling it?"
              maxLength="50"
            />
          </div>

          {/* Tagline */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Tagline</label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f3abd]"
              placeholder="Brief description or slogan"
              maxLength="200"
            />
          </div>

          {/* The Problem it Solves */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">The Problem it Solves</label>
            <textarea
              name="problem"
              value={formData.problem}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f3abd] text-black"
              rows="4"
              placeholder="Describe the problem your project addresses"
              maxLength="2000"
            ></textarea>
          </div>

          {/* Challenges I Ran Into */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Challenges I Ran Into</label>
            <textarea
              name="challenges"
              value={formData.challenges}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f3abd]"
              rows="4"
              placeholder="Describe any specific bug or hurdle and how you overcame it"
              maxLength="2000"
            ></textarea>
          </div>

          {/* Technologies I Used */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Technologies I Used</label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f3abd]"
              placeholder="Comma-separated list of technologies"
              maxLength="100"
            />
          </div>

          {/* Links */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Links</label>
            <input
              type="text"
              name="links"
              value={formData.links}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f3abd]"
              placeholder="Add links (e.g., GitHub, website)"
              maxLength="1000"
            />
          </div>

          {/* Video Demo */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Video Demo</label>
            <input
              type="text"
              name="videoDemo"
              value={formData.videoDemo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f3abd]"
              placeholder="Add a link to a video demo"
            />
          </div>

          {/* Cover Image */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Cover Image</label>
            <input
              type="file"
              name="coverImage"
              onChange={(e) => setCoverimage(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f3abd]"
            />
          </div>

          {/* Logo */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Logo</label>
            <input
              type="file"
              name="logo"
              onChange={(e) => setLogo(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f3abd]"
            />
          </div>

          {/* Pictures */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Pictures</label>
            <input
              type="file"
              name="pictures"
              multiple
              onChange={(e) => setImages(Array.from(e.target.files))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f3abd]"
            />
          </div>
          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-[#5f3abd] text-white px-3 py-2 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
          </div>
        </div>
      )}
    </>
  );
}

export default HackathonProjectSubmissionForm;

