import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/login';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
