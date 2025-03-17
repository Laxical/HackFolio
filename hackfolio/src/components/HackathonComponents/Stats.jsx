import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { useParams } from "react-router-dom";
import axios from 'axios';
import LoadingPage from '../loading';
const Stats = () => {
  const { name } = useParams();
  const [teams, setTeams] = useState([]);
  const [stats, setStats] = useState({
    total: 1000,
    teams: 0,
    individuals: 0,
    accepted: 0,
    notAccepted: 0,
    unreviewed: 0,
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Applications per day',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/hackathon/registeredParticipants/${name}`
        );
        console.log(response.data.response);
        setTeams(response.data.response);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, [name]);

  useEffect(() => {
    if (teams.length > 0) {
      let totalMembers = 0;
      let accepted = 0;
      let notAccepted = 0;
      let unreviewed = 0;
      let dateCounts = {};

      teams.forEach(team => {
        if (team.members) totalMembers += team.members.length;

        if (team.verificationStatus === "verified") accepted++;
        if (team.verificationStatus === "rejected") notAccepted++;
        if (team.verificationStatus === "pending") unreviewed++;

        if (team.submittedAt) {
          const submissionDate = new Date(team.submittedAt).toLocaleDateString();
          dateCounts[submissionDate] = (dateCounts[submissionDate] || 0) + 1;
        }
      });

      setStats(prevStats => ({
        ...prevStats,
        teams: teams.length,
        individuals: totalMembers,
        accepted: accepted,
        notAccepted: notAccepted,
        unreviewed: unreviewed,
      }));

      const labels = Object.keys(dateCounts);
      const data = Object.values(dateCounts);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Applications per day',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [teams]);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

  // Function to convert JSON to CSV
  function convertJSONToCSV(jsonData, headers) {
    const csvRows = [];
    const headerRow = headers.join(',');
    csvRows.push(headerRow);

    jsonData.forEach(data => {
      const values = headers.map(header => {
        const val = data[header];
        return typeof val === 'string' ? `"${val}"` : val;
      });
      csvRows.push(values.join(','));
    });

    return csvRows.join('\n');
  }

  // Function to initiate CSV download
  function downloadCSV(jsonData, headers) {
    const csvData = convertJSONToCSV(jsonData, headers);

    // Check if CSV data is empty
    if (csvData === '') {
      alert('No data to export');
    } else {
      // Create CSV file and initiate download
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'participants_data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  const handleDownload = () => {
    const headers = ['teamName', 'members', 'verificationStatus'];
    const csvData = teams.map(team => ({
      teamName: team.teamName,
      members: team.members.length, // Join member names as a string
      verificationStatus: team.verificationStatus,
    }));

    downloadCSV(csvData, headers);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Overview</h2>

      <div className="stats-container" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <div className="stat-box">
          <h3>Total Individuals</h3>
          <p>{stats.individuals}</p>
        </div>
        <div className="stat-box">
          <h3>Teams</h3>
          <p>{stats.teams}</p>
        </div>
        <div className="stat-box">
          <h3>Accepted</h3>
          <p>{stats.accepted}</p>
        </div>
        <div className="stat-box">
          <h3>Not Accepted</h3>
          <p>{stats.notAccepted}</p>
        </div>
        <div className="stat-box">
          <h3>Unreviewed</h3>
          <p>{stats.unreviewed}</p>
        </div>
      </div>

      <div style={{ width: '100%', height: '300px' }}>
        {chartData && chartData.labels.length > 0 ? (
          <Bar data={chartData} options={options} />
        ) : (
          <LoadingPage/>
        )}
      </div>



      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={handleDownload}
          className="px-6 py-2 bg-[#5f3abd] text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Download Team Data
        </button>
      </div>
    </div>
  );
};

export default Stats;
