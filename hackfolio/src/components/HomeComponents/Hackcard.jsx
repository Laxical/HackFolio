import { useNavigate } from "react-router-dom";

function HackathonsDisplayCard(props) {
    const navigate = useNavigate();

    async function handleClick() {
        navigate(`/hackathon/${props.data.hackathonName}`);
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 p-10">
            <div className="bg-white hover:shadow-[#4c1d95] hover:shadow-md rounded-lg bg-[#f5f3ff] text-white border-[#0f172a] min-w-[300px]">

                <div className="p-1 rounded-t-lg bg-[#4b5563]"></div>
                <div className="flex flex-col rounded p-5 lg:p-8">
                    <h3 className="text-3xl text-black font-bold">
                        {props.data.hackathonName.split('-').join(' ')}
                    </h3>
                    <p className="py-1 text-sm text-gray-900">
                        Theme: <span className="font-medium">{props.data.tech}</span>
                    </p>
                    <p className="py-1 text-sm text-gray-600">
                        Mode: <span className="font-medium">{props.data.eventMode.toUpperCase()}</span>
                    </p>
                    <p className="py-1 text-sm text-gray-900">
                        Starts: <span className="font-medium">{props.data.fromDate}</span>
                    </p>
                    <div className="pt-3 flex flex-col gap-2">
                        <button
                            className="w-full bg-[#38bdf8] text-white font-medium text-center py-2 mt-3 rounded-md hover:bg-sky-500 transition-colors"
                            onClick={handleClick}
                        >
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HackathonsDisplayCard;
