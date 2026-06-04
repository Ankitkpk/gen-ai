import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Register from './features/auth/pages/Register';
import Login from './features/auth/pages/Login';

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
};

export default App;