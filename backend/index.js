const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cookieParser=require("cookie-parser");
const cors = require("cors");
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');

const hack_create = require("./controller/hackathon_creation");
const userlogin=require("./controller/userRegistration");
const jwtverifier=require("./controller/jwtVerifier");
const project_finder=require("./controller/project_finder")
const user=require("./controller/UserProfile");
const hack_register = require('./controller/hackathonRegistration');
const sponsor=require("./controller/Sponsor");
const chat_backend = require("./controller/chat_backend");
const chatStatusModel = require("./models/chat_status_model");
const judges=require('./controller/Judges');
const hack_project = require('./controller/project');
const userProfile = require("./controller/userProfileEdit");

require('dotenv').config();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  httpOnly: true ,
  secure: true,
  sameSite:'none',
};

if (process.env.NODE_ENV === 'development') {
  console.log("herreeeeee");
  const logDirectory = path.join(__dirname, 'logs');
  require('fs').existsSync(logDirectory) || require('fs').mkdirSync(logDirectory);
  
  const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory,
    size: '10M',
    compress: 'gzip' 
  });
  
  app.use(morgan('combined', { stream: accessLogStream }));
} else {
  app.use(morgan('combined'));
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

const io = new Server(server, {
  cors: corsOptions
});

io.use((socket, next) => {
  const token = JSON.parse(socket.handshake.auth.token);
  if (!token) {
      return next(new Error('Authentication error'));
  }
  socket.email = token.email;
  next();
});

io.on('connection', async (socket) => {
  console.log('User connected:', socket.id);

  await chatStatusModel.findOneAndUpdate({ email: socket.email }, {
      status: true,
      socketId: socket.id,
  });

  socket.on('chatMessage', async (msg) => {
    console.log('Message received:', msg);

    try{
      const data = await chatStatusModel.findOne({email: msg.to});
      if(data && data.status === true){
        io.to(data.socketId).emit('chatMessage', msg);
      }
    } catch(e){
      console.error("Error:",e)
    }
  });

  socket.on('disconnect', async() => {
    await chatStatusModel.findOneAndUpdate({ email: socket.email }, {
      status: false,
      socketId: "",
    });
      console.log('User disconnected! socket ID: ' + socket.id);
  });

  socket.on('error', (err) => {
      console.error('Socket error:', err);
  });
});

const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database successfully");
});

app.get('/api', (req, res) => {
  res.send("hittt");
})

app.use("/api/userProfile",userProfile)
app.use("/api/project",project_finder);
app.use("/api/hackathon", hack_create);
app.use("/api/hackathon", hack_register);
app.use("/api/userlogin",userlogin);
app.use("/api/jwtverify",jwtverifier);
app.use("/api/user",user);
app.use("/api/sponsors",sponsor);
app.use("/api/chat",chat_backend(io));
app.use("/api/judge",judges);
app.use("/api/project",hack_project);

app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

server.listen(5000, () => { console.log("Server started on port 5000 ... (http://localhost:5000/)") });

// module.exports = server;