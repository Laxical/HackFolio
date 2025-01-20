import Header from "../../components/Header";
import EditHackathonProjectSubmissionDetails from "../../components/ProjectComponents/EditHackathonProjectSubmissionDetails";
import ReactingNavBar from "../../components/ReactingNavBar";

function EditHackathonProjectSubmission() {


    return (
        <><div className="flex">

            <ReactingNavBar />
            <div className="space-y-3 size-full">
                <Header />
                <EditHackathonProjectSubmissionDetails />
            </div>
        </div>
        </>
    );
}

export default EditHackathonProjectSubmission