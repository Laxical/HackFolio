const express = require("express");
const Project = require("../models/projectForm_Schema");
const teamCodeSchema = require('../models/team_code_schema');
const hackParticipantDetails = require('../models/hackathon_participants_schema');
const isUser = require("../middleware/isUser");

const router = express.Router();
router.post('/submitproject',isUser, async (req, res) => {
 
  try {
   
    const username = req.username;

    const project = new Project({ ...req.body, username });

    await project.save();

    res.status(201).json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
   
    console.error('Error creating project:', error);
    res.status(400).json({
      message: 'Error creating project',
      error: error.message,
    });
  }
});

router.get("/userprojects", isUser, async (req, res) => {
  try {
    let username = req.username;

    const projects = await Project.find({ username: username });
    
    if (projects.length === 0) {
      return res.status(404).json({
        message: "No projects found",
      });
    }

    res.status(200).json(projects);
  } catch (error) {
 
    console.error("Error fetching project details:", error);
    res.status(500).json({
      message: "Error fetching project details",
      error: error.message,
    });
  }
});


router.get("/userprojects/:username", async (req, res) => {
  try {
    let username = req.params.username;

    const projects = await Project.find({ username: username });
    
    if (projects.length === 0) {
      return res.status(404).json({
        message: "No projects found",
      });
    }

    res.status(200).json(projects);
  } catch (error) {
  
    console.error("Error fetching project details:", error);
    res.status(500).json({
      message: "Error fetching project details",
      error: error.message,
    });
  }
});
router.get("/hackathonprojects/:hackathonname", async (req, res) => {
  try {
    let hackathonname = req.params.hackathonname;  // Correctly accessing the parameter
    const projects = await Project.find({ hackathonName: hackathonname });
    if (projects.length === 0) {
      return res.status(404).json({
        message: "No projects found",
      });
    }

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching project details:", error);
    res.status(500).json({
      message: "Error fetching project details",
      error: error.message,
    });
  }
});

router
  .get("/:id", async (req, res) => {
    try {
      let projectId = req.params.id;

      const projects = await Project.findOne({ _id: projectId });
      if (projects.length === 0) {
        return res.status(404).json({
          message: "No projects found",
        });
      }

      res.status(200).json(projects);
    } catch (error) {
      // Handle errors during retrieval
      console.error("Error fetching project details:", error);
      res.status(500).json({
        message: "Error fetching project details",
        error: error.message,
      });
    }
  })
  .put("/:id", isUser, async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const username = req.username;
    const email = req.email;
    let flag = 0;

    try {
      const projDetails = await Project.findOne({_id: id});
      if(projDetails.username === username) flag = 1;
      if(projDetails.teamCode !== '') {
        const team = await teamCodeSchema.findOne({teamCode: projDetails.teamCode, hackathonName: projDetails.hackathonName});
        for(let i=0;i<team.members.length;i++) {
          if(team.members[i] === email) {
            flag = 1;
            break;
          }
        }
      }
      console.log(flag);
      if(flag === 0) {
        res.status(400).json({ Error: "User not authorized to Edit project!" });
      }

      const updatedProject = await Project.findByIdAndUpdate(
          id,
          { ...data },
      );

      if (!updatedProject) {
          return res.status(404).json({ message: "Project not found" });
      }

      res.status(200).json(updatedProject);
    } catch (e) {
      res.status(400).json({ Error: e.message });
    }
  })

router.get("/hackathonprojects/:id", isUser, async (req, res) => {
  try {
    let userId = req.userId;

    const projects = await Project.find({ userId: userId });
    if (projects.length === 0) {
      return res.status(404).json({
        message: "No projects found",
      });
    }

    res.status(200).json(projects);
  } catch (error) {
    // Handle errors during retrieval
    console.error("Error fetching project details:", error);
    res.status(500).json({
      message: "Error fetching project details",
      error: error.message,
    });
  }
});

router.get("/getProject", isUser, async (req, res) => {

});


router.get("/getProject/:name", isUser, async (req, res) => {
  const email = req.email;
  const {name} = req.params;
  try {
    const teamCode = await hackParticipantDetails.findOne(
      { hackathonName: name, email: email },
      { teamCode: 1}
    );
    const projectId = await Project.findOne({hackathonName: name, teamCode: teamCode.teamCode},{_id: 1});
    return res.status(200).json({projectId: projectId._id});
  } catch(e) {
    return res.status(400).json({ Error: e.message });
  }
});

module.exports = router;
