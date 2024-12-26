const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');

const connectDB = require('./config/connection');
const userModel = require('./models/user');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cors());



const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"]
  }
});

app.post('/chat', async function(req, res) {
  const { username, email, password, number } = req.body;
  try {
    const user = await userModel.create({
      username,
      email,
      password,
      number
    });
    res.status(201).send(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

app.get('/', function(req, res) {
  res.send('Connected to server');
});

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on('joined',({user}) => {
    console.log(`${user.username} has joined`);
  });
  socket.on('message',(message)=>{
  const messages = message.message;
  socket.emit('reply', {messages});
  })
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
