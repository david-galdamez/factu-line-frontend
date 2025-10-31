// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// 1. ¡ESTA ES LA LÍNEA QUE TE FALTA O ESTÁ MAL ESCRITA!
//    Asegúrate de que el nombre 'HomePage' y la ruta './pages/HomePage' sean correctos.
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
import HomePage from './pages/HomePage'; 
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

import Login from './pages/Login';
import Register from './pages/Register';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
        
          {/* 2. Esta línea es la que da el error porque la importación de arriba falta */}
          <Route path="/" element={<HomePage />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;