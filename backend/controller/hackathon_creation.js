const express = require('express');
const hack_create = express.Router();
const hackathon_form = require('../models/org_form_Schema');
const hackWebDetails = require('../models/hackathon_webpage_details');
const hackFullDetails = require('../models/hackathon_full_details');
const isUser = require('../middleware/isUser');
const ownHackathon = require('../middleware/ownHackathon');

hack_create.route('/')
    .get(async (req,res) => {
        let page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const search = req.query.search || "";
        const query = (search.length !== 0) ? {completelyFilled: true, hackathonName: { $regex: search, $options: 'i' }} : {completelyFilled: true};

        const totalHackathons = await hackathon_form.countDocuments(query);
        if(page > Math.ceil(totalHackathons / limit)) page = Math.ceil(totalHackathons / limit)
        if(page < 1) page = 1;
        const hackathons = await hackFullDetails.find(query).skip((page-1)*limit).limit(limit);
        return res.status(200).json({
            totalHackathons,
            hackathons,
            totalPages: Math.ceil(totalHackathons / limit),
            currentPage: page
        });
    })

hack_create.route("/hackathonCreate")
    .get(async (req, res) => {
        return res.status(200).send("hereee");
    })
    .post(isUser,async (req, res) => {
        const { hackName, uniName } = req.body;
        try {
            const existingHackathon = await hackathon_form.findOne({ hackathonName: hackName });
            if (existingHackathon) {
                return res.status(201).json({ Error: "Name already exists" });
            }

            const newHackathonData = new hackathon_form({
                email: req.email,
                hackathonName: hackName,
                uniName: uniName,
                completelyFilled: false,
            });
            await newHackathonData.save();

            const newHackFullDetails = new hackFullDetails({
                hackathonName: hackName,
                uniName: uniName,
                eventMode: " ",
                tech: " ",
                teamSize: " ",
                participantsProfile: " ",
                contactLinks: [],
                fromDate: " ",
                toDate: " ",
                prizesDesc: " ",
            });
            const data = await newHackFullDetails.save();

            const savedHackathon = await hackathon_form.findOne({ hackathonName: hackName });
            return res.status(200).json({ name: savedHackathon.hackathonName });
        } catch (e) {
            return res.status(400).json({ Error: "Error saving data to Database!" });
        }
    });

hack_create.route("/hackathonCreate/:name/1")
    .get(ownHackathon,isUser,async(req,res) => {
        const name =  req.params.name;
        const email = req.email;
        try {
            const data = await hackathon_form.findOne({hackathonName: name});
            if (!data) {
                return res.status(404).json({ Error: "Hackathon not found!" });
            }
            // if(email!==data.email) return res.status(400).json({error: "not authorized"})
            return res.status(200).json(data);
        } catch (e) {
            return res.status(400).json({ Error: "Error fetching data from Database!" });
        }
    })
    .post(ownHackathon,isUser,async(req,res) => {
        const { hackName, uniName, eventMode, tech, teamSize, partProf, contactLinks, fromDate, toDate, prizesDesc } = req.body;
        const name = req.params.name;
        const email = req.email;

        try{
            if(teamSize > 8) {
                return res.status(400).json({ Error: "Team max size limit exceeded!" });
            }
            const data = {
                hackathonName: hackName,
                uniName: uniName,
                eventMode: eventMode,
                tech: tech,
                teamSize: teamSize,
                participantsProfile: partProf,
                contactLinks: contactLinks,
                fromDate: fromDate,
                toDate: toDate,
                prizesDesc: prizesDesc,
            }
            await hackFullDetails.findOneAndUpdate({hackathonName: hackName}, data);

            await hackathon_form.findOneAndUpdate({hackathonName: name}, { step: 1});

            res.status(200).json({ data: data });
        } catch(e) {
            res.status(400).json({ Error: "Error saving data to Database!" });
        }
    });

