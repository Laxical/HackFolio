import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import UserDashBoardProject from "../../components/ProjectComponents/UserDashboardProject";
import axios from "axios";
import { useParams, Link } from "react-router-dom"; // Import Link for navigation
import ReactingNavBar from "../../components/ReactingNavBar";
import "../../styles/userDahboard.css"; // Import custom CSS for background animation
import { motion } from "framer-motion"; // Import motion for animations
import LoadingPage from "../../components/loading";
const UserDashboard = () => {
  const { username } = useParams();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUserdetails] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to manage dropdown visibility

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/project/userprojects/${username}`);
        setProjects(projectResponse.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setProjects("No projects found"); // Set message directly
        } else {
          console.error("Error fetching project:", err);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }

      try {
        const userResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/${username}`);
        setUserdetails(userResponse.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (username) {
      fetchProject();
    }
  }, [username]);

  if (loading) return <LoadingPage/>;
  if (error) return <div>Error: {error}</div>;

  const handleProfileClick = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };

  return (
    <>
      <div className="flex">
        <ReactingNavBar />

        <div className="size-full">
          <Header />
          <div className="min-h-[95vh] flex flex-col items-center relative overflow-hidden">
            {/* Background Animations */}
            <div className="inset-0 -z-10">
              <motion.div
                className="line-animation absolute top-[400px] left-[30px] w-32 h-32"
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
                className="line-animation absolute top-[600px] left-[1000px] w-32 h-32"
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

              <motion.div
                className="absolute bottom-[50px] left-[10px] w-48 h-48 bg-purple-300 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1.2 }}
                transition={{ duration: 0.8 }}
              />

              <motion.div
                className="absolute bottom-[700px] left-[250px] w-48 h-48 bg-purple-300 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1.2 }}
                transition={{ duration: 0.8 }}
              />

              <motion.div
                className="absolute bottom-[800px] left-[1500px] w-48 h-48 bg-purple-300 rounded-full"
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
                className="absolute bottom-[10px] left-[1300px] w-48 h-48 bg-purple-300 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1.2 }}
                transition={{ duration: 0.8 }}
              />

              <motion.div
                className="absolute bottom-[10px] left-[1200px] w-32 h-32 bg-blue-100 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              />

              <motion.div
                className="absolute bottom-[200px] right-[800px] w-32 h-32 bg-blue-100 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              />
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8 mt-8 w-3/4 z-10 relative card-shapes">
              <div className="flex justify-between items-center relative">
                <div>
                  <img
                    src="https://via.placeholder.com/100"
                    alt="User Avatar"
                    className="rounded-full w-24 h-24 mb-4"
                  />
                  <h1 className="text-2xl font-bold mb-2">{user.firstName}</h1>
                  <p className="text-gray-600 mb-4">{user.bio}</p>

                  <div>
                    <h2 className="font-semibold text-lg mb-2">Projects</h2>
                    {Array.isArray(projects) && projects.length > 0 ? (
                      projects.map((project) => (
                        <UserDashBoardProject key={project.id} project={project} />
                      ))
                    ) : (
                      <p>{projects}</p> // Display the message directly
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-center relative">
                  <div className="flex space-x-3 mb-4">
                    {/* Social Media Links */}
                    <a href="#" className="bg-gray-200 rounded-full p-3 hover:bg-gray-300">
                      <i className="fab fa-github text-gray-600"></i>
                    </a>
                    <a href="#" className="bg-blue-600 text-white rounded-full p-3 hover:bg-[#5f3abd]">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" className="bg-[#5f3abd] text-white rounded-full p-3 hover:bg-blue-600">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="bg-gray-300 rounded-full p-3 hover:bg-gray-400">
                      <i className="fas fa-globe"></i>
                    </a>
                  </div>

                  <div className="w-full">
                    <h2 className="font-semibold text-lg mb-2">Skills</h2>
                    <ul className="text-gray-600">
                      {user.skills && user.skills.length > 0 ? (
                        user.skills.map((skill, index) => (
                          <li key={index}>{skill}</li>
                        ))
                      ) : (
                        <li>No skills available</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
