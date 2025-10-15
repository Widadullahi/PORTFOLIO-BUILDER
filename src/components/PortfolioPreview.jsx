import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PortfolioPreview = ({ data }) => {
  const {
    name,
    title,
    about,
    email,
    phone,
    location,
    github,
    linkedin, // Fixed: was 'linkdn' in your data structure
    portfolio,
    twitter,
    technicalSkills,
    softSkills,
    experience,
    education,
    projects
  } = data;

  const portfolioRef = useRef();

  const technicalSkillsList = technicalSkills ? technicalSkills.split(",").map(s => s.trim()) : [];
  const softSkillsList = softSkills ? softSkills.split(",").map(s => s.trim()) : [];

  // Function to validate URLs
  const isValidUrl = (string) => {
    if (!string) return false;
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const downloadPDF = async () => {
    const element = portfolioRef.current;
    
    if (!element) {
      alert('Portfolio element not found');
      return;
    }

    const downloadBtn = document.querySelector('.download-btn');
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '⏳ Generating PDF...';
    downloadBtn.disabled = true;

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false
      });

      if (!canvas.width || !canvas.height) {
        throw new Error('Canvas is empty');
      }

      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${name || 'portfolio'}-portfolio.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      downloadBtn.innerHTML = originalText;
      downloadBtn.disabled = false;
    }
  };

  // Simple text-based PDF
  const downloadSimplePDF = () => {
    const pdf = new jsPDF();
    
    let yPosition = 20;
    
    // Add name
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text(name || 'Your Name', 20, yPosition);
    yPosition += 15;
    
    // Add title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');
    pdf.text(title || 'Your Professional Title', 20, yPosition);
    yPosition += 20;
    
    // Add contact information with links
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 255);
    
    if (email) {
      pdf.textWithLink(`Email: ${email}`, 20, yPosition, { url: `mailto:${email}` });
      yPosition += 8;
    }
    if (phone) {
      pdf.text(`Phone: ${phone}`, 20, yPosition);
      yPosition += 8;
    }
    if (location) {
      pdf.text(`Location: ${location}`, 20, yPosition);
      yPosition += 8;
    }
    
    // Social links
    if (github && isValidUrl(github)) {
      pdf.textWithLink(`GitHub: ${github}`, 20, yPosition, { url: github });
      yPosition += 8;
    }
    if (linkedin && isValidUrl(linkedin)) {
      pdf.textWithLink(`LinkedIn: ${linkedin}`, 20, yPosition, { url: linkedin });
      yPosition += 8;
    }
    if (portfolio && isValidUrl(portfolio)) {
      pdf.textWithLink(`Portfolio: ${portfolio}`, 20, yPosition, { url: portfolio });
      yPosition += 8;
    }
    if (twitter && isValidUrl(twitter)) {
      pdf.textWithLink(`Twitter: ${twitter}`, 20, yPosition, { url: twitter });
      yPosition += 8;
    }
    
    pdf.setTextColor(0, 0, 0);
    yPosition += 10;
    
    // Add about section
    if (about) {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('About Me', 20, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const aboutLines = pdf.splitTextToSize(about, 170);
      pdf.text(aboutLines, 20, yPosition);
      yPosition += (aboutLines.length * 5) + 10;
    }
    
    // Add skills
    if (technicalSkillsList.length > 0) {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Technical Skills', 20, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(technicalSkillsList.join(', '), 20, yPosition);
      yPosition += 15;
    }

    if (softSkillsList.length > 0) {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Soft Skills', 20, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(softSkillsList.join(', '), 20, yPosition);
      yPosition += 15;
    }
    
    // Add experience
    if (experience.some(exp => exp.company || exp.position)) {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Work Experience', 20, yPosition);
      yPosition += 10;
      
      experience.forEach((exp, index) => {
        if (exp.company || exp.position) {
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          pdf.text(exp.company || 'Company', 20, yPosition);
          yPosition += 6;
          
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          pdf.text(exp.position || 'Position', 20, yPosition);
          yPosition += 6;
          
          if (exp.duration) {
            pdf.text(exp.duration, 20, yPosition);
            yPosition += 6;
          }
          
          if (exp.description) {
            const descLines = pdf.splitTextToSize(exp.description, 170);
            pdf.text(descLines, 20, yPosition);
            yPosition += (descLines.length * 5) + 5;
          }
          
          yPosition += 5;
        }
      });
    }
    
    // Add education
    if (education.some(edu => edu.institution || edu.degree)) {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Education', 20, yPosition);
      yPosition += 10;
      
      education.forEach((edu, index) => {
        if (edu.institution || edu.degree) {
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          pdf.text(edu.institution || 'Institution', 20, yPosition);
          yPosition += 6;
          
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          pdf.text(edu.degree || 'Degree', 20, yPosition);
          yPosition += 6;
          
          if (edu.year) {
            pdf.text(edu.year, 20, yPosition);
            yPosition += 6;
          }
          
          yPosition += 5;
        }
      });
    }
    
    // Add projects with links
    if (projects.some(proj => proj.name || proj.description)) {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Projects', 20, yPosition);
      yPosition += 10;
      
      projects.forEach((proj, index) => {
        if (proj.name || proj.description) {
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          pdf.text(proj.name || `Project ${index + 1}`, 20, yPosition);
          yPosition += 6;
          
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          
          if (proj.description) {
            const descLines = pdf.splitTextToSize(proj.description, 170);
            pdf.text(descLines, 20, yPosition);
            yPosition += (descLines.length * 5);
          }
          
          if (proj.link && isValidUrl(proj.link)) {
            pdf.setTextColor(0, 0, 255);
            pdf.textWithLink(`Project Link: ${proj.link}`, 20, yPosition, { url: proj.link });
            pdf.setTextColor(0, 0, 0);
            yPosition += 6;
          }
          
          if (proj.technologies) {
            pdf.text(`Technologies: ${proj.technologies}`, 20, yPosition);
            yPosition += 6;
          }
          
          yPosition += 10;
        }
      });
    }
    
    pdf.save(`${name || 'portfolio'}-simple-portfolio.pdf`);
  };

  return (
    <div>
      <div ref={portfolioRef} className="preview-container">
        {/* Header */}
        <div className="portfolio-header">
          <h1 className="portfolio-name">{name || "Your Name"}</h1>
          <h2 className="portfolio-title">{title || "Your Professional Title"}</h2>
          
          {/* Contact Info */}
          <div className="contact-info">
            {email && (
              <div className="contact-item">
                <span>📧</span>
                <a href={`mailto:${email}`} className="clickable-link">{email}</a>
              </div>
            )}
            {phone && (
              <div className="contact-item">
                <span>📱</span>
                <span>{phone}</span>
              </div>
            )}
            {location && (
              <div className="contact-item">
                <span>📍</span>
                <span>{location}</span>
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="social-links">
            {github && isValidUrl(github) && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="social-link clickable-link">
                <span>🐙</span> GitHub
              </a>
            )}
            {linkedin && isValidUrl(linkedin) && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="social-link clickable-link">
                <span>💼</span> LinkedIn
              </a>
            )}
            {portfolio && isValidUrl(portfolio) && (
              <a href={portfolio} target="_blank" rel="noopener noreferrer" className="social-link clickable-link">
                <span>🌐</span> Portfolio
              </a>
            )}
            {twitter && isValidUrl(twitter) && (
              <a href={twitter} target="_blank" rel="noopener noreferrer" className="social-link clickable-link">
                <span>🐦</span> Twitter
              </a>
            )}
          </div>
        </div>

        {/* About Section */}
        {about && (
          <div className="portfolio-section">
            <h3 className="section-title">About Me</h3>
            <p className="about-text">{about}</p>
          </div>
        )}

        {/* Skills Section */}
        {(technicalSkillsList.length > 0 || softSkillsList.length > 0) && (
          <div className="portfolio-section">
            <h3 className="section-title">Skills</h3>
            {technicalSkillsList.length > 0 && (
              <div>
                <h4>Technical Skills</h4>
                <div className="skills-container">
                  {technicalSkillsList.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}
            {softSkillsList.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <h4>Soft Skills</h4>
                <div className="skills-container">
                  {softSkillsList.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Experience Section */}
        {experience.some(exp => exp.company || exp.position) && (
          <div className="portfolio-section">
            <h3 className="section-title">Work Experience</h3>
            {experience.map((exp, index) => (
              (exp.company || exp.position) && (
                <div key={index} className="experience-item">
                  <div className="item-header">
                    <div>
                      <div className="item-title">{exp.company || "Company"}</div>
                      <div className="item-subtitle">{exp.position || "Position"}</div>
                    </div>
                    {exp.duration && <div className="item-duration">{exp.duration}</div>}
                  </div>
                  {exp.description && <p className="item-description">{exp.description}</p>}
                </div>
              )
            ))}
          </div>
        )}

        {/* Education Section */}
        {education.some(edu => edu.institution || edu.degree) && (
          <div className="portfolio-section">
            <h3 className="section-title">Education</h3>
            {education.map((edu, index) => (
              (edu.institution || edu.degree) && (
                <div key={index} className="education-item">
                  <div className="item-header">
                    <div>
                      <div className="item-title">{edu.institution || "Institution"}</div>
                      <div className="item-subtitle">{edu.degree || "Degree"}</div>
                    </div>
                    {edu.year && <div className="item-duration">{edu.year}</div>}
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {/* Projects Section */}
        {projects.some(proj => proj.name || proj.description) && (
          <div className="portfolio-section">
            <h3 className="section-title">Projects</h3>
            {projects.map((proj, index) => (
              (proj.name || proj.description) && (
                <div key={index} className="project-item">
                  <div className="item-header">
                    <div className="item-title">{proj.name || "Project Name"}</div>
                    {proj.link && isValidUrl(proj.link) && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="social-link clickable-link">
                        🔗 View Project
                      </a>
                    )}
                  </div>
                  {proj.description && <p className="item-description">{proj.description}</p>}
                  {proj.technologies && (
                    <div className="skills-container" style={{ marginTop: '0.5rem' }}>
                      {proj.technologies.split(',').map((tech, techIndex) => (
                        <span key={techIndex} className="skill-tag">{tech.trim()}</span>
                      ))}
                    </div>
                  )}
                  {proj.link && isValidUrl(proj.link) && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                      <strong>Link:</strong> <a href={proj.link} className="clickable-link" style={{ color: '#667eea' }}>{proj.link}</a>
                    </div>
                  )}
                </div>
              )
            ))}
          </div>
        )}
      </div>

      {/* Download Buttons */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
        <button className="download-btn" onClick={downloadPDF}>
          📥 Download as Image PDF
        </button>
        <button 
          className="download-btn" 
          onClick={downloadSimplePDF}
          style={{ background: 'linear-gradient(135deg, #4CAF50, #45a049)' }}
        >
          📄 Download as Text PDF
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>
        <p>
          <strong>Image PDF:</strong> Preserves exact design<br />
          <strong>Text PDF:</strong> Smaller file + clickable links
        </p>
      </div>
    </div>
  );
};

export default PortfolioPreview;