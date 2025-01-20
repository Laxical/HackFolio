import { useState } from 'react';
import HackathonRegistrationForm from "../../components/HackathonComponents/HackathonRegistrationForm";
import HackathonLinks from "../../components/HackathonComponents/HackathonLinks";
import HackathonTimelineDescription from "../../components/HackathonComponents/HackathonTimelineDescription";
import HackathonPrizesDescription from "../../components/HackathonComponents/HackathonPrizesDescription";
import Header from '../../components/Header';
import ReactingNavBar from '../../components/ReactingNavBar';
import HackathonTimingsDisplay from '../../components/HackathonComponents/HackathonTimingsDisplay';

import { useParams } from 'react-router-dom';

function HackathonRegistrationPage() {
    const [selection, setSelection] = useState(0);
    const { name } = useParams();


    return (
        <>
            <div className='flex '>
                <ReactingNavBar/>
                <div className='space-y-3 size-full'>
                    <Header></Header>
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
                            {selection === 0 && <HackathonRegistrationForm />}
                            {selection === 1 && <HackathonLinks />}
                            {selection === 2 && <HackathonTimelineDescription />}
                            {selection === 3 && <HackathonPrizesDescription />}
                        </div>
                        <div>
                        <HackathonTimingsDisplay id={name} flag={2} />

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default HackathonRegistrationPage