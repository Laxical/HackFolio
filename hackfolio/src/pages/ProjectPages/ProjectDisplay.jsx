import React, { useEffect, useState } from "react";
import ProjectDetails from "../../components/ProjectComponents/ProjectDetails";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to extract route params
import Header from "../../components/Header";
import ReactingNavBar from "../../components/ReactingNavBar";
import LoadingPage from "../../components/loading";
const Project_display = () => {
  const { projectId } = useParams(); // Extract projectId from the URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProject = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/project/${projectId}`);
        setProject(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUserProject();
  }, [projectId]); // Fetch project data when projectId changes

  if (loading) return <LoadingPage/>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex">

      <ReactingNavBar />

      <div className="space-y-3 size-full">

        <Header />
        {project ? (
          <ProjectDetails project={project} />
        ) : (
          <div>No project details available</div>
        )}
      </div>
    </div>
  );
};

export default Project_display;
