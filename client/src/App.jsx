import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import io from 'socket.io-client'

const ENDPOINT = 'http://localhost:3000'
const socket = io(ENDPOINT, {transports:['websocket']})

const App = () => {
  socket.on('connect',()=>{
    
  })
  return (
    <>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    
  </>
  );
}

export default App;
