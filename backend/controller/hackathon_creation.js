const express = require("express");
const hack_create = express.Router();
const hackathon_form = require("../models/org_form_Schema");
const hackWebDetails = require("../models/hackathon_webpage_details");
const hackFullDetails = require("../models/hackathon_full_details");
const isUser = require("../middleware/isUser");
const ownHackathon = require("../middleware/ownHackathon");
const hackParticipantDetails = require("../models/hackathon_participants_schema");
const teamCodeSchema = require("../models/team_code_schema");
hack_create.route("/").get(async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || "";
    const query =
        search.length !== 0
            ? {
                completelyFilled: true,
                hackathonName: { $regex: search, $options: "i" },
            }
            : { completelyFilled: true };

    const totalHackathons = await hackathon_form.countDocuments(query);
    if (page > Math.ceil(totalHackathons / limit))
        page = Math.ceil(totalHackathons / limit);
    if (page < 1) page = 1;
    const hackathons = await hackFullDetails
        .find(query)
        .skip((page - 1) * limit)
        .limit(limit);
    return res.status(200).json({
        totalHackathons,
        hackathons,
        totalPages: Math.ceil(totalHackathons / limit),
        currentPage: page,
    });
});

hack_create
    .route("/hackathonCreate")
    .get(async (req, res) => {
        return res.status(200).send("hereee");
    })
    .post(isUser, async (req, res) => {
        const { hackName, uniName } = req.body;
        try {
            const existingHackathon = await hackathon_form.findOne({
                hackathonName: hackName,
            });
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

            const savedHackathon = await hackathon_form.findOne({
                hackathonName: hackName,
            });
            return res.status(200).json({ name: savedHackathon.hackathonName });
        } catch (e) {
            return res.status(400).json({ Error: "Error saving data to Database!" });
        }
    });

hack_create
    .route("/hackathonCreate/:name/1")
    .get(ownHackathon, isUser, async (req, res) => {
        const name = req.params.name;
        const email = req.email;
        try {
            const data = await hackathon_form.findOne({ hackathonName: name });
            if (!data) {
                return res.status(404).json({ Error: "Hackathon not found!" });
            }
            // if(email!==data.email) return res.status(400).json({error: "not authorized"})
            return res.status(200).json(data);
        } catch (e) {
            return res
                .status(400)
                .json({ Error: "Error fetching data from Database!" });
        }
    })
    .post(ownHackathon, isUser, async (req, res) => {
        const {
            hackName,
            uniName,
            eventMode,
            tech,
            teamSize,
            partProf,
            contactLinks,
            fromDate,
            toDate,
            prizesDesc,
        } = req.body;
        const name = req.params.name;
        const email = req.email;

        try {
            if (teamSize > 8) {
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
            };
            await hackFullDetails.findOneAndUpdate({ hackathonName: hackName }, data);

            await hackathon_form.findOneAndUpdate(
                { hackathonName: name },
                { step: 1 },
            );

            res.status(200).json({ data: data });
        } catch (e) {
            res.status(400).json({ Error: "Error saving data to Database!" });
        }
    });

hack_create
    .route("/hackathonCreate/:name/2")
    .get(ownHackathon, async (req, res) => { })
    .post(ownHackathon, async (req, res) => {
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
            await hackathon_form.findOneAndUpdate(
                { hackathonName: name },
                { step: 2, completelyFilled: true },
            );
            await hackFullDetails.findOneAndUpdate(
                { hackathonName: name },
                { completelyFilled: true },
            );

            res.status(200).json({ data: data });
        } catch (e) {
            res.status(400).json({ Error: "Error saving data to Database!" });
        }
    });

hack_create.route("/organizedHackathons").get(isUser, async (req, res) => {
    const email = req.email;
    const myForms = await hackathon_form.find({ email: email });
    const myFormNames = myForms.map((form) => form.hackathonName);
    const details = await hackFullDetails.find({
        hackathonName: { $in: myFormNames },
    });
    return res.status(200).send(details);
});

hack_create
    .route("/updateHackDetails/:name")
    .get(ownHackathon, isUser, async (req, res) => {
        const name = req.params.name;
        const email = req.email;
        try {
            const flag = await hackathon_form.findOne({
                hackathonName: name,
                email: email,
            });
            if (!flag) return res.status(400).json({ error: "Permission denied!" });
            const data = await hackFullDetails.findOne({ hackathonName: name });
            res.status(200).json({ data: data });
        } catch (e) {
            res.status(400).json({ Error: "Error saving data to Database!" });
        }
    })
    .post(ownHackathon, isUser, async (req, res) => {
        let flag = 0;
        const name = req.params.name;
        const {
            uniName,
            eventMode,
            tech,
            teamSize,
            partProf,
            contactLinks,
            from,
            to,
            prizesDesc,
        } = req.body;
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
        try {
            await hackathon_form.findOneAndUpdate(
                { hackathonName: name },
                { uniName: uniName },
            );
            await hackFullDetails.findOneAndUpdate(
                { hackathonName: name },
                updatedData,
            );

            res.status(200).json({ msg: "Success" });
        } catch (e) {
            res.status(400).json({ Error: "Error saving data to Database!" });
        }
    });

