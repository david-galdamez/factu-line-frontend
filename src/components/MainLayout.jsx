import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Header from './Header'; 
import TermsBar from './TermsBar';
import Footer from './Footer'; 


function MainLayout() {
  return (
    <>
      <Header /> 
      <main>
        <Outlet />
      </main>
        <Footer />
        <TermsBar />
    </>
  );
}

export default MainLayout;