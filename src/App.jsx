import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage'; 

import Login from './pages/Login';
import Register from './pages/Register';
import Terms from './pages/TermsPage';
import MainLayout from './components/MainLayout';
import Privacy from './pages/PrivacyPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
        
          <Route path="/" element={<HomePage />} /> 
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;