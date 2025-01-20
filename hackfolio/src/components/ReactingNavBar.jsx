import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import {
  FiChevronsRight,
  FiHome,
  FiPenTool,
  FiUsers,
} from "react-icons/fi";
import { FaLaptopCode,FaUserEdit } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import { PiFolderUserBold } from "react-icons/pi";
import { motion } from "framer-motion";
 

// Main Navbar Component
const ReactingNavBar = () => {
  const [username, setUsername] = useState(""); // Initialize username state
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUsername(parsedData?.username || ""); // Set username safely
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []);
  return <Sidebar username={username}/>;
};

const Sidebar = ({username}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
      style={{
        width: open ? "250px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        <Option
          Icon={FiHome}
          title="Home"
          selected={selected}
          setSelected={setSelected}
          open={open}
          path="/" // Add path for navigation
        />
        <Option
          Icon={FaUserEdit}
          title="Edit Profile"
          selected={selected}
          setSelected={setSelected}
          open={open}
          path={`/editprofile/${username}`} // Add path for navigation
        />
        <Option
          Icon={FaUserGraduate}
          title="My Portfolio"
          selected={selected}
          setSelected={setSelected}
          open={open}
          path={`/@/${username}`}
        />
        <Option
          Icon={FaLaptopCode}
          title="Create Hackathon"
          selected={selected}
          setSelected={setSelected}
          open={open}
          path="/CreateHackathon" // Add path for navigation
        />
        <Option
          Icon={FiUsers}
          title="Organise Hackathons"
          selected={selected}
          setSelected={setSelected}
          open={open}
          path="/organizedHackathons" // Add path for navigation
        />
        <Option
          Icon={FiPenTool}
          title="Registered Hackathons"
          selected={selected}
          setSelected={setSelected}
          open={open}
          path="/registeredHackathons" // Add path for navigation
        />
        <Option
          Icon={PiFolderUserBold}
          title="My Projects"
          selected={selected}
          setSelected={setSelected}
          open={open}
          path="/userProjects" // Add path for navigation
        />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({ Icon, title, selected, setSelected, open, path }) => {
  return (
    <Link to={path}> {/* Wrap the button in Link */}
      <motion.button
        layout
        onClick={() => setSelected(title)}
        className={`relative flex h-10 w-full items-center rounded-md transition-colors ${selected === title ? "bg-indigo-100 text-indigo-800" : "text-slate-500 hover:bg-slate-100"}`}
      >
        <motion.div
          layout
          className="grid h-full w-10 place-content-center text-lg"
        >
          <Icon />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            {title}
          </motion.span>
        )}
      </motion.button>
    </Link>
  );
};

const TitleSection = ({ open }) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <Link to="/" className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xl font-bold">HackQuest</span>
            </motion.div>
          )}
        </div>
      </Link>
    </div>
  );
};

const Logo = () => {
  return (
    <motion.div
      layout
      className="grid place-content-center w-12 h-12 bg-gradient-to-br from-[#5f3abd] to-purple-800 rounded-lg shadow-md"
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Background square */}
        <rect x="3" y="3" width="30" height="30" rx="6" fill="#1E40AF" />

        {/* Diagonal stripes */}
        <path
          d="M6 6L30 30"
          stroke="url(#stripeGradient)"
          strokeWidth="1.5"
        />
        <path
          d="M30 6L6 30"
          stroke="url(#stripeGradient)"
          strokeWidth="1.5"
        />

        {/* Central abstract diamond */}
        <rect
          x="12"
          y="12"
          width="12"
          height="12"
          transform="rotate(45 18 18)"
          fill="url(#diamondGradient)"
        />

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="stripeGradient" x1="6" y1="6" x2="30" y2="30">
            <stop offset="0%" style={{ stopColor: "#6366F1" }} />
            <stop offset="100%" style={{ stopColor: "#A78BFA" }} />
          </linearGradient>
          <linearGradient id="diamondGradient" x1="12" y1="12" x2="24" y2="24">
            <stop offset="0%" style={{ stopColor: "#8B5CF6" }} />
            <stop offset="100%" style={{ stopColor: "#3B82F6" }} />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};




const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

export default ReactingNavBar;
