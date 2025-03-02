import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../../styles/hack_detailed_info.css";
import HackathonProjectDispay from "./Hackathon_projects";

function HackathonDetailsDisplay() {
    const { name } = useParams();
    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState('details'); // Default to details
    const [formData, setFormData] = useState({
        imageUrl: '',
        aboutHack: '',
        aboutPrize: '',
        otherFields: [],
    });

    useEffect(() => {
        getWebInfo();
    }, []);

    async function getWebInfo() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/getHackWebsite/${name}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: 'include',
              });
            if(response.status === 403) navigate('/Error403');
            if (!response.ok) throw new Error('Network response was not ok');
            const arr = await response.json();
            setData(arr.data);
            setFormData({
                imageUrl: arr.data.imageUrl,
                aboutHack: arr.data.aboutHack,
                aboutPrize: arr.data.aboutPrize,
                otherFields: arr.data.otherFields,
            });
            console.log(arr.data.imageUrl);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div>
            {/* Tab Navigation */}
            <div className="flex mb-4">
                <button 
                    className={`px-4 py-2 mr-2 ${activeTab === 'details' ? 'bg-[#5f3abd] text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('details')}
                >
                    Details
                </button>
                <button 
                    className={`px-4 py-2 ${activeTab === 'projects' ? 'bg-[#5f3abd] text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('projects')}
                >
                    Submitted Projects
                </button>
            </div>

            {/* Conditional Rendering Based on Active Tab */}
            {activeTab === 'details' && (
                <div style={{ padding: "30px", paddingTop: "0px", border: "solid 2px rgb(220, 220, 220)", borderRadius: "20px" }}>
                    <img 
                        src={formData.imageUrl} 
                        alt="Hackathon Poster" 
                        className="hackathon-poster"
                    />
                    
                    <div className="about-hack" style={{ marginTop: "20px" }}>
                        <div className='text-4xl font-medium mb-5'>About Hackathon</div>
                        <div style={{
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word',
                            whiteSpace: 'pre-wrap'
                        }}>
                            {formData.aboutHack}
                        </div>
                    </div>

                    <div className="about-hack" style={{ marginTop: "20px" }}>
                        <div className='text-4xl font-medium mb-5'>About Prizes</div>
                        <div style={{
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word',
                            whiteSpace: 'pre-wrap'
                        }}>
                            {formData.aboutPrize}
                        </div>
                    </div>

                    {formData.otherFields && formData.otherFields.map((field, i) => (
                        <div key={i} className="about-hack" style={{ marginTop: "20px" }}>
                            <div className='text-4xl font-medium mb-5'>{field.key}</div>
                            <div style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                whiteSpace: 'pre-wrap'
                            }}>
                                {field.value}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'projects' && (
                <HackathonProjectDispay/>
            )}
        </div>
    );
}

export default HackathonDetailsDisplay;