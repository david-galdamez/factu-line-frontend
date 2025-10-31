// src/pages/HomePage.jsx - VERSIÓN LIMPIA

import React from 'react';

// NO HAY NINGUNA importación de { Routes } o { Route } aquí

import Hero from '../components/Hero';
import Features from '../components/Features';
import ContentSection from '../components/ContentSection';

function HomePage() { 

  // NO HAY NINGÚN <Routes> aquí
  return (
    <>
      <Hero />
      <Features />
      <ContentSection />
    </>
  );
}

export default HomePage;