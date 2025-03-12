import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Award, Clock } from "lucide-react"
import "../../styles/hack_info_card.css";

function HackathonTimingsDisplay(props) {
    const { name } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [isJudge, setIsJudge] = useState(false);
    const [registered,setRegistered] = useState(false);
    const [flag,setFlag] = useState(0);

    useEffect(() => {
        getInfo();
    }, []);

    useEffect(() => {
        checkIfJudge();
        getIfSubmitted();
        checkIfRegistered();
    },[data]);

    async function getIfSubmitted() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/project/hackathonProject/${name}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: 'include',
              });
            if(response.status === 403) navigate('/Error403');
            if(!response.ok) return;
            const arr = await response.json();
            if(arr.flag === true && flag<3) {
                setFlag(2);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function getInfo() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/getHackDetails/${name}`, {
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
            const currTime = new Date();
            const fromTime = new Date(arr.data.fromDate);
            const toTime = new Date(arr.data.toDate);
            if(currTime > toTime && flag < 10) setFlag(10);
            else if(currTime > fromTime && flag<2) setFlag(1);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function checkIfRegistered() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/checkRegistration/${name}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: 'include',
              });
            if(response.status === 403) navigate('/Error403');
            if (!response.ok) throw new Error('Network response was not ok');
            const data1 = await response.json();
            if(new Date(data.fromDate) < new Date() && !data1.flag && flag < 7) setFlag(7);
            setRegistered(data1.flag);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function checkIfJudge() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/judge/isjudge/${name}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: 'include',
              });
            if (response.ok) {
                setIsJudge(true);
            } else {
                setIsJudge(false);
            }
        } catch (error) {
            console.error('Error checking judge status:', error);
        }
    }

    async function handleClick() {
        if(flag === true) {
            navigate(`/hackathon/${name}/projectSubmission`);
        }
        else {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/hackathonTeam/${name}/create`, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    credentials: 'include',
                  });
                if(response.status === 403) navigate('/Error403');
                if (!response.ok) throw new Error('Network response was not ok');
                const arr = await response.json();
                if(flag === 0) {
                    if (arr.flag === true) {
                        navigate(`/hackathon/${name}/editRegistrationDetails`);
                    } else {
                        navigate(`/hackathon/${name}/register`);
                    }
                }
                else if(flag === 1) {
                    navigate(`/hackathon/${name}/projectSubmission`);
                }
                else if(flag === 2) {
                    console.log(name);
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/project/getProject/${name}`, {
                        method: "GET",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        credentials: 'include',
                      });
                    const data = await response.json();
                    navigate(`/editprojectdetails/${data.projectId}`);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }            
        }

    }

    if (data === null) return <div>Loading...</div>;

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
    }

    return (
        <div className="mt-14 hack-info-card flex flex-col justify-between" style={{ marginLeft: "30px" }}>
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Hackathon Timeline</h3>

                <div className="flex flex-col space-y-3 text-sm">
                    <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-center bg-purple-100 p-2 rounded-md">
                        <Calendar className="h-5 w-5 text-purple-700" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-medium">Start Date</p>
                        <p className="font-medium text-gray-800">{formatDate(data.fromDate)}</p>
                    </div>
                    </div>

                    <div className="flex justify-center">
                    <div className="h-6 w-px bg-gray-200"></div>
                    </div>

                    <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-center bg-purple-100 p-2 rounded-md">
                        <Clock className="h-5 w-5 text-purple-700" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-medium">End Date</p>
                        <p className="font-medium text-gray-800">{formatDate(data.toDate)}</p>
                    </div>
                    </div>
                </div>
            </div>

            {props.flag === 1 && <div>
                <div className='flex justify-center'>
                    <button 
                        className="w-11/12 text-xl bg-[#5f3abd] text-white py-4 rounded-md font-semibold hover:bg-[#4d2f97] transition-colors"
                        onClick={() => handleClick()}
                        disabled = { (flag===10 || flag===7) ? true : false }
                    >
                        {
                            (flag === 10) ? <>Hackathon Ended</> : (flag === 7) ? <>Registration Ended</> : (flag === 2) ? <>Edit project</> : (flag === 1) ? <>Submit project</> : (registered) ? <>Go to dashboard</> : <>Apply now</>
                        }
                    </button>
                </div>

                {isJudge && (
                    <div className='flex justify-center mt-4'>
                        <button 
                            className="w-11/12 text-xl bg-green-600 text-white py-4 rounded-md font-semibold hover:bg-green-700 transition-colors"
                            onClick={() => navigate(`/hackathon/${name}/judgeDashboard`)}
                        >
                            Judge Dashboard
                        </button>
                    </div>
                )}
            </div>}
        </div>
    );
}

export default HackathonTimingsDisplay;
