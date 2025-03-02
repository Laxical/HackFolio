import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import HackathonDetailsForm from "../../components/HackathonComponents/HackathonDetailsForm";
import HackathonWebpageContentForm from "../../components/HackathonComponents/HackathonWebpageContentForm";
import Header from "../../components/Header";
import ReactingNavBar from "../../components/ReactingNavBar";

function FillFullHackathonDetails() {
    const [completed, setCompleted] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { name } = useParams();

    useEffect(() => {
        getCompletionStatus();
    }, []);

    async function getCompletionStatus() {
        let arr = [];
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/hackathonCreate/${name}/1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            arr = await response.json();

        } catch (error) {
            console.error('Error posting data:', error);
        }
        setCompleted(arr.step);
        setIsLoading(false);
    }

    return (
        <>
            <div className="flex">
                <ReactingNavBar />
                <div className="space-y-3 size-full">
                    <Header />
                    {isLoading && <div>Loading....</div>}
                    {completed === 0 && !isLoading &&
                        <div className="flex items-center justify-center min-h-screen">
                            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
                                <div className="text-center mb-8">
                                    <h1 className="text-4xl font-bold text-gray-800">
                                        You're Almost There: Just 2 Steps to Launch Your Hackathon!
                                    </h1>
                                </div>
                                <div className="space-y-8">
                                    <HackathonDetailsForm completed={completed} setCompleted={setCompleted} />
                                    {/* {completed === 2 && <Org_form4 completed={completed} setCompleted={setCompleted} />} */}
                                </div>
                                {/* <div className="mt-8">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${(completed / 2) * 100}%` }}
                            ></div>
                        </div>
                        <div className="text-center text-gray-500 mt-2">
                            Step {completed + 1} of 3
                        </div>
                    </div> */}
                            </div>
                        </div>
                    }
                    {completed === 1 && !isLoading && <HackathonWebpageContentForm completed={completed} setCompleted={setCompleted} />}
                </div>
            </div>


        </>
    );
}

export default FillFullHackathonDetails;
