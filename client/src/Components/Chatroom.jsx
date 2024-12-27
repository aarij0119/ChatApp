import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:3000';
const socket = io(ENDPOINT, { transports: ['websocket'] });

const NextPage = () => {
  const location = useLocation();
  const { user } = location.state || {};

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [joinmessage,setjoinmessage] = useState('');

  const messageHandler = (e) => {
    e.preventDefault();
    console.log(message);
    socket.emit('message', { message });
    setMessage('');
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log("One user Connected");
      socket.emit('joined', { user });
    });
    socket.on('welcome',(data)=>{
      console.log(data.message, data.username);
      setjoinmessage(data.username)
      setTimeout(() => {
        setjoinmessage('')
      }, 2000);
    });

    socket.on('userDisconnected',(data)=>{
      console.log(data.message)
    })

    socket.on('reply', (data) => {
      console.log('coming from backend:', data.messages);
      const messages = data.messages;
      setMessages((prevMessages) => [...prevMessages, messages]);
    });

    return () => {
      socket.off('connect');
      socket.off('reply');
      socket.off('welcome')
    };
  }, []);

  return (
    <div className='w-full min-h-screen bg-zinc-900 p-2'>
        {joinmessage ? (
          <div className='bg-green-700 w-fit px-2 py-1 rounded-full'> 
          <h1 className='text-white uppercase'>{joinmessage}</h1> 
        </div>
        ) : null}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-1/2 h-3/4'>
          <div className='w-full bg-blue-600 h-16'></div>
          <div className='Chat p-2 overflow-y-auto h-[34rem]'>
            {messages.map((msg, index) => (
              <div key={index} className='bg-green-400 w-fit px-2 py-1 rounded-3xl mb-2'>
                {msg}
              </div>
            ))}
          </div>
          <div className='w-full h-12'>
          <form onSubmit={messageHandler} className='w-full flex items-center mx-auto'>
            <div className='w-[80%] h-full border-zinc-900 border-2'>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='w-full h-full outline-none p-3'
                type='text'
              />
            </div>
            <div className='w-[20%] p-2.5  bg-blue-700 flex items-center justify-center text-white text-lg'>
              <input className='w-full h-full cursor-pointer' type='submit' value='Send' />
            </div>
          </form>
        </div>
        </div>
      
      </div>
    
  );
};

export default NextPage;
