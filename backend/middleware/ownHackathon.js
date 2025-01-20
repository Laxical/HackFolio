const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
app.use(express.json());
const hackathon_form = require('../models/org_form_Schema');

const ownHackathon=(req,res,next)=>{
    const token =req.cookies['jwt'];
    if(token){
        jwt.verify(token,'secret',async(err,data)=>{
            if(err) {
                if (err.name === 'TokenExpiredError') {
                return res.status(201).json({ error: 'Token expired', expiredAt: err.expiredAt });
                }
                res.status(400).send("Invalid Token");
            }
            else {
                req.userId = data.userId;
                req.username=data.username;
                req.email = data.email;
            
                const {name} = req.params;
                const flag = await hackathon_form.findOne({hackathonName: name,email: data.email});
                if(!flag) return res.status(403).json({error: "not authorized"});
                
                next();
            }
        });
    }
    else{
        res.status(400).send('ok');
    }
}
module.exports= ownHackathon;