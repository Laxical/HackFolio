const express = require('express');
const hack_register = express.Router();
const hackParticipantDetails = require('../models/hackathon_participants_schema');
const teamCodeSchema = require('../models/team_code_schema');
const isUser = require('../middleware/isUser');
const hackFullDetails = require('../models/hackathon_full_details');

hack_register.route('/registerForHackathon/:name')
    .get(isUser,async(req, res) => {
        try {
            const { name } = req.params;
            const email = req.email;

            const data = await hackParticipantDetails.findOne({hackathonName: name, email: email});
            return res.status(200).json({data: data});
        } catch (error) {
            return res.status(400).json({ Error: "Error saving data to Database!" });
        }
    })
    .post(isUser, async(req, res) => {
        const { name } = req.params;
        const formData = req.body;
        const email = req.email;
        try{
            const flag = await hackParticipantDetails.find({hackathonName: name, email: email});
            if(flag.length === 0) {
                const newHackParticipantDetails = new hackParticipantDetails({
                    hackathonName: name,
                    email: email,
                    aliasname: formData.aliasname,
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    phoneno: formData.phoneno,
                    gender: formData.gender,
                    githubprofile: formData.githubprofile,
                    linkednprofile: formData.linkednprofile,
                    portfoliowebsite: formData.portfoliowebsite,
                    skills: formData.skills,
                    reviewed: false,
                });
                await newHackParticipantDetails.save();
                return res.status(200).json({ msg: "Registered" });
            }
            else {
                return res.status(200).json({ Error: "Already Registered" });
            }
        } catch(e) {
            return res.status(400).json({ Error: "Error saving data to Database!" });
        }

    })
    .put(isUser,async(req,res) => {
        const { name } = req.params;
        const formData = req.body;
        const email = req.email;
        try {
            const flag = await hackParticipantDetails.find({hackathonName: name, email: email});
            if(flag.length !== 0) {
                await hackParticipantDetails.findOneAndUpdate({hackathonName:name, email: email},{
                    hackathonName: name,
                    email: email,
                    aliasname: formData.aliasname,
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    phoneno: formData.phoneno,
                    gender: formData.gender,
                    githubprofile: formData.githubprofile,
                    linkednprofile: formData.linkednprofile,
                    portfoliowebsite: formData.portfoliowebsite,
                    skills: formData.skills,
                    reviewed: false,
                });
                return res.status(200).json({ msg: "Registered" });
            }
            else {
                return res.status(200).json({ Error: "Registration doesn't exist!" });
            }
        } catch (e) {
            return res.status(400).json({ Error: "Error saving data to Database!" });
        }
    })

hack_register.route('/hackathonTeam/:name/create')
    .get(isUser,async(req,res) => {
        const {name} = req.params;
        const email = req.email
        const data = await hackParticipantDetails.findOne({hackathonName: name, email: email});
        return res.status(200).json({flag: (data) ? true : false});
    })
    .post(isUser,async(req,res) => {
        const email = req.email;
        const { name } = req.params;
        const {teamName} = req.body;

        let code;
        function randGen(len) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            code = '';
            for (let i = 0; i < len; i++) {
                code += characters.charAt(Math.floor(Math.random() * characters.length));
            }
        }

        try {
            const flag = await teamCodeSchema.findOne({hackathonName: name,teamName: teamName});
            if(flag) {
                return res.status(400).json({msg: "Name already exists!"});
            }

            const data = await hackParticipantDetails.findOne({hackathonName: name, email: email});
            if(!data || data.teamCode !== "") {
                return res.status(400).json({msg: "User not registered for Hackathon or user already in a team"});
            }

            while(true){
                randGen(6);
                const data1 = await teamCodeSchema.findOne({hackathonName: name,teamCode: code});
                if(!data1) break;
            }

            const newTeamCodeData = new teamCodeSchema({
                hackathonName: name,
                teamName: teamName,
                teamCode: code,
                members: [{
                    email: email,
                    role: "lead"
                }]
            });
            await newTeamCodeData.save();
            await hackParticipantDetails.findOneAndUpdate({hackathonName: name, email: email},{teamCode: code,teamName: teamName});                

            return res.status(200).json({msg: "success"});
        } catch (e) {
            return res.status(400).json({ Error: "Error saving data to Database!" });
        }
    });

