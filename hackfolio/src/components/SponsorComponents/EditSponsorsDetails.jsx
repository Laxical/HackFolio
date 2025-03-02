import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const token = localStorage.getItem('data');

function EditSponsorsDetails() {
    const [data, setData] = useState(null);
    const [formData, setFormData] = useState({
        userName: '',
        companyName: '',
        website: '',
        email: '',
        phoneNumber: '',
        logo: '',
        registrationNumber: '',
        taxId: '',
        address: {
            street: '',
            city: '',
            state: '',
            zip: '',
            country: ''
        },
        description: '',
        verificationStatus: 'Pending'
    });
    const [editableFields, setEditableFields] = useState({
        userName: false,
        companyName: false,
        website: false,
        phoneNumber: false,
        logo: false,
        registrationNumber: false,
        taxId: false,
        address: false,
        description: false,
        verificationStatus: false,
    });

    useEffect(() => {
        getSponsorInfo();
    }, []);

    async function getSponsorInfo() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sponsors/updateSponsorDetails`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: 'include',
              });
            if (!response.ok) throw new Error('Network response was not ok');
            const arr = await response.json();
            setData(arr.data);
            setFormData({
                userName: arr.data.userName,
                companyName: arr.data.companyName,
                website: arr.data.website,
                email: JSON.parse(token).email,
                phoneNumber: arr.data.phoneNumber,
                logo: arr.data.logo,
                registrationNumber: arr.data.registrationNumber,
                taxId: arr.data.taxId,
                address: arr.data.address,
                description: arr.data.description,
                verificationStatus: arr.data.verificationStatus,
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function submitHandle() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sponsors/updateSponsorDetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({formData}),
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Network response was not ok');
            console.log(await response.json());
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    function handleEdit(field) {
        setEditableFields(prev => ({ ...prev, [field]: !prev[field] }));
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function handleAddressChange(event) {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            address: { ...prev.address, [name]: value }
        }));
    }

    function renderEditableField(label, name, value) {
        return (
            <div className='mt-10 text-black'>
                <label htmlFor={name} className="text-black">{label}: </label>
                <div className='flex items-center'>
                    <input
                        id={name}
                        name={name}
                        value={formData[name]}
                        disabled={!editableFields[name]}
                        onChange={handleChange}
                        className={`edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline`}
                    />
                    <button onClick={() => handleEdit(name)} className="bg-[#5f3abd] font-medium hover:bg-[#5f3abd] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 edit-btn">
                        {editableFields[name] ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>
        );
    }

    if (data === null) return <div className="text-black">Loading...</div>;

    return (
        <div className="text-black">
            <div className='text-3xl bold mb-4'>Edit Sponsor Details:</div>
            <div className="">
                {renderEditableField("User Name", "userName", formData.userName)}
                {renderEditableField("Company Name", "companyName", formData.companyName)}
                {renderEditableField("Website", "website", formData.website)}
                <div className='mt-10'>
                    <label htmlFor="email" className="text-black">Email: </label>
                    <div className='flex items-center'>
                        <input
                            id="email"
                            name="email"
                            value={formData["email"]}
                            disabled={!editableFields["email"]}
                            onChange={handleChange}
                            className={`text-black edit-inp shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
                        />
                    </div>
                </div>
                {renderEditableField("Phone Number", "phoneNumber", formData.phoneNumber)}
                {renderEditableField("Logo URL", "logo", formData.logo)}
                {renderEditableField("Registration Number", "registrationNumber", formData.registrationNumber)}
                {renderEditableField("Tax ID", "taxId", formData.taxId)}

                <div className='mt-10'>
                    <label className="text-black">Address:</label>
                    <div>
                        {['street', 'city', 'state', 'zip', 'country'].map(field => (
                            <div key={field} className='flex items-center'>
                                <input
                                    name={field}
                                    value={formData.address[field]}
                                    onChange={handleAddressChange}
                                    disabled={!editableFields.address}
                                    className={`edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mt-2`}
                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                />
                            </div>
                        ))}
                        <button onClick={() => handleEdit('address')} className="bg-[#5f3abd] hover:bg-[#5f3abd] text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline edit-btn">
                            {editableFields.address ? 'Save' : 'Edit'}
                        </button>
                    </div>
                </div>

                {renderEditableField("Description", "description", formData.description)}
                {renderEditableField("Verification Status", "verificationStatus", formData.verificationStatus)}

                <button onClick={submitHandle} className="edit-inp w-auto bg-[#5f3abd] hover:bg-[#5f3abd] text-white font-medium py-3 px-6 rounded focus:outline-none focus:shadow-outline edit-btn mt-4">
                    Save Changes
                </button>
            </div>
            {/* Background Animations */}
            <div className=" inset-0 -z-10">
                <motion.div
                    className="line-animation absolute top-[400px] left-[30px] w-32 h-32 -z-10"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                >
                    <motion.svg
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <motion.path
                            d="M10 10 L 50 50 L 90 10"
                            fill="transparent"
                            stroke="#3b82f6"
                            strokeWidth="4"
                        />
                    </motion.svg>
                </motion.div>

                <motion.div
                    className="absolute bottom-[1000px] right-[250px] w-32 h-32 bg-blue-100 rounded-full -z-10"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                />

                <motion.div
                    className="absolute bottom-[50px] left-[10px] w-48 h-48 bg-purple-300 rounded-full -z-10" 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    transition={{ duration: 0.8 }}
                />

                <motion.div
                    className="absolute bottom-[700px] left-[250px] w-48 h-48 bg-purple-300 rounded-full -z-10"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    transition={{ duration: 0.8 }}
                />

                <motion.div
                    className="absolute bottom-[800px] left-[1500px] w-48 h-48 bg-purple-300 rounded-full -z-10"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    transition={{ duration: 0.8 }}
                />

                <motion.div
                    className="absolute bottom-[720px] right-[200px] w-32 h-32 bg-blue-100 rounded-full -z-10"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                />

                <motion.div
                    className="absolute bottom-[400px] right-[500px] w-32 h-32 bg-blue-100 rounded-full -z-10"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                />
            </div>
        </div>
    );
}

export default EditSponsorsDetails;
