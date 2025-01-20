import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import "../../styles/Homepage.css"; // Assuming the custom styles are available
import Header from "../../components/Header";
import ReactingNavBar from "../../components/ReactingNavBar";
import DisplaySponsor from "../../components/SponsorComponents/DisplaySponers";

const SponsorList = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch sponsors on component mount
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/sponsors`);
        setSponsors(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching sponsors:", err);
        setError("Error fetching sponsors");
        setLoading(false);
      }
    };

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
    <div className="flex">
  <ReactingNavBar />

  <div className="space-y-3 size-full min-h-screen">
    <Header />
    <div className="justify-center align-baseline">
      <DisplaySponsor />
    </div>
  </div>
</div>

  );
};

export default SponsorList;
