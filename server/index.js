const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');

const connection = require('./config.js/connection');
const userMOdel = require('./models/user')

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(cors());

const server = http.createServer(app)
const io = socketIo(server);

app.get('/chat',async function(req,res){
const[username,email,password,number] = req.body;
const user = await userMOdel.create({
        username,
        email,
        password,
        number
    })
    res.send(user)
})

app.get('/',function(req,res){
    res.send('Connected To backend')
});

io.on("connection",() => {
    console.log("User Connected ")
})




server.listen(3000);