import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

const About = () => {
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        gender: '',
        bio: '',
        skills: []
    });

    const [editableFields, setEditableFields] = useState({
        username: false,
        firstName: false,
        lastName: false,
        gender: false,
        bio: false
    });

    const [newSkill, setNewSkill] = useState("");
    const {id: userId} = useParams();
    // Fetch user data on component mount
    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                console.error('No userId provided!');
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/userProfile/${userId}/1`); 
                console.log("Fetched user data:", response.data); // Debugging: log the data to inspect

                let userData;
                // Case 1: If response.data contains the user object directly
                if (response.data.username) {
                    userData = response.data;
                } 
                // Case 2: If user data is wrapped inside a 'user' object in response.data
                else if (response.data.user) {
                    userData = response.data.user;
                } 
                // Case 3: If response.data is an array, grab the first user
                else if (Array.isArray(response.data) && response.data.length > 0) {
                    userData = response.data[0];
                }

                // Set the form data using the user details
                setFormData({
                    username: userData.username || '',
                    firstName: userData.firstName || '',
                    lastName: userData.lastName || '',
                    gender: userData.gender || '',
                    bio: userData.bio || '',
                    skills: userData.skills || []
                });
            } catch (error) {
                console.error("Error fetching user data:", error.response || error.message);
                alert("Failed to fetch user data: " + (error.response ? error.response.data.message : error.message));
            }
        };

        fetchData();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleEdit = (field) => {
        if (editableFields[field]) {
            updateUser(); // Call the update function before toggling
        }
        setEditableFields(prev => ({ ...prev, [field]: !prev[field] }));
    }

    // Update user data
    const updateUser = async () => {
        try {
            console.log(formData);
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/userProfile/${userId}/1`, formData); 
            if (response.status === 200) {
                console.log(response);
                alert("User details updated successfully!");
            }
        } catch (error) {
            console.error("Error updating user data:", error);
            alert("Failed to update user data");
        }
    }

    useEffect(() => {
        console.log(formData);
    },[formData]);

    const addSkill = () => {
        if (newSkill.trim()) {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, newSkill.trim()]
            }));
            setNewSkill("");
        }
    };

    const removeSkill = (index) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };

    const renderEditableField = (label, name, value, options) => (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}:</label>
            <div className="flex items-center">
                {options ? (
                    <select
                        id={name}
                        name={name}
                        value={formData[name]}
                        disabled={!editableFields[name]}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select {label}</option>
                        {options.map((option, i) => (
                            <option key={i} value={option}>{option}</option>
                        ))}
                    </select>
                ) : (
                    <input
                        id={name}
                        name={name}
                        value={formData[name]}
                        disabled={!editableFields[name]}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                )}
                <button
                    onClick={() => toggleEdit(name)}
                    className="bg-[#5f3abd] hover:bg-[#5836af] text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                >
                    {editableFields[name] ? 'Save' : 'Edit'}
                </button>
            </div>
        </div>
    );

    return (
        <div className="p-6">
            <h2 className='text-3xl font-bold text-center mb-6'>Edit About Details</h2>

            <div className="flex space-x-8">
                {/* Left Section */}
                <div className="w-1/2 bg-white shadow-md rounded p-6">
                    {/* {renderEditableField("Username", "username", formData.username)} */}
                    {renderEditableField("First Name", "firstName", formData.firstName)}
                    {renderEditableField("Last Name", "lastName", formData.lastName)}
                    {renderEditableField("I identify as", "gender", formData.gender, ["Male", "Female", "Non-binary", "Other"])}
                </div>

                {/* Right Section */}
                <div className="w-1/2 bg-white shadow-md rounded p-6">
                    <div className="mb-4">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Add Bio:</label>
                        <div className="flex items-center">
                            <textarea
                                id="bio"
                                name="bio"
                                value={formData.bio}
                                disabled={!editableFields.bio}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                            />
                            <button
                                onClick={() => toggleEdit('bio')}
                                className="bg-[#5f3abd] hover:bg-[#5333a3] text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                            >
                                {editableFields.bio ? 'Save' : 'Edit'}
                            </button>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="mb-4">
                        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills:</label>
                        <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                            placeholder="Enter a skill"
                        />
                        <button
                            onClick={addSkill}
                            className="bg-[#5f3abd] hover:bg-[#5534a8] text-white font-medium py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm"
                        >
                            Add Skill
                        </button>

                        <div className="mt-2">
                            {formData.skills.length > 0 && (
                                <ul className="flex flex-wrap gap-2">
                                    {formData.skills.map((skill, index) => (
                                        <li key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                                            {skill}
                                            <button
                                                onClick={() => removeSkill(index)}
                                                className="ml-2 text-red-500"
                                            >
                                                &times;
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
