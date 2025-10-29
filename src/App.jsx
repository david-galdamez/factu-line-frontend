import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';


import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import Login from './components/login.jsx';

function App() {
  return (
    <Routes>
      {/* Ruta 1: El Layout principal (con Header/Footer) */}
      <Route path="/" element={<Layout />}>
        {}
        <Route index element={<HomePage />} />
        {}
      </Route>

      {}
      <Route path="/login" element={<Login />} />

    </Routes>
  );
}

export default App;