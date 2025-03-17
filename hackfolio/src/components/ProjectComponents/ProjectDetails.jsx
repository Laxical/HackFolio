import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Link, ChevronLeft, ChevronRight } from "lucide-react";

const ProjectDetails = ({ project, error }) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  
  // State for image gallery
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasImages = project.imageUrls?.length > 0;

  // Format technologies as an array
  const techList = project.technologies?.split(',').map(tech => tech.trim()) || [];

  // Navigation for image gallery
  const nextImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === project.imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? project.imageUrls.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-8 bg-gray-50">
      {/* Project Header */}
      <div className="mb-6 bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Project Logo */}
          {project.logoUrl && (
            <img
              src={project.logoUrl}
              alt={`${project.projectName} logo`}
              className="h-16 w-16 rounded-lg object-cover"
            />
          )}
          
          {/* Project Name & Tagline */}
          <div className="flex-grow">
            <h1 className="text-2xl font-bold text-gray-800">{project.projectName}</h1>
            <p className="text-gray-600">{project.tagline}</p>
          </div>
          
          {/* Edit Button */}
          <Button
            onClick={() => navigate(`/editprojectdetails/${projectId}`)}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            Edit Project
          </Button>
        </div>
      </div>

      {/* Error Section */}
      {error && (
        <div className="mb-6 w-full bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg">
          <h2 className="font-semibold">Error</h2>
          <p>{error.message || "An unexpected error occurred. Please try again later."}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Problem Statement */}
          <Card className="shadow bg-white">
            <CardHeader className="border-b pb-3">
              <CardTitle>The Problem</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-gray-700">{project.problem}</p>
            </CardContent>
          </Card>

          {/* Challenges */}
          <Card className="shadow bg-white">
            <CardHeader className="border-b pb-3">
              <CardTitle>Challenges Faced</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-gray-700">{project.challenges}</p>
            </CardContent>
          </Card>
          
          {/* Technologies Used */}
          <Card className="shadow bg-white">
            <CardHeader className="border-b pb-3">
              <CardTitle>Technologies</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                {techList.length > 0 ? (
                  techList.map((tech, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">No technologies specified</span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Links Section */}
          <Card className="shadow bg-white">
            <CardHeader className="border-b pb-3">
              <CardTitle className="flex items-center gap-2">
                <Link size={18} className="text-gray-700" />
                Links
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {project.links ? (
                <a 
                  href={project.links} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <ExternalLink size={16} />
                  Project Link
                </a>
              ) : (
                <p className="text-gray-500">No links provided</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Video Demo */}
          <Card className="shadow bg-white">
            <CardHeader className="border-b pb-3">
              <CardTitle>Demo</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {project.videoDemo ? (
                <div className="relative pb-[56.25%] h-0">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded"
                    src={getEmbedUrl(project.videoDemo) || ""}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="project demo video"
                  ></iframe>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <p className="text-gray-600">No demo video available</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Project Gallery - Full-size Slideshow */}
          <Card className="shadow bg-white">
            <CardHeader className="border-b pb-3">
              <CardTitle>Project Gallery</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {hasImages ? (
                <div className="relative">
                  {/* Main image display */}
                  <div className="relative w-full overflow-hidden">
                    <img
                      src={project.imageUrls[currentImageIndex]}
                      alt={`Project image ${currentImageIndex + 1}`}
                      className="w-full object-contain"
                      style={{ height: "300px" }}
                    />
                  </div>
                  
                  {/* Navigation controls */}
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-2">
                    <button
                      onClick={prevImage}
                      className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  
                  {/* Image indicator/thumbnails */}
                  <div className="flex justify-center items-center gap-1 p-2 overflow-x-auto">
                    {project.imageUrls.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex ? "bg-blue-600 w-3 h-3" : "bg-gray-300"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg m-4">
                  <p className="text-gray-500">No images available</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Horizontal Thumbnail Gallery */}
          {hasImages && (
            <div className="bg-white shadow rounded-lg p-4">
              <div className="overflow-x-auto flex gap-2 pb-2">
                {project.imageUrls.map((imageUrl, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 ${
                      index === currentImageIndex 
                        ? "ring-2 ring-blue-500" 
                        : "hover:opacity-80"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={imageUrl}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-16 w-16 object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function for video embed URL conversion
const getEmbedUrl = (link) => {
  if (!link) return null;
  if (link.includes("youtu.be")) {
    return link.replace("youtu.be/", "www.youtube.com/embed/");
  }
  if (link.includes("watch?v=")) {
    return link.replace("watch?v=", "embed/");
  }
  return null;
};

export default ProjectDetails;