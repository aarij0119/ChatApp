import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Chatroom from './Components/Chatroom';

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path='/nextpage' element={<Chatroom />}></Route>
    </Routes>
    
  </>
  );
}

export default App;
