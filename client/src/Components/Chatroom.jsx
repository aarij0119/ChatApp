import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:3000';
const socket = io(ENDPOINT, { transports: ['websocket'] });

const NextPage = () => {
  const location = useLocation();
  const { user } = location.state || {};

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [joinMessage, setJoinMessage] = useState('');
  const [userDisconnect, setUserDisconnect] = useState('');

  const messageHandler = (e) => {
    e.preventDefault();
    if (message) {
      console.log(message);
      const timestamp = new Date().toLocaleTimeString();
      socket.emit('message', { message, user, timestamp });
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log("One user Connected");
    });

    socket.emit('joined', { user });

    socket.on('welcome', (data) => {
      setJoinMessage(data.username);
      setTimeout(() => {
        setJoinMessage('');
      }, 3000);
    });

    socket.on('userDisconnected', (data) => {
      setUserDisconnect(data.username);
      setTimeout(() => {
        setUserDisconnect('');
      }, 4000);
    });

    socket.on('reply', (data) => {
      console.log("User sent message", data.user);
      console.log('coming from backend:', data.messages);
      console.log("time is ", data.time);
      const newMessage = { text: data.messages, username: data.user, time: data.time };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('connect');
      socket.off('reply');
      socket.off('welcome');
      socket.off('userDisconnected');
    };
  }, []);

  return (
    <div className='w-full min-h-screen bg-zinc-900 p-2'>
      {/* Flash Message of join */}
      {joinMessage && (
        <div className='bg-blue-700 w-fit px-2 py-1 rounded-xl absolute top-4 right-4'>
          <h1 className='text-white uppercase'>{joinMessage} has joined the chat</h1>
        </div>
      )}
      {/* Flash Message of left */}
      <div className={`${userDisconnect.length > 0 ? 'text-white bg-red-700 w-fit px-2 rounded-full py-1 absolute top-4 right-4' : null}`}>
        <h1>{userDisconnect}</h1>
      </div>
      <div className='md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2  bg-white md:w-4/5 lg:w-1/2 md:h-[60%] lg:h-[55%] h-full'>
        <div className='w-full h-12 bg-gray-300 flex items-center px-2'>
          <h1>User: {user.username}</h1>
        </div>
        {/* Chat showing */}
        <ScrollToBottom className='h-full'>
          <div className='Chat p-2 overflow-y-auto md:h-full h-[34.5rem] bg-[#594CD7] flex flex-col'>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 w-full flex ${msg.username === user.username ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-xs`}>
                  <h1 className='text-[11px]'>{msg.time}</h1>
                  <h1 className={`text-sm font-bold w-fit px-4 py-1 ${msg.username === user.username ? 'rounded-2xl rounded-tl-none bg-[#7B70EE] text-white' : 'rounded-2xl rounded-tr-none bg-white'}`}>
                    {msg.text}
                  </h1>
                  <h4 className='flex items-end justify-end text-[12px]'>{msg.username}</h4>
                </div>
              </div>
            ))}
          </div>
        </ScrollToBottom>
        <div className='w-full'>
          <form onSubmit={messageHandler} className='w-full flex items-center mx-auto'>
            <div className='w-[80%] h-full border-zinc-900 border-2'>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='w-full h-full outline-none p-3'
                type='text'
              />
            </div>
            <div className='w-[20%] p-2.5 bg-blue-700 flex items-center justify-center text-white text-lg'>
              <input className='w-full h-full cursor-pointer' type='submit' value='Send' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NextPage;
