import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyHackathonsCard from "../../components/HackathonComponents/MyHackathonsCard";
import Header from "../../components/Header";
import "../../styles/hack_card.css";
import ReactingNavBar from "../../components/ReactingNavBar";
import { motion } from "framer-motion";

function OrganizedHackathonsDisplay() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    async function getData() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/organizedHackathons`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (response.status === 403) navigate("/Error403");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const array = await response.json();
            setData(array);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    async function handleClick(hackathonName) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/hackathonCreate/${hackathonName}/1`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (response.status === 403) navigate("/Error403");
            const data = await response.json();

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            if (data.completelyFilled) {
                navigate(`/organizedHackathons/${data.hackathonName}`);
            } else {
                navigate(`/completeHackathonCreation/${data.hackathonName}`);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return (
        <>
            <div className="flex">
                <ReactingNavBar />
                <div className="space-y-3 size-full relative">
                    <Header />

                    <div className="flex-grow min-h-screen pt-[20px] px-4">
                        {/* Heading Section */}
                        <div className="text-4xl font-medium text-center text-gray-800 my-6">
                            Organized Hackathons:
                        </div>

                        {/* Cards Section */}
                        <div className="flex flex-wrap gap-6 justify-center px-4">
                            {data.map((element, i) => (
                                <MyHackathonsCard
                                    key={i}
                                    data={element}
                                    handleClick={handleClick}
                                />
                            ))}
                        </div>
                    </div>

                {/* Background Animations */}
                <div className="absolute inset-0 -z-10">
                    <motion.div
                        className="line-animation absolute top-[400px] left-[30px] w-32 h-32"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2 }}
                    >
                        <motion.svg
                            viewBox="0 0 100 100"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <motion.path
                                d="M10 10 L 50 50 L 90 10"
                                fill="transparent"
                                stroke="#3b82f6"
                                strokeWidth="4"
                            />
                        </motion.svg>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-[1000px] right-[250px] w-32 h-32 bg-blue-100 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    />

                    <motion.div
                        className="absolute bottom-[50px] left-[10px] w-48 h-48 bg-purple-300 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                    />

                    <motion.div
                        className="absolute bottom-[700px] left-[250px] w-48 h-48 bg-purple-300 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                    />

                    <motion.div
                        className="absolute bottom-[800px] left-[1500px] w-48 h-48 bg-purple-300 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                    />

                    <motion.div
                        className="absolute bottom-[720px] right-[200px] w-32 h-32 bg-blue-100 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    />

                    <motion.div
                        className="absolute bottom-[400px] right-[500px] w-32 h-32 bg-blue-100 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    />
                </div>
                </div>
            </div>
        </>
    );
}

export default OrganizedHackathonsDisplay;
