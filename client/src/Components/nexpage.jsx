import React from 'react'
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client'

const ENDPOINT = 'http://localhost:3000'
const socket = io(ENDPOINT, {transports:['websocket']});
const nexpage = () => {
    const location = useLocation();
    const {user} = location.state || {}
    socket.on('connect',()=>{
    
    })
  return (
    <div>nexpage, welcome to {user.username}</div>
  )
}

export default nexpage