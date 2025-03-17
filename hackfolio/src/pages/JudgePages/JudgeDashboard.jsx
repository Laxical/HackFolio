import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ReactingNavBar from '../../components/ReactingNavBar';
import { motion } from "framer-motion";
import LoadingPage from '../../components/loading';
const JudgeDashboard = () => {
    const [teams, setTeams] = useState([]); 
    const [criteria, setCriteria] = useState([]); 
    const [scores, setScores] = useState({}); // Change to an object to track scores per team
    const navigate = useNavigate();
    const { name } = useParams();
    const [errorMessages, setErrorMessages] = useState({}); // Track errors per team

    // Fetch teams and criteria on component load
    useEffect(() => {
        const getTeams = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/judge/getteams/${name}`);
                console.log(response.data.teams)
                setTeams(response.data.teams);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };
        
        const getCriteria = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/judge/getcriteria/${name}`);
                setCriteria(response.data.criteria);
            } catch (error) {
                console.error("Error fetching criteria:", error);
            }
        };

        getTeams();
        getCriteria();
    }, [name]);

    // Fetch project details for a team
    const getProject = async (teamCode) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/project/hackathonProject/judge/projects/${teamCode}`);
            const id = response.data.id;
            navigate(`/ProjectDisplay/${id}`);
            // Clear error for this team, if any
            setErrorMessages(prev => ({ ...prev, [teamCode]: null }));
        } catch (e) {
            if (e.response && e.response.status === 404) {
                // Set an error message for this team
                setErrorMessages(prev => ({ ...prev, [teamCode]: "Project not uploaded" }));
            }
            console.error("Error fetching project:", e);
        }
    };

    // Handle score change for each team and criterion
    const handleScoreChange = (teamId, criterionName, score) => {
        console.log(teamId, criterionName, score);
        setScores(prev => ({
            ...prev,
            [teamId]: {
                ...prev[teamId],
                [criterionName]: score
            }
        }));
    };

    // Submit evaluation and send the scores to the server
    const submitEvaluation = async (teamId) => {
        const teamScores = scores[teamId];
        // console.log(teamId);
        // console.log(scores);    
        if (!teamScores || Object.keys(teamScores).length === 0) {
            console.error("No scores to submit for team:", teamId);
            return;
        }

        const email = JSON.parse(localStorage.getItem("data")).email; // Retrieve email from localStorage

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/judge/update/scores`, {
                teamId,
                email,
                scores: teamScores,
            });
            console.log("Scores updated successfully:", response.data);
        } catch (error) {
            console.error("Error submitting scores:", error);
        }
    };

    return (
        <>
        <div className="flex">
            <ReactingNavBar />
            <div className="space-y-3 size-full">
                <Header />
                <div className="space-y-8 p-6">
                    <div className="relative overflow-hidden rounded-3xl bg-[#faf5ff] p-12">
                        <div className="relative z-10 max-w-3xl">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-4xl font-bold text-purple-700"
                            >
                                Judge Dashboard
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="mt-4 text-lg text-gray-600"
                            >
                                Evaluate projects and provide scores for each team. Your assessments will help determine the winners of the hackathon.
                            </motion.p>
                        </div>

                        {/* Decorative Shapes */}
                        <motion.div
                            className="absolute right-20 top-12 h-24 w-24 rounded-xl bg-blue-300"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        />
                        <motion.div
                            className="absolute right-40 top-32 h-32 w-48 rounded-full bg-yellow-400"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        />
                        <motion.div
                            className="absolute bottom-12 right-12 h-24 w-24 rounded-full bg-purple-400"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        />
                    </div>

                    {/* Teams and Criteria Section */}
                    <div className="relative z-10 mt-8 space-y-6">
                        {teams.length > 0 ? (
                            teams.map((team) => (
                                <motion.div
                                    key={team._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="team-evaluation border rounded-lg p-4 mb-6">
                                        <h2 className="text-xl font-semibold"><strong>Team Name:</strong> {team.teamName}</h2>
                                        <p><strong>Members:</strong> {team.members.length}</p>

                                        <button 
                                            className="bg-[#5f3abd] text-white px-4 py-2 rounded mt-4" 
                                            onClick={() => getProject(team.teamCode)}
                                        >
                                            View Project
                                        </button>

                                        {/* Display error message specific to this team */}
                                        {errorMessages[team.teamCode] && (
                                            <div className="text-red-500 mt-2">
                                                {errorMessages[team.teamCode]}
                                            </div>
                                        )}

                                        {/* Criteria Evaluation */}
                                        <div className="criteria mt-4">
                                            <h3 className="text-lg font-semibold">Evaluate Team:</h3>
                                            {criteria.map((criterion) => (
                                                <div key={criterion.name} className="criterion mb-2">
                                                    <label className="block text-sm">
                                                        {criterion.name} (Max: {criterion.maxMarks})
                                                    </label>
                                                    <input
                                                        type="number"
                                                        onChange={(e) => {
                                                            const value = parseInt(e.target.value);
                                                            if (value >= 0 && value <= criterion.maxMarks) {
                                                                handleScoreChange(team._id, criterion.name, value);
                                                            } else {
                                                                e.target.value = Math.min(Math.max(value, 0), criterion.maxMarks);
                                                                handleScoreChange(team._id, criterion.name, e.target.value);
                                                            }
                                                        }}
                                                        min={0}
                                                        max={criterion.maxMarks}
                                                        className="border px-2 py-1 w-full"
                                                        placeholder={`Enter score (0-${criterion.maxMarks})`}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            className="bg-[#5f3abd] text-white px-4 py-2 rounded mt-4"
                                            onClick={() => submitEvaluation(team._id)}
                                        >
                                            Submit Evaluation
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <LoadingPage/>

)}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default JudgeDashboard;
