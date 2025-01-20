import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JudgeList = ({ name }) => {
    const [judges, setJudges] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch judges when the component mounts or when name changes
    useEffect(() => {
        const fetchJudges = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/judge/getjudges/${name}`); // Adjust the API endpoint as needed
                if (response.data && response.data.judges) {
                    setJudges(response.data.judges); // Set the fetched judges
                }
            } catch (error) {
                console.error('Error fetching judges:', error);
                setErrorMessage('Failed to fetch existing judges.');
            }
        };

        fetchJudges();
    }, [name]);

    return (
        <div className='judge-list'>
            <h3 className="text-lg font-semibold mb-2">Existing Judges</h3>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {judges.length > 0 ? (
                <ul>
                    {judges.map((judge, index) => (
                        <li key={index} className="mb-1">
                            {judge}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No judges added yet.</p>
            )}
        </div>
    );
};

export default JudgeList;
