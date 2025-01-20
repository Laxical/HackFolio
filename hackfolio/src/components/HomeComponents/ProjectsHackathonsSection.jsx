import React, { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Link } from "react-router-dom"; // Import Link component from react-router-dom

const ProjectsHackathonsSection = () => {
  useEffect(() => {
    // GSAP Animation for both sections
    gsap.fromTo(
      ".animate-left", 
      { opacity: 0, x: -100 }, // Initial state (invisible and shifted)
      {
        opacity: 1,
        x: 0, // Reset to original position
        duration: 1.5,
        scrollTrigger: {
          trigger: ".animate-left", 
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      ".animate-right", 
      { opacity: 0, x: 100 }, // Initial state (invisible and shifted)
      {
        opacity: 1,
        x: 0, // Reset to original position
        duration: 1.5,
        scrollTrigger: {
          trigger: ".animate-right",
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className="space-y-10">
      {/* Projects Section */}
      <div className="flex flex-wrap items-center justify-center bg-gradient-to-r from-[#f5f3ff] to-[#e0e7ff] p-8 rounded-xl shadow-xl">
        <motion.div
          className="left-section animate-left flex-1 p-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-[#4c1d95] mb-4">Projects</h2>
          <p className="text-lg text-gray-700">
            Bring your ideas to life with innovative projects. Collaborate with a team, build something new, and showcase your creativity in various domains like AI, Web Development, and more.
          </p>
          {/* Button for Projects */}
          <Link to="/userprojects"> {/* Link to /userprojects */}
            <button className="mt-6 px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-200">
              Add Your Projects
            </button>
          </Link>
        </motion.div>

        {/* Animated Shapes on the right side */}
        <motion.div
          className="right-section animate-right flex-1 p-6 relative"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="shape-container flex justify-center items-center h-full relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            {/* Animated Circle */}
            <motion.div
              className="circle absolute top-10 right-10 w-24 h-24 bg-purple-400 rounded-full"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            ></motion.div>

            {/* Animated Square */}
            <motion.div
              className="square absolute bottom-10 left-10 w-32 h-32 bg-blue-300"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            ></motion.div>

            {/* Animated Ellipse */}
            <motion.div
              className="ellipse absolute top-1/3 left-1/3 w-40 h-20 bg-yellow-500 rounded-full"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 1.2 }}
            ></motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Hackathons Section */}
      <div className="flex flex-wrap items-center justify-center bg-gradient-to-l from-[#e0e7ff] to-[#f5f3ff] p-8 rounded-xl shadow-xl">
        {/* Animated Shapes on the left side */}
        <motion.div
          className="left-section animate-left flex-1 p-6 relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="shape-container flex justify-center items-center h-full relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            {/* Animated Triangle */}
            <motion.div
              className="triangle absolute top-12 left-14 w-16 h-16 bg-green-400 clip-triangle"
              initial={{ opacity: 0, rotate: 45 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            ></motion.div>

            {/* Animated Circle */}
            <motion.div
              className="circle-2 absolute bottom-10 right-14 w-28 h-28 bg-orange-300 rounded-full"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            ></motion.div>

            {/* Animated Path (Line Animation) */}
            <motion.svg
              className="line-animation absolute top-1/4 left-1/4 w-32 h-32"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2 }}
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M10 10 C 20 20, 40 20, 50 10 S 90 10, 100 50"
                fill="transparent"
                stroke="#3b82f6"
                strokeWidth="4"
              />
            </motion.svg>
          </motion.div>
        </motion.div>

        {/* Content on the right side */}
        <motion.div
          className="right-section animate-right flex-1 p-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-[#3b82f6] mb-4">Hackathons</h2>
          <p className="text-lg text-gray-700">
            Participate in global hackathons. Compete in exciting challenges, meet like-minded individuals, and win prizes for your innovative solutions.
          </p>
          {/* Button for Hackathons */}
          <Link to="/hackathons"> {/* Link to /hackathons */}
            <button className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-[#5f3abd] transition duration-200">
              Participate in Hackathon
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsHackathonsSection;
