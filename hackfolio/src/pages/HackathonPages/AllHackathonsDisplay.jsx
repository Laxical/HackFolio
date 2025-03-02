import { useState, useEffect } from "react";
import HackathonsDisplayCard from "../../components/HackathonComponents/HackathonsDisplayCard";
import Header from "../../components/Header";
import "../../styles/hack_card.css";
import ReactingNavBar from "../../components/ReactingNavBar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function AllHackathonsDisplay() {
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    async function getData(pageNo) {
        if (pageNo < 1 || pageNo > totalPages) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon?page=${pageNo}&limit=4`, {
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

            const data = await response.json();
            setData(data.hackathons);
            setPage(data.currentPage);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getData(1);
    }, []);

    async function handleSearch(query) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon?search=${query}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: 'include',
              });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setData(data.hackathons);
            setPage(1);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error searching data:", error);
        }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery.trim()) {
                handleSearch(searchQuery);
            } else {
                getData(1);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    function PageNumbers() {
        let pages = [];
        for (let i = 0; i < totalPages; i++) pages.push(i + 1);

        return (
            <div className="flex justify-center my-[20px]">
                {pages.length !== 0 && (
                    <button
                        onClick={() => getData(page - 1)}
                        className="py-1 px-2 bg-[#5f3abd] text-white rounded mr-2 hover:bg-[#5635ac]"
                    >
                        {"< prev"}
                    </button>
                )}
                {pages.map((ele, i) => (
                    <button
                        key={i}
                        onClick={() => getData(i + 1)}
                        className={
                            page === i + 1
                                ? "py-1 px-2 bg-[#5f3abd] text-white rounded mr-2"
                                : "py-1 px-2 rounded text-gray-600 underline mr-2"
                        }
                    >
                        {ele}
                    </button>
                ))}
                {pages.length !== 0 && (
                    <button
                        onClick={() => getData(page + 1)}
                        className="py-1 px-2 bg-[#5f3abd] text-white rounded hover:bg-[#5635ac]"
                    >
                        {"Next >"}
                    </button>
                )}
            </div>
        );
    }

    return (
        <>
            <div className="flex relative ">
                <ReactingNavBar className=""/>
                <div className="space-y-3 size-full">
                    <div className="">
                        <Header />
                        <div className="flex justify-center mt-[40px] mb-[20px]">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border py-[10px] border-gray-500 rounded-[10px] w-[500px] pl-[20px] text-[20px]"
                                placeholder="Search for hackathons"
                            />
                        </div>
                        <div className="flex justify-center">
                            <div className="flex flex-wrap justify-center w-4/5">
                                {data.map((element, i) => (
                                    <HackathonsDisplayCard key={i} data={element} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <PageNumbers />
                    </div>
                </div>

                {/* Background Animations */}
                <div className=" inset-0 -z-10">
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
        </>
    );
}

export default AllHackathonsDisplay;
