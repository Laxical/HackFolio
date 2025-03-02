import { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

function EditHackathonDetails(props) {
    const { name } = useParams();
    const [data, setData] = useState(null);
    const [hackName,setHackName] = useState("");
    const [formData, setFormData] = useState({
        uniName: '',
        eventMode: '',
        tech: '',
        teamSize: '',
        partProf: '',
        contactLinks: [],
        fromDate: '',
        toDate: '',
        prizesDesc: ''
    });
    const [editableFields, setEditableFields] = useState({
        uniName: false,
        eventMode: false,
        tech: false,
        teamSize: false,
        partProf: false,
        contactLinks: false,
        fromDate: false,
        toDate: false,
        prizesDesc: false,
    });
    const navigate = useNavigate();

    useEffect(() => {
        getHackInfo();
    }, []);

    async function getHackInfo() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/updateHackDetails/${name}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: 'include',
              });
            if(response.status === 403) navigate('/Error403');
            const arr = await response.json();
            setData(arr.data);
            setHackName(arr.data.hackathonName);
            setFormData({
                uniName: arr.data.uniName,
                eventMode: arr.data.eventMode,
                tech: arr.data.tech,
                teamSize: arr.data.teamSize,
                partProf: arr.data.participantsProfile,
                contactLinks: arr.data.contactLinks,
                fromDate: arr.data.fromDate,
                toDate: arr.data.toDate,
                prizesDesc: arr.data.prizesDesc
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function submitHandle() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/updateHackDetails/${name}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });
            if(response.status === 403) navigate('/Error403');
            console.log(await response.json())
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

    function renderEditableField(label, name, value) {
        return (
            <div className='mt-10'>
                <label htmlFor={name}>{label}: </label>
                <div className='flex items-center'>
                    <input
                        id={name}
                        name={name}
                        value={formData[name]}
                        disabled={!editableFields[name]}
                        onChange={handleChange}
                        className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <button onClick={() => handleEdit(name)} className="bg-[#5f3abd] font-medium hover:bg-[#5333a5] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 edit-btn">
                        {editableFields[name] ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>
        );
    }

    function removeLink(index) {
        const newArr = [...formData.contactLinks.slice(0, index), ...formData.contactLinks.slice(index + 1)];
        setFormData(prev => ({ ...prev, contactLinks: newArr }));
    }

    function addLink() {
        const newArr = [...formData.contactLinks, "www.google.com"];
        setFormData(prev => ({ ...prev, contactLinks: newArr }));
    }

    if (data === null) return <div>Loading...</div>;

    return (
        <div className="">
            <div className='text-3xl bold mb-4'>Edit Hackathon details:</div>
            <div className="">
                <div className='mb-3'>
                    <label htmlFor={hackName}>Hackathon Name: </label>
                    <input
                        id={hackName}
                        name={hackName}
                        value={hackName}
                        className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        disabled
                    />

                </div>
                {renderEditableField("University Name", "uniName", formData.uniName)}
                {renderEditableField("Event Mode", "eventMode", formData.eventMode)}
                {renderEditableField("Technologies", "tech", formData.tech)}
                {renderEditableField("Team Size", "teamSize", formData.teamSize)}
                {renderEditableField("Required Profiles", "partProf", formData.partProf)}
                
                <div className='mt-10'>
                    <label htmlFor="contactLinks">Contact Links: </label>
                    {formData.contactLinks.map((link, i) => (
                        <div key={i} className="flex items-center">
                            <input
                                value={link}
                                onChange={(e) => {
                                    const newLinks = [...formData.contactLinks];
                                    newLinks[i] = e.target.value;
                                    setFormData(prev => ({ ...prev, contactLinks: newLinks }));
                                }}
                                disabled={!editableFields.contactLinks}
                                className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                            />
                            <button onClick={() => removeLink(i)} className="remove-link-btn font-medium edit-btn mt-2 mr-0 ml-2">
                                Remove
                            </button>
                        </div>
                    ))}
                    <button onClick={addLink} className="add-link-btn font-medium edit-btn py-2 px-3">
                        Add
                    </button>
                    <button onClick={() => handleEdit('contactLinks')} className="bg-[#5f3abd] hover:bg-[#5f3abd] text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline edit-btn">
                        {editableFields.contactLinks ? 'Save' : 'Edit'}
                    </button>
                </div>

                {renderEditableField("From Date", "fromDate", formData.fromDate)}
                {renderEditableField("To Date", "toDate", formData.toDate)}
                {renderEditableField("Prizes Desc", "prizesDesc", formData.prizesDesc)}

                <button onClick={submitHandle} className="edit-inp w-auto bg-[#5f3abd] hover:bg-[#5f3abd] text-white font-medium py-3 px-6 rounded focus:outline-none focus:shadow-outline edit-btn mt-4">
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export default EditHackathonDetails;
