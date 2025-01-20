import { useEffect } from 'react';
import gsap from 'gsap';

function HackathonRegisterWebpage(props) {
    useEffect(() => {
        // GSAP Animation for Bottom Circles
        gsap.fromTo(
            '.circle',
            { opacity: 0, y: 50, rotation: 0 }, // Initial state (invisible, slightly offset, no rotation)
            {
                opacity: 1, // Fade in
                y: -120, // Move up
                rotation: 360, // Rotate in a full circle
                duration: 2, // Duration of animation
                stagger: 0.3, // Staggered delay for multiple circles
                repeat: -1, // Repeat infinitely
                yoyo: true, // Reverse animation on repeat
                ease: 'power1.out', // Ease out effect for smoothness
            }
        );

        // Random animations for additional circles
        gsap.to('.random-shape', {
            x: () => Math.random() * 200 - 100, // Move horizontally randomly
            y: () => Math.random() * 200 - 100, // Move vertically randomly
            opacity: () => Math.random(), // Random opacity
            scale: () => Math.random() * 2, // Random scale
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut', // Smooth easing
            stagger: 0.5, // Stagger effect
        });
    }, []);

    return (
        <>
            <div className="flex justify-center items-center min-h-screen pt-16 overflow-hidden relative">
                <div className="text-center z-10">
                    {/* Heading */}
                    <div className="font-bold text-4xl sm:text-5xl md:text-6xl mb-6 tracking-tight leading-tight">
                        Organize a Hackathon on <span className="text-[#5f3abd]">HackQuest</span>
                    </div>

                    {/* Description */}
                    <div className="w-4/12 mx-auto text-center mb-8 text-lg sm:text-xl text-gray-500">
                        Experience the excitement of organizing your own hackathon with HackQuest!
                        Manage applications, submissions, communications, reimbursements,
                        and judging alongside hundreds of other innovative events.
                    </div>

                    {/* Button */}
                    <button
                        onClick={props.setTrue}
                        className="bg-[#5f3abd] text-white py-4 px-10 rounded-xl text-lg sm:text-2xl font-semibold hover:bg-[#3f40bb] transition-all duration-300 shadow-lg hover:shadow-2xl mt-12"
                    >
                        Organize a Hackathon Now!
                    </button>
                </div>

                {/* Bottom Circles */}
                <div className="circle absolute bottom-10 left-20 w-20 h-20 bg-[#5f3abd] rounded-full opacity-0"></div>
                <div className="circle absolute bottom-20 right-40 w-16 h-16 bg-[#3f40bb] rounded-full opacity-0"></div>

                {/* Random Shapes */}
                <div className="random-shape absolute top-10 left-40 w-12 h-12 bg-[#3f3abb] rounded-full"></div>
                <div className="random-shape absolute top-30 right-20 w-14 h-14 bg-[#5f3acd] rounded-full"></div>
                <div className="random-shape absolute bottom-10 right-60 w-10 h-10 bg-[#4f2aad] rounded-full"></div>
            </div>
        </>
    );
}

export default HackathonRegisterWebpage;
