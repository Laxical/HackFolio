import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ChatSelectionWindow from "./ChatSelectionWindow";
import ChatOpenWindow from "./ChatOpenWindow";
const token = localStorage.getItem('data');
import { motion } from "framer-motion";

function ChatComponent(props) {
    const [socket, setSocket] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const token = localStorage.getItem('data');

    useEffect(() => {
        const newSocket = io("http://localhost:5000", {
            transports: ["websocket"],
            auth: { token },
            withCredentials: true
        });
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        newSocket.on('disconnect', async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/disconnect`, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    credentials: 'include',
                });
                if (!response.ok) throw new Error('Network response was not ok');
                await response.json();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        });

        return () => {
            newSocket.off('chatMessage');
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        const handleMessage = (msg) => {
            props.setFlag(prev => !prev);
            msgstatus();
            if (msg.to === JSON.parse(token).email && msg.from === props.currUser) {
                setNewMessage(msg);
            }
        };

        socket.on('chatMessage', handleMessage);

        return () => {
            socket.off('chatMessage', handleMessage);
        };
    }, [socket, props.currUser]);

    useEffect(() => {
        msgstatus();
    }, [socket, props.currUser]);

    async function msgstatus() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/changeReadStatus/${props.currUser}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Network response was not ok');
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex-none bg-[#5f3abd] text-white p-4">
                <h2 className="text-2xl font-bold">Chat</h2>
            </div>
            <div className="flex-1 flex overflow-hidden">
                <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
                    <ChatSelectionWindow setCurrUser={props.setCurrUser}/>
                </div>
                <div className="w-2/3 flex flex-col">
                    <ChatOpenWindow currUser={props.currUser} newMessage={newMessage} socket={socket}/>
                </div>
            </div>
                {/* Background Animations */}
                <div className="absolute inset-0 -z-10">
                    <motion.div
                        className="line-animation absolute top-[400px] left-[30px] w-32 h-32"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2 }}
                    >
                        <motion.svg
                            viewBox="0 0 100 100"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <motion.path
                                d="M10 10 L 50 50 L 90 10"
                                fill="transparent"
                                stroke="#3b82f6"
                                strokeWidth="4"
                            />
                        </motion.svg>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-[1000px] right-[250px] w-32 h-32 bg-blue-100 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    />

                    <motion.div
                        className="absolute bottom-[50px] left-[10px] w-48 h-48 bg-purple-300 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                    />

                    <motion.div
                        className="absolute bottom-[700px] left-[250px] w-48 h-48 bg-purple-300 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                    />

                    <motion.div
                        className="absolute bottom-[800px] left-[1500px] w-48 h-48 bg-purple-300 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                    />

                    <motion.div
                        className="absolute bottom-[720px] right-[200px] w-32 h-32 bg-blue-100 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    />

                    <motion.div
                        className="absolute bottom-[400px] right-[500px] w-32 h-32 bg-blue-100 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    />
                </div>
        </div>
    );
}

export default ChatComponent;


