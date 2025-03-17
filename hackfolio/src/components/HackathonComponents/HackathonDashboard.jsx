import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const HackathonDashboard = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]); // List of teams
  const [teamMembers, setTeamMembers] = useState([]); // Members of the selected team
  const [showDetails, setShowDetails] = useState(false); // Show modal for team members
  const [selectedTeamCode, setSelectedTeamCode] = useState(""); // Track the selected teamCode

  // Fetch the teams on page load
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        console.log("hit");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/hackathon/registeredParticipants/${name}`
        );
        console.log(response);
        setTeams(response.data.response);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, [name,teams]);

  // Fetch team members when "View Details" button is clicked
  const handleViewDetails = async (teamCode) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/hackathon/registeredParticipants/teamDetails/${teamCode}`
      );
      if(response.status === 403) navigate('/Error403');
      setTeamMembers(response.data.response); // Assume the API returns an array of team members
      setSelectedTeamCode(teamCode); // Store the selected team code
      setShowDetails(true); // Show the modal
    } catch (error) {
      console.error("Error fetching team details:", error);
    }
  };

  // Handle team verification
  const handleVerifyTeam = async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/registeredParticipants/${name}/verify`, {
        teamCode: selectedTeamCode,
      });

      if(response.status === 403) navigate('/Error403');
    
      setShowDetails(false);
    } catch (error) {
      console.error("Error verifying team:", error);
      alert("Failed to verify the team.");
    }
  };

  const handleDeclineTeam = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/registeredParticipants/${name}/decline`, {
        teamCode: selectedTeamCode,
      });
      if(response.status === 403) navigate('/Error403');
      setShowDetails(false);
    } catch (error) {
      console.error("Error declining team:", error);
      alert("Failed to decline the team.");
    }
  };

  return (
    <div className="hackathon-dashboard-container bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Teams Applied</h1>
      <div className="teams-list">
        {teams.length > 0 ? (
          teams.map((team, index) => (
            <div
              key={index}
              className="team-card bg-white shadow-md rounded-lg p-6 my-6"
            >
              <h2 className="text-2xl font-bold mb-4">{team.teamName}</h2>
              <p className="text-gray-700 text-lg mb-4">
                <strong>Number of Members:</strong> {team.members.length}
              </p>
              <p className="text-gray-700 text-lg mb-4">
                <strong>Status:</strong> {team.verificationStatus}
              </p>
              <button
                className="bg-[#5f3abd] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                onClick={() => handleViewDetails(team.teamCode)}
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No teams have applied yet.</p>
        )}
      </div>

      {/* Modal for showing team members */}
      {showDetails && (
        <div className="modal fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Team Members
            </h2>

            {/* Team Members List */}
            <ul className="space-y-2 text-gray-700">
              {teamMembers.map((member, index) => (
                <li key={index} className="pl-4">
                  <p className="font-medium text-lg">{member.aliasname}</p>
                </li>
              ))}
            </ul>

            {/* More Details */}
            <ul className="list-none space-y-4 text-gray-700">
              {teamMembers.map((member, index) => (
                <li key={index} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                  <p><strong>Name:</strong> {member.aliasname}</p>
                  <p><strong>Email:</strong> {member.email}</p>
                  <p><strong>Phone:</strong> {member.phoneno}</p>
                  <p><strong>Gender:</strong> {member.gender}</p>
                  <p>
                    <strong>GitHub:</strong>{" "}
                    <a href={member.githubprofile} target="_blank" className="text-[#5f3abd] underline">
                      {member.githubprofile}
                    </a>
                  </p>
                  <p>
                    <strong>LinkedIn:</strong>{" "}
                    <a href={member.linkednprofile} target="_blank" className="text-[#5f3abd] underline">
                      {member.linkednprofile}
                    </a>
                  </p>
                  <p>
                    <strong>Portfolio:</strong>{" "}
                    <a href={member.portfoliowebsite} target="_blank" className="text-[#5f3abd] underline">
                      {member.portfoliowebsite}
                    </a>
                  </p>
                  <p><strong>Skills:</strong> {member.skills}</p>
                </li>
              ))}
            </ul>

            {/* Buttons */}
            <button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition duration-300 ease-in-out" onClick={() => setShowDetails(false)}>
              Close
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition duration-300 ease-in-out" onClick={handleVerifyTeam}>
              Verify
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition duration-300 ease-in-out" onClick={handleDeclineTeam}>
              Decline
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HackathonDashboard;
