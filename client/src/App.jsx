import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Nextpage from './Components/nexpage';

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path='/nextpage' element={<Nextpage />}></Route>
    </Routes>
    
  </>
  );
}

export default App;
