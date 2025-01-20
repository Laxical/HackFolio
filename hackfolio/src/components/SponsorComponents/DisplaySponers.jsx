import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import "../../styles/Homepage.css"; // Assuming the custom styles are available
import Header from "../../components/Header";
import ReactingNavBar from "../../components/ReactingNavBar";

const DisplaySponsor = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function fetchSponsors() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/sponsors`);
      setSponsors(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching sponsors:", err);
      setError("Error fetching sponsors");
      setLoading(false);
    }
  }

  // Fetch sponsors on component mount
  useEffect(() => {
    fetchSponsors();
  }, []);

  // Handle click on a sponsor card (Redirect to sponsor detail page)
  const handleSponsorClick = (sponsor) => {
    navigate(`/sponsors/${sponsor.companyName}`); // Redirect to the sponsor detail page
  };

  // Loading and error states
  if (loading) return <div>Loading sponsors...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="relative">
      <motion.div
        className="featured-sponsors py-20 dark:text-white text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-purple-800 pb-10">
          Our Sponsors
        </h2>

        {/* Container with horizontal scrolling enabled */}
        <div className=" relative">
          <div
            className={`container mx-auto p-6 flex gap-6 ${sponsors.length < 4 ? "justify-center" : ""}`}
          >
            {sponsors.map((sponsor) => (
              <motion.div
                key={sponsor._id}
                className="sponsor-card rounded-xl shadow-2xl p-6 bg-white hover:bg-[#5f3abd] transition duration-300 cursor-pointer inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                onClick={() => handleSponsorClick(sponsor)}
                style={{ width: "200px", height: "200px" }} // Set fixed size for the square cards
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.companyName}
                  className="h-16 w-16 mb-4 mx-auto" // Adjust size of the logo inside the square card
                />
                <h3 className="font-semibold text-[#1f2937] text-xl text-center">
                  {sponsor.companyName}
                </h3>
              </motion.div>
            ))}
          </div>
          <motion.div>
              <motion.svg
                className="line-animation absolute bottom-[50px] right-[110px] w-32 h-32 -z-10"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2 }}
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M10 10 Q 50 80, 90 10"
                  fill="transparent"
                  stroke="#3b82f6"
                  strokeWidth="4"
                />
              </motion.svg>
            </motion.div>


            <motion.div>
              <motion.svg
                className="line-animation absolute bottom-[-400px] left-[10px] w-32 h-32"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2 }}
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M10 10 C 20 20, 40 40, 60 60 S 90 90, 100 50"
                  fill="transparent"
                  stroke="#3b82f6"
                  strokeWidth="4"
                />
              </motion.svg>
            </motion.div>

          {/* Background Shapes */}
          <motion.div
            className="absolute bottom-[-310px] left-[40px] w-32 h-32 bg-yellow-400 rounded-full z-[-10]"
            animate={{ opacity: 0.5, scale: [1, 1.2, 1] }}
            transition={{ duration: 1}}
          />
          <motion.div
            className="absolute bottom-[110px] right-10 w-40 h-40 bg-pink-400 rounded-full -z-10"
            animate={{opacity:0.7, scale: [1, 1.2, 1] }}
            transition={{ duration: 3 }}
          />
          <motion.div
            className="absolute top-1/4 right-[10px] w-24 h-24 bg-blue-300 rounded-md z-[-10]"
            animate={{opacity:0.5, rotate: [0, 180] }}
            transition={{ duration: 1}}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default DisplaySponsor;
