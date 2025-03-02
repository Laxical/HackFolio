import { useEffect, useRef, useState } from "react";


function ChatSelectionWindow(props) {
    const [data,setData] = useState(null);
    const addInpRef = useRef(null);
    const msgsEndRef = useRef(null);

    useEffect(() => {
        getUsers();
    },[]);

    async function getUsers() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/getFriends`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setData(data.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function handleAdd(e) {
        e.preventDefault();
        const email = addInpRef.current.value;
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/addFriends`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
                credentials: 'include',
            });
            console.log(await response.json())
            if (!response.ok) throw new Error('Network response was not ok');
            setData(prev => ({
                ...prev,
                interactedEmails: [...prev.interactedEmails, email]
            }));
            addInpRef.current.value = "";
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    function SelectionCard(email,i) {

        return(
            <div className="flex justify-center items-center w-[95%] h-[70px] bg-white rounded cursor-pointer hover:bg-[#5f3abd] hover:text-white transition-all ease border-y" key={i} onClick={() => props.setCurrUser(email)}>
                {email}
            </div>
        );
    }

    return(
        <div>
            <form onSubmit={(e) => handleAdd(e)} className="flex justify-center items-center my-[10px]">
                <input type="text" className="p-2 rounded text-xl w-[220px] border" ref={addInpRef}/>
                <button className="text-4xl bg-[#5f3abd] px-3 py-1 rounded-[40px] m-[5px] hover:bg-[#5735ad] transition-all text-white" type="submit">+</button>
            </form>
            <div className="flex justify-center overflow-y-scroll">
                <div className="w-[95%]">
                    {
                        data && data.interactedEmails.map((email,i) => {
                            return SelectionCard(email,i)
                        })
                    }
                    <div ref={msgsEndRef} />
                </div>
            </div>
        </div>
    );
}

export default ChatSelectionWindow