hack_create.route("/hackathonCreate/:name/2")
    .get(ownHackathon,async(req, res) => {
        
    })
    .post(ownHackathon,async(req,res) => {
        const { imageUrl, aboutHack, aboutPrize, otherFields } = req.body;
        const name = req.params.name;
        try {
            const newHackWebDetails = new hackWebDetails({
                hackathonName: name,
                imageUrl: imageUrl,
                aboutHack: aboutHack,
                aboutPrize: aboutPrize,
                otherFields: otherFields,
            });
            const data = await newHackWebDetails.save();
            await hackathon_form.findOneAndUpdate({ hackathonName: name }, { step: 2, completelyFilled: true });
            await hackFullDetails.findOneAndUpdate({hackathonName: name}, {completelyFilled: true});

            res.status(200).json({data: data})

        } catch(e) {
            res.status(400).json({ Error: "Error saving data to Database!" });
        }
    });

hack_create.route("/organizedHackathons")
    .get(isUser, async(req,res) => {
        const email = req.email;
        const myForms = await hackathon_form.find({ email: email });
        const myFormNames = myForms.map(form => form.hackathonName);
        const details = await hackFullDetails.find({ hackathonName: { $in: myFormNames } });
        return res.status(200).send(details);
    });

hack_create.route("/updateHackDetails/:name")
    .get(ownHackathon,isUser, async(req,res) => {
        const name = req.params.name;
        const email = req.email;
        try {
            const flag = await hackathon_form.findOne({hackathonName: name, email: email});
            if(!flag) return res.status(400).json({error: "Permission denied!"});
            const data = await hackFullDetails.findOne({hackathonName: name});
            res.status(200).json({data: data});
        } catch(e) {
            res.status(400).json({Error: "Error saving data to Database!"});
        }
    })
    .post(ownHackathon,isUser, async(req,res) => {
        let flag = 0;
        const name = req.params.name;
        const { uniName, eventMode, tech, teamSize, partProf, contactLinks, from, to, prizesDesc } = req.body;
        const updatedData = {
            hackathonName: name,
            uniName: uniName,
            eventMode: eventMode,
            tech: tech,
            teamSize: teamSize,
            participantsProfile: partProf,
            contactLinks: contactLinks,
            fromDate: from,
            toDate: to,
            prizesDesc: prizesDesc,
        };
        try{
            await hackathon_form.findOneAndUpdate({ hackathonName: name }, { uniName: uniName });
            await hackFullDetails.findOneAndUpdate({ hackathonName: name }, updatedData);

            res.status(200).json({msg: "Success"});
        } catch(e) {
            res.status(400).json({Error: "Error saving data to Database!"});
        }
    })

hack_create.route("/updateHackWebsite/:name")
    .get(ownHackathon,async(req,res) => {
        const name = req.params.name;
        try {
            const data = await hackWebDetails.findOne({hackathonName: name});
            res.status(200).json({data: data});
        } catch(e) {
            res.status(400).json({Error: "Error saving data to Database!"});
        }
    })
    .post(ownHackathon,async(req,res) => {
        const name = req.params.name;
        const { imageUrl, aboutHack, aboutPrize, otherFields } = req.body;

        try {
            await hackWebDetails.findOneAndUpdate({hackathonName: name}, {imageUrl: imageUrl, aboutHack: aboutHack, aboutPrize: aboutPrize, otherFields: otherFields});
            
            res.status(200).json({msg: "success"})
        } catch(e) {
            res.status(400).json({Error: "Error saving data to Database!"});
        }
    })

hack_create.route("/getHackWebsite/:name")
    .get(async(req,res) => {
        const name = req.params.name;

        try {
            const data = await hackWebDetails.findOne({hackathonName: name});
            res.status(200).json({data: data});
        } catch(e) {
            res.status(400).json({Error: "Error saving data to Database!"});
        }
    })

hack_create.route("/getHackDetails/:name")
    .get(async(req,res) => {
        const name = req.params.name;
        try {
            const data = await hackFullDetails.findOne({hackathonName: name});
            res.status(200).json({data: data});
        } catch(e) {
            res.status(400).json({Error: "Error saving data to Database!"});
        }
    })

module.exports = hack_create;
