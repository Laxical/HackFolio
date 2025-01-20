import React, { useState, useEffect } from 'react';
import 'chart.js/auto';
import { useParams } from "react-router-dom";
import axios from 'axios';

const ViewScore = () => {
    const { name } = useParams();
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get(
                    `/api/hackathon/registeredParticipants/${name}`
                );
                console.log(response.data.response.members);
                setTeams(response.data.response);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };

        fetchTeams();
    }, [name]);

    const downloadCSV = () => {
        const header = ["Team Name", "Team Lead Email", "Judge Emails"];
        const allCriteria = new Set();

    
        teams.forEach(team => {
            if (team.Judge && Object.keys(team.Judge).length > 0) {
                Object.values(team.Judge).forEach(criteria => {
                    Object.keys(criteria).forEach(criterion => {
                        allCriteria.add(criterion); // Collect all criteria names
                    });
                });
            }
        });

        const criteriaArray = Array.from(allCriteria);
        const finalHeader = [...header, ...criteriaArray, "Total Score"];

        const rows = [];

        teams.forEach(team => {
            const teamLead = team.members.find(member => member.role === 'lead') || {};
            const teamLeadEmail = teamLead.email || "N/A";
            let totalScore = 0;
            let judgeEmails = [];
            const criteriaScores = {};

            // If there are judges, create rows for each judge and their criteria
            if (team.Judge && Object.keys(team.Judge).length > 0) {
                Object.entries(team.Judge).forEach(([judgeEmail, criteria]) => {
                    judgeEmails.push(judgeEmail); // Collect all judge emails

                    // Record scores for each criterion and calculate total score
                    Object.entries(criteria).forEach(([criterion, score]) => {
                        criteriaScores[criterion] = score || "N/A";
                        totalScore += score || 0; // Add score to total (consider 0 if no score)
                    });
                });
            }

            // Prepare the row with all criteria scores and total score
            const row = [
                team.teamName, 
                teamLeadEmail, 
                judgeEmails.join(", "), // Join all judge emails into a single string
                ...criteriaArray.map(criterion => criteriaScores[criterion] || "N/A"), // Scores for all criteria
                totalScore
            ];

            rows.push(row);
        });

        // Convert rows to CSV format
        const csvContent = [
            finalHeader.join(","), // header row
            ...rows.map(row => row.join(",")) // data rows
        ].join("\n");

        // Create a Blob from the CSV content and trigger a download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `${name}-teams-scores.csv`);
        link.click();
    };

    return (
        <div className="container mx-auto p-4">
            <button
                onClick={downloadCSV}
                className="bg-[#5f3abd] text-white p-2 rounded mb-4 hover:bg-[#5f3abd]"
            >
                Download CSV
            </button>

            {teams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teams.map((team, index) => {
                        // Find the team lead
                        const teamLead = team.members.find(member => member.role === 'lead');

                        return (
                            <div key={index} className="bg-white shadow-md rounded-lg p-6">
                                <h3 className="text-xl font-bold mb-4">Team Name: {team.teamName}</h3>
                                <h4 className="text-md font-semibold">Team Lead Email: {teamLead?.email || 'N/A'}</h4>

                                {team.Judge && Object.keys(team.Judge).length > 0 ? (
                                    <div className="mt-4">
                                        <h4 className="text-lg font-semibold">Judges:</h4>
                                        {Object.entries(team.Judge).map(([email, criteria], idx) => (
                                            <div key={idx} className="bg-gray-100 p-4 mt-2 rounded-lg">
                                                <p className="text-md"><strong>Judge Email:</strong> {email}</p>
                                                <h5 className="text-md font-semibold mt-2">Scores:</h5>
                                                <ul className="list-disc pl-5">
                                                    {Object.entries(criteria).map(([criterion, score], i) => (
                                                        <li key={i} className="text-sm">{criterion}: {score}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 mt-2">No judges available for this team.</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-center text-gray-500">No teams found for this hackathon.</p>
            )}
        </div>
    );
};

export default ViewScore;
