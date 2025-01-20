import { useState } from 'react';
import EditHackathonDetails from "../../components/HackathonComponents/EditHackathonDetails";
import EditHackathonWebsite from "../../components/HackathonComponents/EditHackathonWebsite";
import HackathonDashboard from '../../components/HackathonComponents/HackathonDashboard';
import AddJudge from '../../components/JudgeComponents/AddJudge';
import AddEvaluationCriteria from '../../components/JudgeComponents/JudgeCriteria';
import Header from '../../components/Header';
import "../../styles/edit_hack_page.css";
import ReactingNavBar from '../../components/ReactingNavBar';
import Stats from '../../components/HackathonComponents/Stats';
import ViewScore from '../../components/HackathonComponents/Viewteamscores';
import { motion } from "framer-motion";

function EditOrganizedHackathonDetails() {
    const [selected, setSelected] = useState(0);

    return (
        <>
            <div className='flex'>
                <ReactingNavBar />
                <div className='space-y-3 size-full'>
                    <Header />
                    <div className='flex justify-center mt-2'>
                        <div className="edit-selection-card">
                            <div className='edit-choice-card'>
                                <button
                                    onClick={() => setSelected(0)}
                                    className={`edit-choice-btn text-2xl font-thin block mt-5 px-5 ${selected === 0 ? 'active' : ''}`}>
                                    Details
                                </button>
                                <button
                                    onClick={() => setSelected(1)}
                                    className={`edit-choice-btn text-2xl font-thin block mt-5 px-5 ${selected === 1 ? 'active' : ''}`}>
                                    Webpage
                                </button>
                                <button
                                    onClick={() => setSelected(2)}
                                    className={`edit-choice-btn text-2xl font-thin block mt-5 px-5 ${selected === 2 ? 'active' : ''}`}>
                                    Dashboard
                                </button>
                                <button
                                    onClick={() => setSelected(3)}
                                    className={`edit-choice-btn text-2xl font-thin block mt-5 px-5 ${selected === 3 ? 'active' : ''}`}>
                                    Add Judges
                                </button>
                                <button
                                    onClick={() => setSelected(4)} // New button for criteria
                                    className={`edit-choice-btn text-2xl font-thin block mt-5 px-5 ${selected === 4 ? 'active' : ''}`}>
                                    Add Evaluation Criteria
                                </button>
                                <button onClick={() => setSelected(5)}
                                    className={`edit-choice-btn text-2xl font-thin block mt-5 px-5 ${selected === 5 ? 'active' : ''}`}>
                                    Stats

                                </button>
                                <button                     onClick={()=>setSelected(6)}
                                                    className={`edit-choice-btn text-2xl font-thin block mt-5 px-5 ${selected === 5 ? 'active' : ''}`}>
                                                    View team scores
                            
                        </button>
                    </div>
                        </div>
                        <div className="flex justify-center items-center ">
                            {selected === 0 && (
                                <div className='editCard'>
                                    <EditHackathonDetails />
                                </div>
                            )}
                            {selected === 1 && (
                                <div className='editCard bg-[rgb(251,251,251)]'>
                                    <EditHackathonWebsite />
                                </div>
                            )}
                            {selected === 2 && (
                                <div className='editCard bg-[rgb(251,251,251)]'>
                                    <HackathonDashboard />
                                </div>
                            )}
                            {selected === 3 && (
                                <div className='editCard bg-[rgb(251,251,251)]'>
                                    <AddJudge />
                                </div>
                            )}
                            {selected === 4 && ( // Render new component when selected
                                <div className='editCard bg-[rgb(251,251,251)]'>
                                    <AddEvaluationCriteria />
                                </div>
                            )}
                            {selected === 5 && ( // Render new component when selected
                                <div className='editCard bg-[rgb(251,251,251)]'>
                                    <Stats />
                                </div>
                            )}
                                {selected === 6 && ( // Render new component when selected
                        <div className='editCard bg-[rgb(251,251,251)]'>
                            <ViewScore/>
                            </div>
                    )}
                    
                </div>
                    </div>
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
                        className="absolute bottom-[800px] left-[200px] w-48 h-48 bg-purple-300 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                    />

                    <motion.div
                        className="absolute bottom-[500px] left-[1550px] w-48 h-48 bg-purple-300 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                    />

                    <motion.div
                        className="absolute bottom-[400px] right-[100px] w-32 h-32 bg-blue-100 rounded-full"
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
        </>
    );
}

export default EditOrganizedHackathonDetails;
