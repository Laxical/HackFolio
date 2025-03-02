import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import HackathonLinks from "../../components/HackathonComponents/HackathonLinks";
import EditHackathonRegistrationForm from '../../components/HackathonComponents/EditHackathonRegistrationForm';
import HackathonTimelineDescription from "../../components/HackathonComponents/HackathonTimelineDescription";
import HackathonPrizesDescription from "../../components/HackathonComponents/HackathonPrizesDescription";
import TeamFormation from "../../components/HackathonComponents/TeamFormation";
import TeamDisplay from "../../components/HackathonComponents/TeamDisplay";
import Header from '../../components/Header';
import ReactingNavBar from '../../components/ReactingNavBar';
import HackathonTimingsDisplay from '../../components/HackathonComponents/HackathonTimingsDisplay';

function EditRegisteredHackathonDetails() {
    const [selection, setSelection] = useState(0);
    const [inTeam, setInTeam] = useState(false);
    const { name } = useParams();

    useEffect(() => {
        handle();
    }, [])

    async function handle() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/registerForHackathon/${name}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: 'include',
              });
            if (!response.ok) throw new Error('Network response was not ok');
            const arr = await response.json();
            if (!arr.data.teamCode) setInTeam(false);
            else setInTeam(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <>
            <div className='flex'>
                <ReactingNavBar />
                <div className='space-y-3 size-full'>
                    <Header></Header>
                    <div className=''>
                        <div className='flex justify-center items-center h-[150px] my-3 text-gray-500 text-xl'>
                            <div className='bg-white p-4 rounded-[10px] card-v'>
                                <div
                                    onClick={(e) => setSelection(0)}
                                    className={`cursor-pointer p-5 ${selection === 0 && 'text-[#5f3abd] border p-[19px]'} rounded-[10px] hover:bg-gray-200`}
                                >
                                    APPLICATION
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-center'>
                            <div className="w-[800px] bg-white rounded-[10px] flex justify-center p-8">
                                {selection === 0 && <EditHackathonRegistrationForm />}
                                {selection === 1 && <HackathonLinks />}
                                {selection === 2 && <HackathonTimelineDescription />}
                                {selection === 3 && <HackathonPrizesDescription />}
                            </div>
                            <div>
                            <HackathonTimingsDisplay className="fixed" id={name} flag={2}/>

                                <div className={`mt-[50px] ${(inTeam) ? "w-[400px]" : "w-[600px]"} bg-white ml-[50px] rounded-[10px] p-10`}>
                                    {
                                        (inTeam) ?
                                            <TeamDisplay func={handle} /> :
                                            <TeamFormation func={handle} />
                                    }
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </>
    );
}

export default EditRegisteredHackathonDetails