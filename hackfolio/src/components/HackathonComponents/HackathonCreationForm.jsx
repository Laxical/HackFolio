import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function HackathonCreationForm(props) {
    const [hackName, setHackName] = useState("");
    const [uniName, setUniName] = useState("");
    const navigate = useNavigate();
    

    async function handleClick() {
        if(hackName.length < 3 || hackName.length > 20) {
            alert('length of Hackathon Name should be between 3 to 20 characters!');
            return;
        }
        if(uniName.length < 3 || uniName.length > 20) {
            alert('length of University Name should be between 3 to 20 characters!');
            return;
        }
        try {
            console.log(import.meta.env.VITE_BACKEND_URL);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/hackathonCreate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ hackName, uniName }),
            });

            if(response.status === 403) navigate('/Error403');

            if(response.status === 201) {
                alert('Hackathon name already taken!');
                return;
            }
    
            const data = await response.json();
            const name = data.HackathonName;
            navigate(`/completeHackathonCreation/${hackName}`);
    
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    function changeName(e) {
        const updatedName = e.target.value.split(' ').join('-');
        setHackName(updatedName);
    }
    

    return (
        <>
            <div className="hack-form">
                <div className="form-container w-full max-w-md p-6 rounded-lg shadow-lg bg-white">
                    <div className="flex justify-between items-center mb-4">
                        <div className="font-semibold text-3xl text-gray-950/80">Let’s get you started!</div>
                        <button 
                            onClick={props.setFalse} 
                            className="text-black text-2xl font-bold transition-transform duration-300 transform"
                        >
                            &#10005;
                        </button>
                    </div>
                    <div className="">
                        <label htmlFor="hackName" className="block text-gray-500 font-medium text-sm mt-4">NAME</label>
                        <input 
                            name="hackName" 
                            className="block w-full mt-2 rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            type="text"
                            placeholder="Hackathon Name" 
                            onChange={(e) => changeName(e)} 
                        />
                        <label htmlFor="uniName" className="block text-gray-500 font-medium text-sm mt-4">UNIVERSITY YOU'RE REPRESENTING?</label>
                        <input 
                            name="uniName" 
                            className="block w-full mt-2 mb-8 rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            type="text" 
                            placeholder="..." 
                            onChange={(e) => setUniName(e.target.value)} 
                        />
                        <button 
                            className="w-full bg-[#5f3abd] text-white py-2 rounded-md font-semibold hover:bg-[#5534a8] transition-colors"
                            onClick={handleClick}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HackathonCreationForm;
