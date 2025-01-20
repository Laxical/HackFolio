import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({role}) => {
  const [Rolebool, setRolebool] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      axios.defaults.withCredentials = true;
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jwtverify`);
        

        if (response.data.roles.includes(`${role}`)) {
          setRolebool(true);
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

  return Rolebool ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
