import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

function HackathonRegistrationForm() {
    const { name } = useParams();
    const navigate = useNavigate();
    const urlRegex = /\b((http[s]?|ftp):\/\/)?[^\s(["<,>]*\.[^\s[",><]{2,}(\/[^\s[",><]*)?\b/gi;

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

    function handleChange(e,name) {
        const temp = { ...formData };
        temp[name] = e.target.value;
        setFormData(temp);
    }


    function inputComponent(label,name) {

        return(
            <>
                <label htmlFor="" className="mt-[20px] font-light">{label}</label>
                <input type="text" onChange={(e) => handleChange(e,name)} value={formData[name]} className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"/>
            </>
        );
    }

    async function handleSubmit() {
        try {
            if(!(formData.githubprofile.match(urlRegex) && formData.linkednprofile.match(urlRegex) && formData.portfoliowebsite.match(urlRegex))){
                alert('Enter valid URLs!');
                return;
            }
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/registerForHackathon/${name}`, {
                method: 'POST',
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

export default HackathonRegistrationForm