import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CriteriaList from './Criterialist'; // Ensure this path is correct

const AddCriteria = () => {
    const { name } = useParams(); // Get the hackathon name from URL parameters
    const [criteria, setCriteria] = useState([{ name: '', maxMarks: '' }]); // Initial criteria state
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle input change for criteria
    const handleCriteriaChange = (index, field, value) => {
        const updatedCriteria = [...criteria];
        if (field === 'maxMarks') {
            updatedCriteria[index][field] = Number(value); // Convert maxMarks to a number
        } else {
            updatedCriteria[index][field] = value;
        }
        setCriteria(updatedCriteria);
    };

    // Add new criteria input field
    const addCriteriaField = () => {
        setCriteria([...criteria, { name: '', maxMarks: '' }]);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Filter out any empty criteria fields before submitting
        const filteredCriteria = criteria.filter(criterion => 
            criterion.name.trim() !== '' && 
            typeof criterion.maxMarks === 'number' && 
            !isNaN(criterion.maxMarks) && 
            criterion.maxMarks > 0 // Ensure maxMarks is a positive number
        );

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/judge/addcriteria`, {
                name, // Use the hackathon name from params
                criteria: filteredCriteria // Only send valid criteria
            });

            if (response.status === 200) {
                setSuccessMessage('Criteria added successfully!');
                setErrorMessage('');
                // Reset the input fields after success
                setCriteria([{ name: '', maxMarks: '' }]); // Clear the fields for new input
            }
        } catch (error) {
            console.log(error);
            setErrorMessage('Failed to add criteria. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className='add-criteria-container'>
            <h2 className="text-2xl font-bold mb-4">Add Criteria for {name}</h2>
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block text-lg">Judging Criteria</label>
                    {criteria.map((criterion, index) => (
                        <div key={index} className="flex space-x-2">
                            <input
                                type="text"
                                value={criterion.name}
                                onChange={(e) => handleCriteriaChange(index, 'name', e.target.value)}
                                placeholder={`Criterion ${index + 1} Name`}
                                className="border rounded px-3 py-2 w-full mb-2"
                                required
                            />
                            <input
                                type="number"
                                value={criterion.maxMarks}
                                onChange={(e) => handleCriteriaChange(index, 'maxMarks', e.target.value)}
                                placeholder={`Max Marks`}
                                className="border rounded px-3 py-2 w-full mb-2"
                                required
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addCriteriaField} className="text-[#5f3abd]">
                        + Add More Criteria
                    </button>
                </div>

                <button type="submit" className="bg-[#5f3abd] text-white rounded px-4 py-2 mt-4">
                    Submit
                </button>
            </form>
            {/* Render the existing criteria list */}
            <CriteriaList />
        </div>
    );
};

export default AddCriteria;
