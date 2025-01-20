import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import "animate.css"; // Import Animate.css for animations

function HackathonsDisplayCard(props) {
    const navigate = useNavigate();

    async function handleClick() {
        navigate(`/hackathon/${props.data.hackathonName}`);
    }

    return (
        <motion.div
            className="hackathon-card flex flex-col justify-between p-6 bg-gray-100 rounded-lg shadow-lg animate__animated animate__fadeInDown"
            whileHover="hover"
            transition={{
                duration: 0.5,
                ease: "easeInOut",
            }}
            variants={{
                hover: {
                    scale: 1.05,
                },
            }}
        >
            <div className="flex justify-between items-center">
                {/* Hackathon Name */}
                <div className="hack-name font-semibold text-3xl text-gray-900">
                    {props.data.hackathonName.split('-').join(' ')}
                </div>

                {/* Contact Links */}
                <div className="flex space-x-3">
                    {props.data.contactLinks.map((ele, i) => (
                        <a
                            key={i}
                            href={"https://" + ele}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl text-indigo-600 hover:text-indigo-800"
                        >
                            &#128279;
                        </a>
                    ))}
                </div>
            </div>

            <div className="flex justify-between mt-4">
                <div>
                    <div className="font-bold text-gray-500">THEME</div>
                    <div className="hack-themes font-medium text-gray-700">
                        {props.data.tech}
                    </div>
                </div>
                <div className="font-bold text-gray-400">
                    
                </div>
            </div>

            <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-4">
                    <span className="hack-status font-medium text-gray-600">
                        {props.data.eventMode.toUpperCase()}
                    </span>
                    <span className="hack-status font-medium text-gray-600">
                        STARTS {props.data.fromDate}
                    </span>
                </div>

                {/* Apply Now Button */}
                <motion.button
                    className="w-36 text-xl bg-[#5f3abd] text-white py-2 rounded-md font-semibold hover:bg-[#5635aa] transition-colors"
                    onClick={handleClick}
                    whileHover={{ scale: 1.1 }}
                >
                    Apply Now
                </motion.button>
            </div>
        </motion.div>
    );
}

export default HackathonsDisplayCard;
