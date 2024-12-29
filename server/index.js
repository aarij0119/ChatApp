const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
const connectDB = require('./config/connection');
const userModel = require('./models/user');


// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(cookieParser());

// Create HTTP server and Socket.IO server
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
    credentials: true 
  }
});

// In-memory user storage
let users = {}; 

// User registration endpoint
app.post('/chat', async function(req, res) {
  const { username, email, password, number } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      username,
      email,
      password: hash,
      number
    });

    // const userid =  jwt.sign({userid:user._id}, "hello")
    // res.cookie('token', userid);
    res.status(201).send(user); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Root endpoint
app.get('/', function(req, res) {
  res.send('Connected to server');
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on('joined', ({ user }) => {
    const id = socket.id;
    const username = user.username;
    users[id] = username; 
    console.log(`${username}, has joined. ID is ${id}`);
    io.emit('welcome', { message: 'User', username });
  });

  socket.on('message', (message) => {
    const user  = message.user.username;
    const messages = message.message;
    const time = message.timestamp;
    io.emit('reply', { messages, user, time });
  });

  socket.on('disconnect', () => {
    const username = users[socket.id];
    console.log(`User disconnected: ${username} (ID: ${socket.id})`);
    io.emit('userDisconnected', { username: `${username} left the chat`} );
    delete users[socket.id];
  });
});

// Start server
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
