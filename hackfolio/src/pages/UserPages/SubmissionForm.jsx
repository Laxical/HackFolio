import React from "react";
import ProjectForm from "../../components/ProjectComponents/ProjectForm";
import Header from "../../components/Header";
import SponsorForm from "../../components/SponsorComponents/SponsorForm"; // fixed spelling here
import ReactingNavBar from "../../components/ReactingNavBar";

const SubmissionForm = ({ formName }) => {
  return (
    <>
    <div className="flex">

<ReactingNavBar />

<div className="space-y-3 size-full">
      <Header />
      {formName === "projectForm" ? (
        <ProjectForm />
      ) : formName === "sponsorForm" ? ( // fixed spelling and logic here
        <SponsorForm />
      ) : null}
      </div>
      </div>
    </>
  );
};

export default SubmissionForm;
