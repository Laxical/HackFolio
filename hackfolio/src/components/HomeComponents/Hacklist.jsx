import { useState, useEffect } from "react";
import HackathonsDisplayCard from "../../components/HomeComponents/Hackcard";
import LoadingPage from "../loading";

function HackList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchHackathons() {
            try {
                // Fetch only 3 hackathons
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon?page=1&limit=3`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const result = await response.json();
                setData(result.hackathons || []);
            } catch (error) {
                console.error("Error fetching hackathon data:", error);
            }
        }

        fetchHackathons();
    }, []);

    if (data.length === 0) {
        return (
          <LoadingPage/>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-10 p-10">
            {data.map((element, i) => (
                <HackathonsDisplayCard key={i} data={element} />
            ))}
        </div>
    );
}

export default HackList;
