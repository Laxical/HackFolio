import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingPage from "../loading";

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

  useEffect(() => {
    fetchSponsors();
  }, []);

  const handleSponsorClick = (sponsor) => {
    navigate(`/sponsors/${sponsor.companyName}`);
  };

  if (loading) return <LoadingPage />;
  if (error) return <div>{error}</div>;

  return (
    <div className="relative min-h-screen py-10 bg-gray-100 dark:bg-gray-900">
      <motion.div
        className="featured-sponsors py-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-purple-800 dark:text-white mb-10">
          Our Sponsors
        </h2>

        {/* Sponsor cards */}
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sponsors.map((sponsor) => (
            <motion.div
              key={sponsor._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleSponsorClick(sponsor)}
              className="cursor-pointer"
            >
              <Card className="hover:shadow-lg transition duration-200">
                <CardHeader className="text-center">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.companyName}
                    className="h-16 w-16 mb-4 mx-auto"
                  />
                  <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
                    {sponsor.companyName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="mx-auto block text-blue-500">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Background Shapes and SVG Animations */}
      
        <motion.div
          className="absolute top-[50px] right-[-60px] w-40 h-40 bg-pink-400 rounded-full"
          animate={{ opacity: 0.6, scale: [1, 1.1, 1] }}
          transition={{ duration: 3 }}
        />
        <motion.div
          className="absolute top-1/3 right-10 w-24 h-24 bg-blue-300 rounded-md"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
};

export default DisplaySponsor;
