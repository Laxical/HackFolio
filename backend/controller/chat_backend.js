const express = require('express');
const chat_backend = express.Router();
const chatUserSchema = require('../models/chat_user_schema');
const chatMessagesSchema = require('../models/chat_messages_schema');
const isUser = require('../middleware/isUser');

module.exports = function(io) {
    chat_backend.route('/getFriends')
        .get(isUser,async(req,res) => {
            const email = req.email;

            try {
                data = await chatUserSchema.findOne({email: email});
                res.status(200).json({data: data});           
            } catch (error) {
                res.status(400).json({error: "Error saving data to database!"});
            }
        })

    chat_backend.route('/addFriends')
        .post(isUser,async(req,res) => {
            const {email} = req.body;
            const myEmail = req.email;

            try {
                const user = await chatUserSchema.findOne({ email: myEmail });
                const friend = await chatUserSchema.findOne({email: email});
            
                if (user && friend) {
                    const { interactedEmails = [] } = user;
                    const interactedEmails1 = friend.interactedEmails;
            
                    if (!interactedEmails.includes(email)) interactedEmails.push(email);
                    if(!interactedEmails1.includes(myEmail)) interactedEmails1.push(myEmail);
            
                    await chatUserSchema.findOneAndUpdate(
                        { email: myEmail },
                        { interactedEmails },
                    );

                    await chatUserSchema.findOneAndUpdate(
                        { email: email },
                        { interactedEmails: interactedEmails1 },
                    );

            
                    return res.status(200).json({ message: 'Update successful' });
                } else {
                    return res.status(400).json({ error: 'User not found' });
                }
            } catch (e) {
                return res.status(500).json({ error: 'Database Error!' });
            }
        })
    
    chat_backend.route('/messages/:email')
        .get(isUser,async(req,res) => {
            const myEmail = req.email;
            const {email} = req.params;

            try {
                const data = await chatMessagesSchema.find({$or:[{to: email,from: myEmail},{to: myEmail, from: email}]});

                res.status(200).json({data: data});
            } catch (e) {
                return res.status(500).json({ error: 'Database Error!' });
            }
        })
        .post(isUser,async(req,res) => {
            const myEmail = req.email;
            const {email} = req.params;
            const {message} = req.body

            try {
                const newMessage = new chatMessagesSchema({
                    from: myEmail,
                    to: email,
                    message: message,
                    timestamp: Date.now(),
                    readStatus: false,
                })
                await newMessage.save();

                res.status(200).json({message: "Success"});
            } catch (e) {
                return res.status(500).json({ error: 'Database Error!' });
            }
        })

    chat_backend.route('/changeReadStatus/:email')
        .get(isUser, async(req,res) => {
            const myEmail = req.email;
            const {email} = req.params;
            
            try {
                await chatMessagesSchema.updateMany({from: email, to: myEmail},{readStatus: true});

                return res.status(200).json({msg: "message status change successful"});
            } catch (e) {
                return res.status(500).json({ error: 'Database Error!' });
            }
        })
        
    chat_backend.route('/getReadStatus/:email')
        .get(isUser, async(req,res) => {
            const myEmail = req.email;
            const {email} = req.params;
            
            try {
                const data = await chatMessagesSchema.find({to: myEmail, readStatus: false});

                return res.status(200).json({data: data});
            } catch (e) {
                return res.status(500).json({ error: 'Database Error!' });
            }
        })

    return chat_backend;
}

