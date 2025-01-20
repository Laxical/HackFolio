import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams for accessing URL parameters
import axios from 'axios';

const AddJudge = () => {
    const { name } = useParams(); // Get the hackathon name from URL parameters
    const [judges, setJudges] = useState([""]); // Start with one empty judge input
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch existing judges when the component mounts
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

    // Handle input change for judges
    const handleJudgeChange = (index, value) => {
        const updatedJudges = [...judges];
        updatedJudges[index] = value;
        setJudges(updatedJudges);
    };

    // Add new judge input field
    const addJudgeField = () => {
        setJudges([...judges, ""]); // Keep existing judges and add an empty field for new judge
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/judge/addjudge`, {
                name, // Use the hackathon name from params
                judges
            });

            if (response.status === 200) {
                setSuccessMessage('Judges added successfully!');
                setErrorMessage('');
                // Instead of resetting to [""] only, we can clear the new inputs
                const newJudges = judges.filter(judge => judge.trim() !== ""); // Only keep non-empty judges
                setJudges(newJudges); // Update judges to keep existing and add only new ones
            }
        } catch (error) {
            console.log(error);
            setErrorMessage('Failed to add judges. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className='add-judge-container'>
            <h2 className="text-2xl font-bold mb-4">Add Judges for {name}</h2>
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block text-lg">Judge Emails</label>
                    {judges.map((judge, index) => (
                        <input
                            key={index}
                            type="email"
                            value={judge}
                            onChange={(e) => handleJudgeChange(index, e.target.value)}
                            placeholder={`Judge ${index + 1} Email`}
                            className="border rounded px-3 py-2 w-full mb-2"
                            required
                        />
                    ))}
                    <button type="button" onClick={addJudgeField} className="text-[#5f3abd]">
                        + Add More Judges
                    </button>
                </div>

                <button type="submit" className="bg-[#5f3abd] text-white rounded px-4 py-2 mt-4">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddJudge;
