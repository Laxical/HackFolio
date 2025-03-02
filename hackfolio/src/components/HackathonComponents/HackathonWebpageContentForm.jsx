import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ResizableTextArea from './ResizableTextArea';
import axios from "axios";
import LoadingPage from '../loading';
import { motion } from 'framer-motion';

function HackathonWebpageContentForm(props) {
    const aboutRef = useRef(null);
    const prizeRef = useRef(null);
    const imgInpRef = useRef(null);
    const imgRef = useRef(null);
    const [otherFields, setOtherFields] = useState([]);
    const navigate = useNavigate();
    const { name } = useParams();
    const [file, setFile] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const inputElement = imgInpRef.current;

        const handleImageChange = async (e) => {
            const file = e.target.files[0];
            setFile(file);
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imgRef.current.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        };

        inputElement.addEventListener('change', handleImageChange);

        return () => {
            inputElement.removeEventListener('change', handleImageChange);
        };
    }, []);

    const handleImageUpload = async (file) => {
        const uploadPreset = 'hackathonform';
        const cloudName = 'dgjqg72wo';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: false,
            });
            return response.data.secure_url;
        } catch (error) {
            console.error('Error uploading file:', error.response ? error.response.data : error.message);
            return null;
        }
    };

    async function handleSubmit(e) {
        const aboutHack = aboutRef.current.value;
        const aboutPrize = prizeRef.current.value;

        try {
            setLoading(true);
            let imageUrl;
            if (file !== "") imageUrl = await handleImageUpload(file);
            else imageUrl = "a"
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/hackathonCreate/${name}/2`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    imageUrl,
                    aboutHack,
                    aboutPrize,
                    otherFields,
                }),
                credentials: 'include',
            });
            if (response.status === 403) navigate('/Error403');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setLoading(false);
            navigate(`/organizedHackathons/${name}`);

        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    function addField() {
        setOtherFields([...otherFields, { key: '', value: '' }]);
    }

    function removeField(ind) {
        const newArr = [...otherFields.slice(0, ind), ...otherFields.slice(ind + 1)];
        setOtherFields(newArr);
    }

    function handleFieldChange(index, fieldType, value) {
        const updatedFields = otherFields.map((field, i) =>
            i === index ? { ...field, [fieldType]: value } : field
        );
        setOtherFields(updatedFields);
    }

    function handleTextChange(e, textRef) {
        textRef.current.style.height = "0px";
        const scrollHeight = textRef.current.scrollHeight;
        textRef.current.style.height = scrollHeight + "px";
    }

    if (loading) {
        return (
            <LoadingPage />
        );
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }} className='relative'>
            <div style={{ marginTop: "30px" }}>
                <div className="flex">
                    <div>
                        <div style={{ padding: "30px", paddingTop: "0px", border: "solid 2px rgb(220, 220, 220)", borderRadius: "20px" }}>
                            <div className="hackathon-poster">
                                <img className="h-full w-full" ref={imgRef} style={{ borderRadius: "20px" }} />
                            </div>

                            <input type="file" id="img" name="img" accept="image/*" style={{ marginTop: "20px" }} ref={imgInpRef} />

                            <div className="about-hack" style={{ marginTop: "20px" }}>
                                <div className='text-4xl font-medium mb-5'>About Hackathon</div>
                                <div className='flex justify-center'>
                                    <textarea
                                        type="text"
                                        className="min-h-[150px] w-11/12 resize-y border rounded-md p-2 overflow-y-hidden"
                                        placeholder="Enter about the hackathon"
                                        ref={aboutRef}
                                        onChange={(e) => handleTextChange(e, aboutRef)}
                                    />
                                </div>
                            </div>

                            <div className="about-hack" style={{ marginTop: "20px" }}>
                                <div className='text-4xl font-medium mb-5'>About Prizes</div>
                                <div className='flex justify-center'>
                                    <textarea
                                        type="text"
                                        className="min-h-[150px] w-11/12 resize-y border rounded-md p-2 overflow-y-hidden"
                                        placeholder="Enter about prizes"
                                        ref={prizeRef}
                                        onChange={(e) => handleTextChange(e, prizeRef)}
                                    />
                                </div>
                            </div>

                            {otherFields.map((field, i) => (
                                <div key={i} className="about-hack" style={{ marginTop: "20px" }}>
                                    <div>
                                        <input
                                            type="text"
                                            className="h-[25%] w-11/12 mb-3 font-medium text-2xl border rounded-md p-2"
                                            placeholder="Enter field name"
                                            value={field.key}
                                            onChange={(e) => handleFieldChange(i, 'key', e.target.value)}
                                        />
                                        <ResizableTextArea
                                            className="h-[75%] w-11/12 resize-y border rounded-md p-2"
                                            placeholder="Enter field value"
                                            val={field.value}
                                            otherFields={otherFields}
                                            setOtherFields={setOtherFields}
                                            ind={i}
                                        />
                                        <div className='flex justify-end'>
                                            <button className='remove-link-btn1 edit-btn mt-2 mr-0 ml-2' onClick={() => removeField(i)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button onClick={addField} className="add-link-btn edit-btn py-2 px-3 mt-[20px]">
                                Add more fields
                            </button>
                        </div>

                        <div className="flex">
                            <button
                                className="px-6 py-3 bg-indigo-600 text-2xl hover:bg-indigo-700 text-white font-bold rounded my-5"
                                style={{ borderRadius: "10px" }}
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    <div>
                        <div className="hack-info-card flex flex-col justify-between" style={{ marginLeft: "30px" }}>
                            <div>
                                From: To:
                            </div>

                            <div className="flex justify-center">
                                <button
                                    className="w-11/12 text-xl bg-gray-400 text-white py-4 rounded-md font-semibold cursor-default"
                                >
                                    Apply now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background Animations */}
                <div className=" inset-0 -z-10">
                    <motion.div
                        className="line-animation absolute top-[400px] left-[30px] w-32 h-32 -z-10"
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
                        className="line-animation absolute top-[800px] left-[1200px] w-32 h-32 -z-10"
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
                        className="line-animation absolute top-[200px] left-[1500px] w-32 h-32 -z-10"
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

                    {/* <motion.div
                        className="absolute bottom-[1000px] right-[250px] w-32 h-32 bg-blue-100 rounded-full -z-10"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    /> */}
{/* 
                    <motion.div
                        className="absolute bottom-[50px] left-[10px] w-48 h-48 bg-purple-300 rounded-full -z-10"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                    /> */}

                    {/* <motion.div
                        className="absolute bottom-[700px] left-[250px] w-48 h-48 bg-purple-300 rounded-full -z-10"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                    /> */}

                    {/* <motion.div
                        className="absolute bottom-[800px] left-[1500px] w-48 h-48 bg-purple-300 rounded-full -z-10"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                    /> */}
{/* 
                    <motion.div
                        className="absolute bottom-[720px] right-[200px] w-32 h-32 bg-blue-100 rounded-full -z-10"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    /> */}

                    {/* <motion.div
                        className="absolute bottom-[400px] right-[500px] w-32 h-32 bg-blue-100 rounded-full -z-10"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    /> */}
                </div>
            </div>
        </div>
    );
}

export default HackathonWebpageContentForm;
