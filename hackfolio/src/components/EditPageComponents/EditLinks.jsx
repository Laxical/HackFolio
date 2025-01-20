import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

const Links = () => {
    const [formData, setFormData] = useState({
        linkedinProfile: '',
        githubProfile: '',
        additionalLinks: []
    });

    const [errors, setErrors] = useState({
        linkedinProfile: '',
        githubProfile: '',
        additionalLinks: []
    });

    const [editableFields, setEditableFields] = useState({
        linkedinProfile: false,
        githubProfile: false,
        additionalLinks: false
    });

    const { id: userId } = useParams();

    // Fetch user links data on component mount
    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                console.error('No userId provided!');
                return; // Exit early if userId is undefined
            }
            console.log(userId);
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/userProfile/${userId}/1`);
                console.log("Fetched user data:", response.data);

                let userData;

                if (response.data.user) {
                    userData = response.data.user;
                } else {
                    userData = response.data;
                }

                setFormData({
                    linkedinProfile: userData.linkedinProfile || '',
                    githubProfile: userData.githubProfile || '',
                    additionalLinks: userData.additionalLinks || []
                });
                setErrors({
                    linkedinProfile: '',
                    githubProfile: '',
                    additionalLinks: []
                });
            } catch (error) {
                console.error("Error fetching links data:", error);
                alert("Failed to fetch links data");
            }
        };
        fetchData();
    }, [userId]);

    // Handle form change with validation
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validate URL
        const urlRegex = /^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/.*)?$/;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (value && !urlRegex.test(value)) {
            setErrors(prev => ({ ...prev, [name]: 'Invalid URL format' }));
        } else {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Validate additional links
    const validateAdditionalLinks = (index, value) => {
        const urlRegex = /^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/.*)?$/;
        const newErrors = [...errors.additionalLinks];

        if (value && !urlRegex.test(value)) {
            newErrors[index] = 'Invalid URL format';
        } else {
            newErrors[index] = '';
        }

        setErrors(prev => ({ ...prev, additionalLinks: newErrors }));
    };

    // Handle editing and saving functionality
    const handleEdit = (field) => {
        if (editableFields[field]) {
            updateLinks(); // Update data before disabling edit mode
        }
        setEditableFields(prev => ({ ...prev, [field]: !prev[field] }));
    };

    // Update links data
    const updateLinks = async () => {
        try {
            console.log(formData);
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/userProfile/${userId}/1`, formData);
            if (response.status === 200) {
                console.log(response);
                alert("Links updated successfully!");
            }
        } catch (error) {
            console.error("Error updating links data:", error);
            alert("Failed to update links data");
        }
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    // Add and remove additional links
    const addLink = () => {
        setFormData(prev => ({ ...prev, additionalLinks: [...prev.additionalLinks, ""] }));
        setErrors(prev => ({ ...prev, additionalLinks: [...prev.additionalLinks, ''] }));
    };

    const removeLink = (index) => {
        const newLinks = formData.additionalLinks.filter((_, i) => i !== index);
        const newErrors = errors.additionalLinks.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, additionalLinks: newLinks }));
        setErrors(prev => ({ ...prev, additionalLinks: newErrors }));
    };

    const renderEditableField = (label, name) => (
        <div className='mt-4'>
            <label htmlFor={name}>{label}: </label>
            <div className='flex items-center'>
                <input
                    id={name}
                    name={name}
                    value={formData[name]}
                    disabled={!editableFields[name]}
                    onChange={handleChange}
                    className={`edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors[name] ? 'border-red-500' : ''
                    }`}
                />
                <button onClick={() => handleEdit(name)} className="bg-[#5f3abd] hover:bg-[#5634ac] text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">
                    {editableFields[name] ? 'Save' : 'Edit'}
                </button>
            </div>
            {errors[name] && <p className="text-red-500 mt-1">{errors[name]}</p>}
        </div>
    );

    return (
        <div className="">
            <h2 className='text-3xl bold mb-4'>Links Section:</h2>

            {renderEditableField("LinkedIn Profile", "linkedinProfile")}
            {renderEditableField("GitHub Profile", "githubProfile")}

            <div className='mt-4'>
                <label htmlFor="additionalLinks">Additional Links: </label>
                {formData.additionalLinks.map((link, i) => (
                    <div key={i} className="flex items-center">
                        <input
                            value={link}
                            onChange={(e) => {
                                const newLinks = [...formData.additionalLinks];
                                newLinks[i] = e.target.value;
                                setFormData(prev => ({ ...prev, additionalLinks: newLinks }));
                                validateAdditionalLinks(i, e.target.value);
                            }}
                            disabled={!editableFields.additionalLinks}
                            className={`edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2 ${
                                errors.additionalLinks[i] ? 'border-red-500' : ''
                            }`}
                        />
                        <button onClick={() => removeLink(i)} className="font-medium edit-btn mt-2 mr-0 ml-2">
                            Remove
                        </button>
                        {errors.additionalLinks[i] && <p className="text-red-500 mt-1">{errors.additionalLinks[i]}</p>}
                    </div>
                ))}
                <button onClick={addLink} className="add-link-btn font-medium edit-btn py-2 px-3">
                    Add
                </button>
                <button onClick={() => handleEdit('additionalLinks')} className="bg-[#5f3abd] hover:bg-[#5333a3] text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline edit-btn">
                    {editableFields.additionalLinks ? 'Save' : 'Edit'}
                </button>
            </div>
        </div>
    );
};

export default Links;
