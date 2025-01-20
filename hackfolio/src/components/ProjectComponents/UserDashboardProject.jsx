import React from "react";
const UserDashBoardProject=(project)=>{
   
    return(
        
        <div>
        <h3 className="text-blue-600 text-xl font-semibold">{project.project.projectName}</h3>
        <p className="text-gray-600">
         {project.project.tagline}
        </p>
        <p className="text-gray-500">{project.project.technologies}</p>
      </div>
        
    )
}
export default UserDashBoardProject;
