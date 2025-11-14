// src/pages/HomePage.jsx - VERSIÓN LIMPIA

import React from "react";

// NO HAY NINGUNA importación de { Routes } o { Route } aquí

import Hero from "../components/Hero";
import Features from "../components/Features";
import ContentSection from "../components/ContentSection";
import ContentSection2 from "../components/ContentSection2";

function HomePage() {
    return (
        <>
            <Hero />
            <Features />
            <ContentSection />
            <ContentSection2 />
        </>
    );
}

export default HomePage;
