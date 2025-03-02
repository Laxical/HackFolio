import React, { useEffect, useState } from "react";

function NotificationsComponent(props) {
    const [data, setData] = useState([]);
    const [notis, setNotis] = useState({});

    useEffect(() => {
        getMessagesStatus();
    }, [props.currUser, props.flag]);

    useEffect(() => {
        let temp = {};
        if (data.length !== 0) {
            data.data.forEach((ele) => {
                if (ele.from !== props.currUser) {
                    const from = ele.from;
                    temp[from] = (temp[from] || 0) + 1;
                }
            });
        }
        setNotis(temp);
    }, [data, props.currUser]);

    async function getMessagesStatus() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/getReadStatus/${props.currUser}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Network response was not ok');
            setData(await response.json());
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    function NotificationBox({ from, count }) {
        return (
            <div 
                className="cursor-pointer bg-[#5f3abd] hover:bg-[#3f40bb] transition-all duration-300 mt-3 rounded-lg shadow-md transform hover:scale-105"
                onClick={() => props.setCurrUser(from)}
            >
                <div className="flex items-center p-4 text-white">
                    <div className="h-3 w-3 bg-white rounded-full mr-4 animate-pulse"></div>
                    <div className="flex-1">
                        <p className="font-semibold">{from}</p>
                        <p className="text-sm opacity-80">
                            {count} unread message{count > 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
            <div className="bg-[#5f3abd] text-white p-4">
                <h2 className="text-2xl font-bold">Notifications</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {Object.entries(notis).length === 0 ? (
                    <p className="text-center text-gray-500 mt-4">No new notifications</p>
                ) : (
                    Object.entries(notis).map(([from, count], i) => (
                        <NotificationBox key={i} from={from} count={count} />
                    ))
                )}
            </div>
        </div>
    );
}

export default NotificationsComponent;