hack_register.route('/hackathonTeam/:name/join')
    .get(isUser,async(req,res) => {
        const email = req.email;
        const { name } = req.params;

        try {
            const details = await hackParticipantDetails.findOne({hackathonName: name, email: email});
            if(!details.teamCode) return res.status(400).json({error: "Not in a team!"});
            const data = await teamCodeSchema.findOne({hackathonName: name, teamCode: details.teamCode});
            return res.status(200).json({data: data});
        } catch (e) {
            return res.status(400).json({ Error: "Error contacting Database!" });
        }
    })
    .post(isUser,async(req,res) => {
        const email = req.email;
        const { name } = req.params;
        const { teamCode } = req.body;

        try {
            const data = await hackParticipantDetails.findOne({hackathonName: name, email: email});
            if(!data || data.teamCode !== "") {
                return res.status(200).json({msg: "User not registered for Hackathon or user already in a team"});
            }
            const hackDetails = await hackFullDetails.findOne({ hackathonName: name });
            const team = await teamCodeSchema.findOne({hackathonName: name, teamCode: teamCode});
            if(!team) {
                return res.status(400).json({msg: "Team code not found!"});
            }
            if(team.members.length >= Number(hackDetails.teamSize)) {
                return res.status(400).json({msg: "Team Full!"});
            }
            const newMember = {
                email: email,
                role: "member",
            }
            let members = [...team.members,newMember];

            await teamCodeSchema.findOneAndUpdate({hackathonName: name, teamCode: teamCode},{members: members,});
            await hackParticipantDetails.findOneAndUpdate({hackathonName: name, email: email},{teamCode: teamCode});
            return res.status(200).json({msg: "success"});
        } catch (e) {
            return res.status(400).json({ Error: "Error saving data to Database!" });
        }
    });

hack_register.route('/registeredHackathons')
    .get(isUser,async(req,res) => {
        const email = req.email;
        const regHacks = await hackParticipantDetails.find({ email: email });
        const regHackNames = regHacks.map(form => form.hackathonName);
        const details = await hackFullDetails.find({ hackathonName: { $in: regHackNames } });
        return res.status(200).send(details);
    })

hack_register.route('/registeredParticipants/:hackathonName')
    .get(async(req,res)=>{

        const hackathonName=req.params.hackathonName;


        const response= await teamCodeSchema.find({hackathonName: hackathonName}); 
     
        
        return res.status(200).json({response})


    })

hack_register.route('/registeredParticipants/:hackathonName/verify')
    .post(async (req, res) => {
        const hackathonName = req.params.hackathonName;
        const { teamCode } = req.body; 

        try {
            const team = await teamCodeSchema.findOneAndUpdate(
                { hackathonName: hackathonName, teamCode: teamCode },
                { verificationStatus: "verified" },
                { new: true }
            );

            if (!team) {
                return res.status(404).json({ message: "Team not found" });
            }

            return res.status(200).json({ message: "Team successfully verified", team });
        } catch (error) {
            console.error("Error verifying team:", error);
            return res.status(500).json({ message: "Server error" });
        }
    });

hack_register.route('/registeredParticipants/:hackathonName/decline')
    .post(async (req, res) => {
        const hackathonName = req.params.hackathonName;
        const { teamCode } = req.body;

        try {
            const team = await teamCodeSchema.findOneAndUpdate(
                { hackathonName: hackathonName, teamCode: teamCode },
                { verificationStatus: "rejected" },
                { new: true }
            );

            if (!team) {
                return res.status(404).json({ message: "Team not found" });
            }

            return res.status(200).json({ message: "Team successfully declined", team });
        } catch (error) {
            console.error("Error declining team:", error);
            return res.status(500).json({ message: "Server error" });
        }
    });


hack_register.route('/registeredParticipants/teamDetails/:teamCode')
    .get(async (req, res) => {
        try {
            const teamCode = req.params.teamCode;
            const response = await hackParticipantDetails.find({ teamCode: teamCode });
    
            if (response.length === 0) {
                return res.status(404).json({ message: "No participants found for this team" });
            }
    
            return res.status(200).json({ response });
        } catch (error) {
            console.error("Error fetching team details:", error);
            return res.status(500).json({ message: "Server error" });
        }
    });

hack_register.route('/checkRegistration/:name')
    .get(isUser,async(req,res) => {
        const {name} = req.params;
        const email = req.email;
        try {
            const data = await hackParticipantDetails.findOne({hackathonName: name, email: email});
            return res.status(200).json({ flag: (data) ? true : false });
        } catch (error) {
            console.error("Error fetching team details:", error);
            return res.status(500).json({ message: "Server error" });
        }
    })


module.exports = hack_register;