import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditHackathonRegistrationForm() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [data,setData] = useState(null);

    const [formData, setFormData] = useState({
        aliasname: '',
        firstname: '',
        lastname: '',
        email: '',
        phoneno: '',
        gender: '',
        githubprofile: '',
        linkednprofile: '',
        portfoliowebsite: '',
        skills: '',
    });

    const [editableFields, setEditableFields] = useState({
        aliasname: false,
        firstname: false,
        lastname: false,
        email: false,
        phoneno: false,
        gender: false,
        githubprofile: false,
        linkednprofile: false,
        portfoliowebsite: false,
        skills: false,
    });

    useEffect(() => {
        getInfo();
    },[])

    useEffect(() => {
        if(data)
            setFormData({
                aliasname: data.aliasname,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                phoneno: data.phoneno,
                gender: data.gender,
                githubprofile: data.githubprofile,
                linkednprofile: data.linkednprofile,
                portfoliowebsite: data.portfoliowebsite,
                skills: data.skills,
            });
    },[data])

    async function getInfo() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/registerForHackathon/${name}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: 'include',
              });
            if(response.status === 403) navigate('/Error403');
            if (!response.ok) throw new Error('Network response was not ok');
            const arr = await response.json();
            setData(arr.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function handleChange(e,name) {
        const temp = { ...formData };
        temp[name] = e.target.value;
        setFormData(temp);
    }

    function handleEdit(field) {
        setEditableFields(prev => ({ ...prev, [field]: !prev[field] }));
    }


    function inputComponent(label,name) {

        return(
            <>
                <label htmlFor="" className="mt-[20px] font-light">{label}</label>
                <div className="flex items-center">
                    <input type="text" disabled={!editableFields[name]} onChange={(e) => handleChange(e,name)} value={formData[name]} className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"/>
                    <button onClick={() => handleEdit(name)} className="bg-[#5f3abd] font-medium hover:bg-[#5f3abd] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 edit-btn mt-2">
                        {editableFields[name] ? 'Save' : 'Edit'}
                    </button>
                </div>
            </>
        );
    }

    async function handleSubmit() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/registerForHackathon/${name}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });
            if(response.status === 403) navigate('/Error403');
            if (!response.ok) throw new Error('Network response was not ok');
            console.log(await response.json())
            navigate(`/hackathon/${name}/editRegistrationDetails`);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return(
        <div className="w-full p-6 border rounded-[10px]">
            <div className="">
                <div className="text-4xl text-gray-500 mb-[40px]">Application Form :</div>
                {inputComponent("What should people call you:","aliasname")}
                {inputComponent("First Name:","firstname")}
                {inputComponent("Last Name:","lastname")}
                {inputComponent("Email: ","email")}
                {inputComponent("Phone No.:","phoneno")}
                {inputComponent("Gender:","gender")}
                {inputComponent("Github URL:","githubprofile")}
                {inputComponent("Linkedn URL:","linkednprofile")}
                {inputComponent("Portfolio Website URL:","portfoliowebsite")}
                {inputComponent("Skills:","skills")}
                <div className="mt-4">
                    <button
                        onClick={handleSubmit}
                        className="edit-inp w-auto bg-[#5f3abd] hover:bg-[#5f3abd] text-white font-medium py-3 px-6 rounded-[5px] focus:outline-none focus:shadow-outline edit-btn mt-4"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditHackathonRegistrationForm