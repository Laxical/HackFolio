import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Education() {
    const [formData, setFormData] = useState({
        degreeType: '',
        institution: '',
        fieldOfStudy: '',
        graduationMonth: '',
        graduationYear: '',
        dateofgraduation: '',
        certificationLinks: []
    });

    const [editableFields, setEditableFields] = useState({
        degreeType: false,
        institution: false,
        fieldOfStudy: false,
        graduationMonth: false,
        graduationYear: false,
        dateofgraduation: false,
        certificationLinks: false
    });

    const [errors, setErrors] = useState({
        degreeType: '',
        institution: '',
        fieldOfStudy: '',
        graduationMonth: '',
        graduationYear: '',
        dateofgraduation: '',
        certificationLinks: []
    });

    const { id: userId } = useParams();

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const years = Array.from({ length: 2024 - 1950 + 1 }, (_, index) => 1950 + index);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/userProfile/${userId}/2`);
                const userData = response.data;

                setFormData({
                    degreeType: userData.degreeType || '',
                    institution: userData.institution || '',
                    fieldOfStudy: userData.fieldOfStudy || '',
                    graduationMonth: userData.graduationMonth || '',
                    graduationYear: userData.graduationYear || '',
                    dateofgraduation: userData.dateofgraduation || '',
                    certificationLinks: userData.certificationLinks || []
                });
            } catch (error) {
                console.error("Error fetching education data:", error);
                alert("Failed to fetch education data");
            }
        };
        fetchData();
    }, [userId]);

    const validateField = (name, value) => {
        switch (name) {
            case 'degreeType':
                return value ? '' : 'Degree type is required.';
            case 'institution':
                return value.trim() ? '' : 'Institution name cannot be empty.';
            case 'fieldOfStudy':
                return value.trim() ? '' : 'Field of study cannot be empty.';
            case 'graduationMonth':
                return months.includes(value) ? '' : 'Please select a valid graduation month.';
            case 'graduationYear':
                return years.includes(parseInt(value)) ? '' : 'Please select a valid graduation year.';
                case 'dateofgraduation': {
                    // Regex for DD-MM-YYYY format
                    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/;
                    if (!dateRegex.test(value)) {
                        return 'Date must be in the format DD-MM-YYYY.';
                    }
        
                    // Extract day, month, year
                    const [day, month, year] = value.split('-').map(Number);
        
                    // Check month and day range
                    const daysInMonth = {
                        1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30,
                        7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
                    };
        
                    // Adjust February for leap years
                    if (month === 2 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) {
                        daysInMonth[2] = 29;
                    }
        
                    // Validate day
                    if (day > daysInMonth[month]) {
                        return `Invalid day for the given month. Maximum days in month ${month} are ${daysInMonth[month]}.`;
                    }
        
                    return '';
                }
            case 'certificationLinks':
                const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
                return value.every(link => urlRegex.test(link)) ? '' : 'All certification links must be valid URLs.';
            default:
                return '';
        }
    };

    const validateForm = () => {
        const newErrors = {};
        for (const field in formData) {
            newErrors[field] = validateField(field, formData[field]);
        }
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error); // Return true if no errors
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Validate as user types
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleEdit = (field) => {
        if (editableFields[field]) {
            if (validateForm()) {
                updateEducation();
            } else {
                alert("Please fix the validation errors before saving.");
                return;
            }
        }
        setEditableFields(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const updateEducation = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/userProfile/${userId}/2`, formData);
            if (response.status === 200) {
                alert("Education details updated successfully!");
            }
        } catch (error) {
            console.error("Error updating education data:", error);
            alert("Failed to update education data");
        }
    };

    const addLink = () => {
        setFormData(prev => ({ ...prev, certificationLinks: [...prev.certificationLinks, ""] }));
    };

    const removeLink = (index) => {
        const newLinks = formData.certificationLinks.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, certificationLinks: newLinks }));
    };

    const renderEditableField = (label, name, options) => (
        <div className="mt-4">
            <label htmlFor={name}>{label}: </label>
            <div className="flex items-center">
                {options ? (
                    <select
                        id={name}
                        name={name}
                        value={formData[name]}
                        disabled={!editableFields[name]}
                        onChange={handleChange}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors[name] ? 'border-red-500' : ''
                        }`}
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
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors[name] ? 'border-red-500' : ''
                        }`}
                    />
                )}
                <button
                    onClick={() => handleEdit(name)}
                    className="bg-[#5f3abd] hover:bg-[#5433a5] text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                >
                    {editableFields[name] ? 'Save' : 'Edit'}
                </button>
            </div>
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
        </div>
    );

    return (
        <div className="">
            <h2 className="text-3xl font-bold mb-4">Edit Education Details:</h2>
            {renderEditableField("Degree Type", "degreeType", ["Associate", "Bachelor", "Master", "PhD"])}
            {renderEditableField("Institution Name", "institution")}
            {renderEditableField("Field of Study", "fieldOfStudy")}
            {renderEditableField("Month of Graduation", "graduationMonth", months)}
            {renderEditableField("Year of Graduation", "graduationYear", years)}
            {/* {renderEditableField("Date of Graduation", "dateofgraduation")} */}

            <div className="mt-4">
                <label>Certification Links: </label>
                {formData.certificationLinks.map((link, index) => (
                    <div key={index} className="flex items-center">
                        <input
                            value={link}
                            onChange={(e) => {
                                const newLinks = [...formData.certificationLinks];
                                newLinks[index] = e.target.value;
                                setFormData(prev => ({ ...prev, certificationLinks: newLinks }));
                                setErrors(prev => ({ ...prev, certificationLinks: validateField('certificationLinks', newLinks) }));
                            }}
                            disabled={!editableFields.certificationLinks}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                errors.certificationLinks[index] ? 'border-red-500' : ''
                            }`}
                        />
                        <button onClick={() => removeLink(index)} className="ml-2 text-red-500 font-medium">Remove</button>
                    </div>
                ))}
                <button onClick={addLink} className="bg-[#5f3abd] text-white font-medium py-2 px-4 rounded mt-2">Add Link</button>
            </div>
        </div>
    );
}

export default Education;