hack_create
    .route("/updateHackWebsite/:name")
    .get(ownHackathon, async (req, res) => {
        const name = req.params.name;
        try {
            const data = await hackWebDetails.findOne({ hackathonName: name });
            res.status(200).json({ data: data });
        } catch (e) {
            res.status(400).json({ Error: "Error saving data to Database!" });
        }
    })
    .post(ownHackathon, async (req, res) => {
        const name = req.params.name;
        const { imageUrl, aboutHack, aboutPrize, otherFields } = req.body;

        try {
            await hackWebDetails.findOneAndUpdate(
                { hackathonName: name },
                {
                    imageUrl: imageUrl,
                    aboutHack: aboutHack,
                    aboutPrize: aboutPrize,
                    otherFields: otherFields,
                },
            );

            res.status(200).json({ msg: "success" });
        } catch (e) {
            res.status(400).json({ Error: "Error saving data to Database!" });
        }
    });

hack_create.route("/getHackWebsite/:name").get(async (req, res) => {
    const name = req.params.name;

    try {
        const data = await hackWebDetails.findOne({ hackathonName: name });
        res.status(200).json({ data: data });
    } catch (e) {
        res.status(400).json({ Error: "Error saving data to Database!" });
    }
});

hack_create.route("/getHackDetails/:name").get(async (req, res) => {
    const name = req.params.name;
    try {
        const data = await hackFullDetails.findOne({ hackathonName: name });
        res.status(200).json({ data: data });
    } catch (e) {
        res.status(400).json({ Error: "Error saving data to Database!" });
    }
});
hack_create
    .route("/registerForHackathon/:name")
    .get(isUser, async (req, res) => {
        try {
            const { name } = req.params;
            const email = req.email;

            const data = await hackParticipantDetails.findOne({
                hackathonName: name,
                email: email,
            });
            return res.status(200).json({ data: data });
        } catch (error) {
            return res.status(400).json({ Error: "Error saving data to Database!" });
        }
    })
    .post(isUser, async (req, res) => {
        const { name } = req.params;
        const formData = req.body;
        const email = req.email;
        try {
            const flag = await hackParticipantDetails.find({
                hackathonName: name,
                email: email,
            });
            if (flag.length === 0) {
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
            } else {
                return res.status(200).json({ Error: "Already Registered" });
            }
        } catch (e) {
            return res.status(400).json({ Error: "Error saving data to Database!" });
        }
    })
    .put(isUser, async (req, res) => {
        const { name } = req.params;
        const formData = req.body;
        const email = req.email;
        try {
            const flag = await hackParticipantDetails.find({
                hackathonName: name,
                email: email,
            });
            if (flag.length !== 0) {
                await hackParticipantDetails.findOneAndUpdate(
                    { hackathonName: name, email: email },
                    {
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
                    },
                );
                return res.status(200).json({ msg: "Registered" });
            } else {
                return res.status(200).json({ Error: "Registration doesn't exist!" });
            }
        } catch (e) {
            return res.status(400).json({ Error: "Error saving data to Database!" });
        }
    });

hack_create
    .route("/hackathonTeam/:name/create")
    .get(isUser, async (req, res) => {
        const { name } = req.params;
        const email = req.email;
        const data = await hackParticipantDetails.findOne({
            hackathonName: name,
            email: email,
        });
        return res.status(200).json({ flag: data ? true : false });
    })
    .post(isUser, async (req, res) => {
        const email = req.email;
        const { name } = req.params;
        const { teamName } = req.body;

        let code;
        function randGen(len) {
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            code = "";
            for (let i = 0; i < len; i++) {
                code += characters.charAt(
                    Math.floor(Math.random() * characters.length),
                );
            }
        }

        try {
            const flag = await teamCodeSchema.findOne({
                hackathonName: name,
                teamName: teamName,
            });
            if (flag) {
                return res.status(400).json({ msg: "Name already exists!" });
            }

            const data = await hackParticipantDetails.findOne({
                hackathonName: name,
                email: email,
            });
            if (!data || data.teamCode !== "") {
                return res
                    .status(400)
                    .json({
                        msg: "User not registered for Hackathon or user already in a team",
                    });
            }

            while (true) {
                randGen(6);
                const data1 = await teamCodeSchema.findOne({
                    hackathonName: name,
                    teamCode: code,
                });
                if (!data1) break;
            }

            const newTeamCodeData = new teamCodeSchema({
                hackathonName: name,
                teamName: teamName,
                teamCode: code,
                members: [
                    {
                        email: email,
                        role: "lead",
                    },
                ],
            });
            await newTeamCodeData.save();
            await hackParticipantDetails.findOneAndUpdate(
                { hackathonName: name, email: email },
                { teamCode: code, teamName: teamName },
            );

            return res.status(200).json({ msg: "success" });
        } catch (e) {
            return res.status(400).json({ Error: "Error saving data to Database!" });
        }
    });

