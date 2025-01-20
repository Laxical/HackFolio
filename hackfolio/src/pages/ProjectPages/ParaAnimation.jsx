import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from "react-router-dom";


const AnimatedBanner = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full bg-gray py-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                {/* Left Pattern */}
                <div className="relative h-[300px] overflow-hidden">
                    <PatternSection />
                </div>

                {/* Middle Content */}
                <div className="flex items-center justify-center p-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                    >
                        <h2 className="text-2xl font-bold text-gray-800">Share what you built</h2>
                        <p className="text-gray-600">
                            Give your weekend projects, side projects, serious ventures a
                            place to breathe, invite collaborators and inspire others.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#5f3abd] text-white px-6 py-2 rounded-lg shadow-lg hover:bg-[#3f40bb] -600 transition-colors"
                            onClick={() => {
                                navigate("/projectForm");
                            }}
                        >
                            ADD A NEW SIDE PROJECT
                        </motion.button>
                    </motion.div>
                </div>

                {/* Right Pattern */}
                <div className="relative h-[300px] overflow-hidden">
                    <PatternSection isRight={true} />
                </div>
                
            </div>
        </div>
    );
};

const PatternSection = ({ isRight = false }) => {
    const items = [
        { type: 'laptop', delay: 0 },
        { type: 'phone', delay: 0.2 },
        { type: 'android', delay: 0.4 },
        { type: 'code', delay: 0.6 },
        { type: 'wrench', delay: 0.8 },
        { type: 'coffee', delay: 1 },
    ];

    return (
        <>
            {items.map((item, index) => (
                <motion.div
                    key={`${item.type}-${index}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: item.delay,
                        duration: 0.5,
                        type: 'spring',
                        stiffness: 100
                    }}
                    className={`absolute ${getRandomPosition(index, isRight)}`}
                >
                    <IconShape type={item.type} />
                </motion.div>
            ))}
            {[...Array(6)].map((_, index) => (
                <motion.div
                    key={`dot-${index}`}
                    className="absolute w-2 h-2 bg-purple-500 rounded-full"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -10, 0],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                    }}
                />
            ))}
        </>
    );
};

const IconShape = ({ type }) => {
    const getIcon = () => {
        switch (type) {
            case 'laptop':
                return (
                    <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2" />
                        <path d="M4 17h16M10 21h4" strokeWidth="2" />
                    </svg>
                );
            case 'phone':
                return (
                    <svg className="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="5" y="2" width="14" height="20" rx="2" strokeWidth="2" />
                        <path d="M12 18h.01" strokeWidth="2" />
                    </svg>
                );
            case 'android':
                return (
                    <svg className="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M5 16V8a7 7 0 0114 0v8M4 16h16M12 3a2 2 0 100 4 2 2 0 000-4z" strokeWidth="2" />
                    </svg>
                );
            case 'code':
                return (
                    <svg className="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeWidth="2" />
                    </svg>
                );
            case 'wrench':
                return (
                    <svg className="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeWidth="2" />
                    </svg>
                );
            case 'coffee':
                return (
                    <svg className="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" strokeWidth="2" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="transform"
        >
            {getIcon()}
        </motion.div>
    );
};

const getRandomPosition = (index, isRight) => {
    const positions = [
        'top-1/4 left-1/4',
        'top-1/2 left-1/3',
        'bottom-1/4 left-1/4',
        'top-1/3 right-1/4',
        'bottom-1/3 right-1/3',
        'bottom-1/2 right-1/4',
    ];

    if (isRight) {
        return positions[(index + 3) % positions.length];
    }
    return positions[index % positions.length];
};

export default AnimatedBanner;

