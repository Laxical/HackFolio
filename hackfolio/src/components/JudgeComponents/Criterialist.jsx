import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CriteriaList = () => {
    const { name } = useParams(); // Get the hackathon name from URL parameters
    const [criteria, setCriteria] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch existing criteria when the component mounts
    useEffect(() => {
        const fetchCriteria = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/judge/getcriteria/${name}`); // Adjust the API endpoint as needed
                if (response.data && response.data.criteria) {
                    setCriteria(response.data.criteria); // Set the fetched criteria
                }
            } catch (error) {
                console.error('Error fetching criteria:', error);
                setErrorMessage('Failed to fetch existing criteria.');
            }
        };

        fetchCriteria();
    }, [name]);

    return (
        <div className="criteria-list-container">
            <h2 className="text-2xl font-bold mb-4">Existing Criteria for {name}</h2>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {criteria.length === 0 ? (
                <p>No criteria have been added yet.</p>
            ) : (
                <ul className="list-disc pl-5">
                    {criteria.map((criterion, index) => (
                        <li key={index} className="mb-2">
                            <strong>{criterion.name}</strong>: {criterion.maxMarks} points
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CriteriaList;
