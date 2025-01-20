import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import About from "../../components/EditPageComponents/EditAbout";
import Education from "../../components/EditPageComponents/EditEducation";
import Links from "../../components/EditPageComponents/EditLinks";
import Contacts from "../../components/EditPageComponents/EditContacts";

import ReactingNavBar from "../../components/ReactingNavBar";
import { motion } from "framer-motion";


const EditPage = () => {
    const [activeTab, setActiveTab] = useState('about');

    const renderContent = () => {
        switch (activeTab) {
            case 'about':
                return <About />;
            case 'education':
                return <Education />;
            case 'links':
                return <Links />;
            case 'contacts':
                return <Contacts />;
            default:
                return <About />;
        }
    };

    return (
        <>
            <div className="flex bg-gray min-h-screen text-black">
                <ReactingNavBar />
                <div className="space-y-3 size-full w-full">
                    <div className="space-y-4">
                        {/* Header Component */}
                        <div>
                            <Header />
                        </div>

                        {/* Navigation Buttons */}
                        <div className="bg-white shadow">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                                <div className="space-x-11">
                                    <button
                                        onClick={() => setActiveTab('about')}
                                        className={`p-2 ${activeTab === 'about' ? 'text-[#5f3abd] font-bold border-b-2 border-[#5f3abd]' : ''}`}
                                    >
                                        About
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('education')}
                                        className={`p-2 ${activeTab === 'education' ? 'text-[#5f3abd] font-bold border-b-2 border-[#5f3abd]' : ''}`}
                                    >
                                        Education
                                    </button>

                                    <button
                                        onClick={() => setActiveTab('links')}
                                        className={`p-2 ${activeTab === 'links' ? 'text-[#5f3abd] font-bold border-b-2 border-[#5f3abd]' : ''}`}
                                    >
                                        Links
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('contacts')}
                                        className={`p-2 ${activeTab === 'contacts' ? 'text-[#5f3abd] font-bold border-b-2 border-[#5f3abd]' : ''}`}
                                    >
                                        Contacts
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Content Rendering */}
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <div className="bg-white p-6 shadow-md rounded-lg text-black">
                                {renderContent()}
                            </div>
                        </div>
                    </div>
                       {/* Background Animations */}
                <div className=" inset-0 -z-10">
                    {/* <motion.div
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
                    </motion.div> */}

                    {/* <motion.div
                        className="absolute bottom-[1000px] right-[250px] w-32 h-32 bg-blue-100 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    /> */}

                    {/* <motion.div
                        className="absolute bottom-[50px] left-[10px] w-48 h-48 bg-purple-300 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                    /> */}

                    <motion.div
                        className="absolute bottom-[200px] left-[250px] w-48 h-48 bg-purple-300 rounded-full -z-10"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                    />

                    <motion.div
                        className="absolute bottom-[600px] right-[150px] w-48 h-48 bg-purple-300 rounded-full -z-10"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                    />
{/* 
                    <motion.div
                        className="absolute bottom-[720px] right-[200px] w-32 h-32 bg-blue-100 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    /> */}

                    {/* <motion.div
                        className="absolute bottom-[400px] right-[500px] w-32 h-32 bg-blue-100 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    /> */}
                </div>
                    <div>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditPage;
