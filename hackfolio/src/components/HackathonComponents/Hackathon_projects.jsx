import React, { useState, useEffect } from 'react';
import HackathonProjectCard from './HackathonProjectCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProjectCard from "../ProjectComponents/UserProjectCard";
import { Link, useNavigate } from "react-router-dom";

const HackathonProjectDisplay = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        console.log(name);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/project/hackathonprojects/${name}`);
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setProjects("No projects found");
        } else {
          console.error("Error fetching project:", err);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [name]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!projects || projects.length === 0) {
    return <div className='text-indigo-500'>No projects found</div>;
  }

  return (
    <div className="container mx-auto px-4 bg-white">
      <header className="my-8">
        <h1 className="text-3xl text-black font-bold text-center">Projects</h1>
      </header>
      {Array.isArray(projects) && projects.length > 0 ? (
                  projects.map((project) => (
                    <Link key={project.id} to={`/ProjectDisplay/${project._id}`}>
                      <ProjectCard project={project} />
                      <br />
                    </Link>
                  ))
                ) : (
                  <p className='text-black'>{projects}</p>
                )}    </div>
  );
};


export default HackathonProjectDisplay;
