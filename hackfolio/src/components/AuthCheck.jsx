import { useState, useEffect } from "react";
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';

function AuthCheck() {
  const [isExp, setIsExp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      axios.defaults.withCredentials = true;
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jwtverify`);
        if(response.status === 201) {
            if(response.data.error ==='Token expired') {
                localStorage.removeItem("data");
            }
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />
}

export default AuthCheck