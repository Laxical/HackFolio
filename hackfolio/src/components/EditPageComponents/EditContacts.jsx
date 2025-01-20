import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

const Contacts = () => {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        email: '',
        city: '',
        country: ''
    });

    const [errors, setErrors] = useState({
        phoneNumber: '',
        email: '',
        city: '',
        country: ''
    });

    const [editableFields, setEditableFields] = useState({
        phoneNumber: false,
        email: false,
        city: false,
        country: false
    });

    const { id: userId } = useParams();

    // Fetch user data on component mount
    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                console.error('No userId provided!');
                return;
            }

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
                    phoneNumber: userData.phoneNumber || '',
                    email: userData.email || '',
                    city: userData.city || '',
                    country: userData.country || ''
                });

                setErrors({
                    phoneNumber: '',
                    email: '',
                    city: '',
                    country: ''
                });
            } catch (error) {
                console.error("Error fetching contact details:", error.response || error.message);
                alert("Failed to fetch contact details.");
            }
        };

        fetchData();
    }, [userId]);

    // Validation rules
    const validateField = (name, value) => {
        switch (name) {
            case 'phoneNumber':
                const phoneRegex = /^[+]?[0-9]{7,15}$/;
                if (!phoneRegex.test(value)) {
                    return 'Invalid phone number format';
                }
                if (value.replace(/^\+/, '').length !== 10) {
                    return 'Phone number must be exactly 10 digits';
                }
                return '';
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value) ? '' : 'Invalid email address format';
            case 'city':
                return value.trim() === '' ? 'City cannot be empty' : '';
            case 'country':
                return value.trim() === '' ? 'Country cannot be empty' : '';
            default:
                return '';
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Validate field
        const error = validateField(name, value);

        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const toggleEdit = (field) => {
        if (editableFields[field]) {
            if (!errors[field]) {
                updateUser(); // Update only if there are no errors
            } else {
                alert("Please fix validation errors before saving.");
                return;
            }
        }
        setEditableFields(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const updateUser = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/userProfile/${userId}/1`, formData);
            if (response.status === 200) {
                alert("Contact details updated successfully!");
            }
        } catch (error) {
            console.error("Error updating contact details:", error);
            alert("Failed to update contact details.");
        }
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
                <button 
                    onClick={() => toggleEdit(name)} 
                    className="bg-[#5f3abd] hover:bg-[#5534a7] text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                >
                    {editableFields[name] ? 'Save' : 'Edit'}
                </button>
            </div>
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
        </div>
    );

    return (
        <div className="">
            <h2 className='text-3xl bold mb-4'>Contacts Section:</h2>
            
            {renderEditableField("Phone Number", "phoneNumber")}
            {renderEditableField("Email", "email")}
            {renderEditableField("City", "city")}
            {renderEditableField("Country", "country")}
        </div>
    );
};

export default Contacts;
