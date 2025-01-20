import Header from "../../components/Header";
import HackathonProjectSubmissionForm from "../../components/ProjectComponents/HackathonProjectSubmissionForm";
import ReactingNavBar from "../../components/ReactingNavBar";


function HackathonProjectSubmission() {


    return(
        <>
        <div className="flex">
           
           <ReactingNavBar/>
           
           <div className="space-y-3 size-full">
            <Header />
            <div className="flex justify-center mt-[20px]">
                <HackathonProjectSubmissionForm />
            </div>
            </div>
            </div>
        </>
    );
}

export default HackathonProjectSubmission