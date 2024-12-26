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

    socket.on('reply', (data) => {
      console.log('coming from backend:', data.messages);
      const messages = data.messages;
      setMessages((prevMessages) => [...prevMessages, messages]);
    });

    return () => {
      socket.off('connect');
      socket.off('reply');
    };
  }, []);

  return (
    <div className='w-full h-screen bg-zinc-900'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-1/2 h-3/4'>
        <div className='w-full bg-blue-600 h-16'></div>
        <div className='Chat p-2 '>
          {messages.map((msg, index) => (
            <div key={index} className='bg-green-400 w-fit px-2 py-1 rounded-3xl mb-2'>
              {msg}
            </div>
          ))}
        </div>
        <div className='bg-black w-full h-12 absolute bottom-0 flex items-center px-0.5 py-0.5 gap-1'>
          <form onSubmit={messageHandler} className='w-full flex items-center'>
            <div className='w-[80%] h-full bg-red-400'>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='w-full h-full outline-none p-3'
                type='text'
              />
            </div>
            <div className='w-[20%] p-2 bg-green-700 flex items-center justify-center h-full text-white text-lg rounded-3xl'>
              <input type='submit' value='Send' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NextPage;
