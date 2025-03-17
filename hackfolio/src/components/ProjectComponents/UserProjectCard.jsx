import React from "react";
import { Card, CardContent } from "@/components/ui/card"; // shadcn Card component

const ProjectCard = ({ project }) => {
  return (
    <Card className="p-6">
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo */}
          <img
            src={project.logoUrl} // Assuming the logo URL is part of the project data
            alt={`${project.projectName} logo`}
            className="w-12 h-12 rounded-full mr-4" // Adjusted size with rounded-full class for circular shape
          />
          <div>
            <h3 className="text-xl font-semibold text-violet-900">{project.projectName}</h3>
            <p className="text-muted-foreground mt-1">{project.tagline}</p>
          </div>
        </div>
        <span className="bg-gray-100 text-sm px-3 py-1 rounded-full font-medium text-gray-700">
          {project.teamName}
        </span>
      </CardContent>
      <CardContent className="mt-4 flex justify-between items-center text-gray-600">
        <div>
          <p className="text-sm">Views: <span className="font-medium">{project.views}</span></p>
          <p className="text-sm">Likes: <span className="font-medium">{project.likes}</span></p>
        </div>
      </CardContent>
      <CardContent className="mt-6 text-xs text-muted-foreground">
        Last updated: {new Date(project.createdAt).toLocaleDateString()}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
