import React, { useState } from "react";
import PortfolioForm from "./components/PortfolioForm";
import PortfolioPreview from "./components/PortfolioPreview";
import "./styles.css";

function App() {
  const [data, setData] = useState({
    // Personal Information
    name: "",
    title: "",
    about: "",
    email: "",
    phone: "",
    location: "",
    
    // Social Links
    github: "",
    linkedin: "",
    portfolio: "",
    twitter: "",
    
    // Skills
    technicalSkills: "",
    softSkills: "",
    
    // Experience
    experience: [
      {
        company: "",
        position: "",
        duration: "",
        description: ""
      }
    ],
    
    // Education
    education: [
      {
        institution: "",
        degree: "",
        year: ""
      }
    ],
    
    // Projects
    projects: [
      {
        name: "",
        description: "",
        technologies: "",
        link: ""
      }
    ]
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎨 Portfolio Builder Pro</h1>
        <p>Create your stunning portfolio in minutes</p>
      </header>
      
      <div className="container">
        <div className="grid">
          <PortfolioForm data={data} setData={setData} />
          <PortfolioPreview data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;