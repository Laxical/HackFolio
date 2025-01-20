import { useState, useEffect, useRef } from "react";
import HackathonCreationForm from "../../components/HackathonComponents/HackathonCreationForm.jsx";
import HackathonRegisterWebpage from "../../components/HackathonComponents/HackathonRegisterWebpage.jsx";
import Header from "../../components/Header.jsx";
import ReactingNavBar from "../../components/ReactingNavBar";
import "../../styles/hack_org_form.css"

function CreateHackathon() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, []);

    function setTrue() {
        setIsOpen(true);
    }

    function setFalse() {
        setIsOpen(false);
    }

    return (
        <>
            <div className="flex ">
                <ReactingNavBar />
                <div className="space-y-3 size-full">
                    <Header />
                    <div>
                        <HackathonRegisterWebpage setTrue={setTrue} />
                        {
                            (isOpen) ? <HackathonCreationForm setFalse={setFalse} /> : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateHackathon