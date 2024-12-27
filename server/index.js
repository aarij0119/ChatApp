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

let users = {}; 

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

  socket.on('joined', ({ user }) => {
    const id = socket.id;
    const username = user.username;
    users[id] = username; 
    console.log(`${username}, has joined. ID is ${id}`);
    socket.emit('welcome', { message: 'Admin, welcome', username });
  });

  socket.on('message', (message) => {
    const messages = message.message;
    io.emit('reply', { messages });
  });

  socket.on('disconnect', () => {
    const username = users[socket.id]; // Get username by socket ID
    console.log(`User disconnected: ${username} (ID: ${socket.id})`);
    io.emit('userDisconnected', { message: `User ${username} (ID: ${socket.id}) has left the chat` });
    delete users[socket.id]; // Remove user from the map after retrieving the username
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