hack_create
    .route("/hackathonTeam/:name/join")
    .get(isUser, async (req, res) => {
        const email = req.email;
        const { name } = req.params;

        try {
            const details = await hackParticipantDetails.findOne({
                hackathonName: name,
                email: email,
            });
            if (!details.teamCode)
                return res.status(400).json({ error: "Not in a team!" });
            const data = await teamCodeSchema.findOne({
                hackathonName: name,
                teamCode: details.teamCode,
            });
            return res.status(200).json({ data: data });
        } catch (e) {
            return res.status(400).json({ Error: "Error contacting Database!" });
        }
    })
    .post(isUser, async (req, res) => {
        const email = req.email;
        const { name } = req.params;
        const { teamCode } = req.body;

        try {
            const data = await hackParticipantDetails.findOne({
                hackathonName: name,
                email: email,
            });
            if (!data || data.teamCode !== "") {
                return res
                    .status(200)
                    .json({
                        msg: "User not registered for Hackathon or user already in a team",
                    });
            }
            const hackDetails = await hackFullDetails.findOne({
                hackathonName: name,
            });
            const team = await teamCodeSchema.findOne({
                hackathonName: name,
                teamCode: teamCode,
            });
            if (!team) {
                return res.status(400).json({ msg: "Team code not found!" });
            }
            if (team.members.length >= Number(hackDetails.teamSize)) {
                return res.status(400).json({ msg: "Team Full!" });
            }
            const newMember = {
                email: email,
                role: "member",
            };
            let members = [...team.members, newMember];

            await teamCodeSchema.findOneAndUpdate(
                { hackathonName: name, teamCode: teamCode },
                { members: members },
            );
            await hackParticipantDetails.findOneAndUpdate(
                { hackathonName: name, email: email },
                { teamCode: teamCode },
            );
            return res.status(200).json({ msg: "success" });
        } catch (e) {
            return res.status(400).json({ Error: "Error saving data to Database!" });
        }
    });

hack_create.route("/registeredHackathons").get(isUser, async (req, res) => {
    const email = req.email;
    const regHacks = await hackParticipantDetails.find({ email: email });
    const regHackNames = regHacks.map((form) => form.hackathonName);
    const details = await hackFullDetails.find({
        hackathonName: { $in: regHackNames },
    });
    return res.status(200).send(details);
});

hack_create
    .route("/registeredParticipants/:hackathonName")
    .get(async (req, res) => {
        const hackathonName = req.params.hackathonName;

        const response = await teamCodeSchema.find({
            hackathonName: hackathonName,
        });

        return res.status(200).json({ response });
    });

hack_create
    .route("/registeredParticipants/:hackathonName/verify")
    .post(async (req, res) => {
        const hackathonName = req.params.hackathonName;
        const { teamCode } = req.body;

        try {
            const team = await teamCodeSchema.findOneAndUpdate(
                { hackathonName: hackathonName, teamCode: teamCode },
                { verificationStatus: "verified" },
                { new: true },
            );

            if (!team) {
                return res.status(404).json({ message: "Team not found" });
            }

            return res
                .status(200)
                .json({ message: "Team successfully verified", team });
        } catch (error) {
            console.error("Error verifying team:", error);
            return res.status(500).json({ message: "Server error" });
        }
    });

hack_create
    .route("/registeredParticipants/:hackathonName/decline")
    .post(async (req, res) => {
        const hackathonName = req.params.hackathonName;
        const { teamCode } = req.body;

        try {
            const team = await teamCodeSchema.findOneAndUpdate(
                { hackathonName: hackathonName, teamCode: teamCode },
                { verificationStatus: "rejected" },
                { new: true },
            );

            if (!team) {
                return res.status(404).json({ message: "Team not found" });
            }

            return res
                .status(200)
                .json({ message: "Team successfully declined", team });
        } catch (error) {
            console.error("Error declining team:", error);
            return res.status(500).json({ message: "Server error" });
        }
    });

hack_create
    .route("/registeredParticipants/teamDetails/:teamCode")
    .get(async (req, res) => {
        try {
            const teamCode = req.params.teamCode;
            const response = await hackParticipantDetails.find({
                teamCode: teamCode,
            });

            if (response.length === 0) {
                return res
                    .status(404)
                    .json({ message: "No participants found for this team" });
            }

            return res.status(200).json({ response });
        } catch (error) {
            console.error("Error fetching team details:", error);
            return res.status(500).json({ message: "Server error" });
        }
    });

hack_create.route("/checkRegistration/:name").get(isUser, async (req, res) => {
    const { name } = req.params;
    const email = req.email;
    try {
        const data = await hackParticipantDetails.findOne({
            hackathonName: name,
            email: email,
        });
        return res.status(200).json({ flag: data ? true : false });
    } catch (error) {
        console.error("Error fetching team details:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = hack_create;
