import { useRef } from "react";
import { useParams } from "react-router-dom";

function TeamFormation(props) {
    const inpCodeRef = useRef(null);
    const inpNameRef = useRef(null);
    const { name } = useParams();

    async function handleCreate() {
        const teamName = inpNameRef.current.value;
        if(name.length < 3) {
            alert("Name should have atleast 3 characters.");
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/hackathonTeam/${name}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({teamName}),
                credentials: 'include',
            });
            if(response.status === 403) navigate('/Error403');
            if(response.status === 400) {
                alert(response.msg);
            }
            else {
                const data = await response.json();
                console.log(data);
                props.func();
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    async function handleJoin() {
        const teamCode = inpCodeRef.current.value;
        if(teamCode.length !== 6) {
            console.log("Enter a valid Team Code!");
        }
        else {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/hackathonTeam/${name}/join`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ teamCode }),
                    credentials: 'include',
                });
                if(response.status === 403) navigate('/Error403');
                const data = await response.json();
                if(data.msg === "Team Full!") {
                    alert("Team Full!");
                }
                console.log(data);
                props.func();
            } catch (error) {
                console.error('Error posting data:', error);
            }
        }
    }

    return(
        <>
            <div className="flex justify-center items-center border rounded p-[30px]">
                <div className="">
                    <div className="text-4xl text-gray-700 mb-[20px]">Have some friends?</div>
                    <div className="flex justify-center">
                        <input 
                            type="text"
                            className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                            ref={inpNameRef}
                        />
                        <button 
                            className="bg-[#5f3abd] font-medium hover:bg-[#5f3abd] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 edit-btn mt-2 w-[200px]"
                            onClick={handleCreate}
                        >
                            Create a team
                        </button>
                    </div>
                    <div className="flex justify-center my-[50px] text-5xl font-medium text-gray-800">
                        {'- OR -'}
                    </div>
                    <div className="flex justify-center">
                        <input 
                            type="text"
                            className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                            ref={inpCodeRef}
                        />
                        <button 
                            className="bg-[#5f3abd] font-medium hover:bg-[#5f3abd] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 edit-btn mt-2"
                            onClick={handleJoin}
                        >
                            Join
                        </button>
                    </div>   
                </div>
            </div>
        </>
    );
}

export default TeamFormation