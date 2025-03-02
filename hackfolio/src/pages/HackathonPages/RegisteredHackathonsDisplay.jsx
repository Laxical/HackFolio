import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyHackathonsCard from "../../components/HackathonComponents/MyHackathonsCard";
import Header from "../../components/Header";
import "../../styles/hack_card.css";
import ReactingNavBar from "../../components/ReactingNavBar";
import { motion } from "framer-motion"; // Import framer-motion for animations

function RegisteredHackathonsDisplay() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  async function getData() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/registeredHackathons`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      if (response.status === 403) navigate('/Error403');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const array = await response.json();
      setData(array);

    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function handleClick(hackathonName) {
    navigate(`/hackathon/${hackathonName}/editRegistrationDetails`);
  }

  return (
    <>
      <div className="relative flex">
        {/* Background Animations */}
        <div className="inset-0 -z-10 absolute">
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

        {/* Main content */}
        <ReactingNavBar />
        <div className="space-y-3 w-full">
            <Header />
            <div className="text-4xl font-medium flex justify-center my-[50px]">
                Registered Hackathons :
            </div>
            <div className="flex justify-center">
                <div className="flex flex-wrap justify-center w-4/5">
                    {data.map((element, i) => (
                        <MyHackathonsCard data={element} handleClick={handleClick} />
                    ))}
                </div>
            </div>     
        </div>
      </div>
    </>
  );
}

export default RegisteredHackathonsDisplay;
