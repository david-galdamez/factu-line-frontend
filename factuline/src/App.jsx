import React from 'react';
import './App.css'; // Importamos los estilos

// Importamos los componentes
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ContentSection from './components/ContentSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Features />
        <ContentSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;