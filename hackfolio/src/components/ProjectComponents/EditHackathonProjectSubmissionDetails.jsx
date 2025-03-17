import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../Header";
import ReactingNavBar from "../ReactingNavBar";
import LoadingPage from "../loading";

const EditHackathonProjectSubmissionDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(null);
  const [imageChange, setImageChange] = useState({
    0: false,
    1: false,
    2: false
  });

  useEffect(() => {
    const fetchUserProject = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/project/${projectId}`);
        setProject(response.data);
        setEditedProject(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUserProject();
  }, [projectId]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedProject({ ...project });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prev) => ({
      ...prev,
      [name]: name === "technologies" ? value.split(", ") : value,
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
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      console.log(editedProject);
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/project/${projectId}`, editedProject);
      setProject(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating project:", err);
      setError(err.message);
    }
  };

  if (loading) return <LoadingPage/>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex">
      <ReactingNavBar />
      <div className="space-y-3 w-full">
        <Header />
        <div className="p-4">
          <button
            onClick={handleEditToggle}
            className="mb-4 px-4 py-2 bg-[#5f3abd] text-white rounded hover:bg-blue-600 transition-colors"
          >
            {isEditing ? "Cancel Edit" : "Edit Project"}
          </button>
          {project ? (
            isEditing ? (
              <form onSubmit={handleSave} className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                  <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Project Name</label>
                  <input
                    type="text"
                    id="projectName"
                    name="projectName"
                    value={editedProject.projectName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="tagline" className="block text-sm font-medium text-gray-700">Tagline</label>
                  <textarea
                    id="tagline"
                    name="tagline"
                    value={editedProject.tagline}
                    onChange={handleInputChange}
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="problem" className="block text-sm font-medium text-gray-700">Problem It Solves</label>
                  <textarea
                    id="problem"
                    name="problem"
                    value={editedProject.problem}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="challenges" className="block text-sm font-medium text-gray-700">Challenges I Ran Into</label>
                  <textarea
                    id="challenges"
                    name="challenges"
                    value={editedProject.challenges}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">Technologies (comma-separated)</label>
                  <input
                    type="text"
                    id="technologies"
                    name="technologies"
                    value={Array.isArray(editedProject.technologies) ? editedProject.technologies.join(", ") : editedProject.technologies}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="links" className="block text-sm font-medium text-gray-700">GitHub URL</label>
                  <input
                    type="url"
                    id="links"
                    name="links"
                    value={editedProject.links}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="videoDemo" className="block text-sm font-medium text-gray-700">Demo URL</label>
                  <input
                    type="url"
                    id="videoDemo"
                    name="videoDemo"
                    value={editedProject.videoDemo}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">{project.projectName}</h2>
                <p className="mb-2"><strong>Tagline:</strong> {project.tagline}</p>
                <p className="mb-2"><strong>Problem It Solves:</strong> {project.problem}</p>
                <p className="mb-2"><strong>Challenges I Ran Into:</strong> {project.challenges}</p>
                <p className="mb-2"><strong>Technologies:</strong> {Array.isArray(project.technologies) ? project.technologies.join(", ") : project.technologies}</p>
                <p className="mb-2"><strong>GitHub URL:</strong> <a href={project.links} className="text-[#5f3abd] hover:underline">{project.links}</a></p>
                <p className="mb-2"><strong>Demo URL:</strong> <a href={project.videoDemo} className="text-[#5f3abd] hover:underline">{project.videoDemo}</a></p>
              </div>
            )
          ) : (
            <div>No project details available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditHackathonProjectSubmissionDetails;

