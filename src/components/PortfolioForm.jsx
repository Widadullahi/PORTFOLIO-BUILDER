import React from "react";

const PortfolioForm = ({ data, setData }) => {
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (section, index, field, value) => {
    const updatedArray = [...data[section]];
    updatedArray[index][field] = value;
    setData({ ...data, [section]: updatedArray });
  };

  const addArrayItem = (section, template) => {
    setData({ ...data, [section]: [...data[section], { ...template }] });
  };

  const removeArrayItem = (section, index) => {
    const updatedArray = data[section].filter((_, i) => i !== index);
    setData({ ...data, [section]: updatedArray });
  };

  return (
    <div className="form-container">
      <h2>📝 Build Your Portfolio</h2>
      
      {/* Personal Information */}
      <div className="form-section">
        <h3>👤 Personal Information</h3>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="John Doe"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Professional Title</label>
          <input
            type="text"
            name="title"
            className="form-input"
            placeholder="Full Stack Developer"
            value={data.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>About Me</label>
          <textarea
            name="about"
            className="form-textarea"
            placeholder="Passionate developer with 5+ years of experience..."
            rows="4"
            value={data.about}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="john@example.com"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            className="form-input"
            placeholder="+1 (555) 123-4567"
            value={data.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            className="form-input"
            placeholder="New York, NY"
            value={data.location}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="form-section">
        <h3>🔗 Social Links</h3>
        <div className="form-group">
          <label>GitHub URL</label>
          <input
            type="url"
            name="github"
            className="form-input"
            placeholder="https://github.com/username"
            value={data.github}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>LinkedIn URL</label>
          <input
            type="url"
            name="linkedin"
            className="form-input"
            placeholder="https://linkedin.com/in/username"
            value={data.linkedin}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Portfolio Website</label>
          <input
            type="url"
            name="portfolio"
            className="form-input"
            placeholder="https://yourportfolio.com"
            value={data.portfolio}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Twitter/X URL</label>
          <input
            type="url"
            name="twitter"
            className="form-input"
            placeholder="https://twitter.com/username"
            value={data.twitter}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Skills */}
      <div className="form-section">
        <h3>🛠️ Skills</h3>
        <div className="form-group">
          <label>Technical Skills (comma separated)</label>
          <input
            type="text"
            name="technicalSkills"
            className="form-input"
            placeholder="React, Node.js, Python, SQL, AWS"
            value={data.technicalSkills}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Soft Skills (comma separated)</label>
          <input
            type="text"
            name="softSkills"
            className="form-input"
            placeholder="Leadership, Communication, Problem Solving"
            value={data.softSkills}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Experience */}
      <div className="form-section">
        <h3>💼 Work Experience</h3>
        {data.experience.map((exp, index) => (
          <div key={index} className="array-item">
            <div className="array-header">
              <h4>Experience #{index + 1}</h4>
              {data.experience.length > 1 && (
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => removeArrayItem('experience', index)}
                >
                  Remove
                </button>
              )}
            </div>
            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                className="form-input"
                placeholder="Google"
                value={exp.company}
                onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Position</label>
              <input
                type="text"
                className="form-input"
                placeholder="Senior Developer"
                value={exp.position}
                onChange={(e) => handleArrayChange('experience', index, 'position', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                className="form-input"
                placeholder="Jan 2020 - Present"
                value={exp.duration}
                onChange={(e) => handleArrayChange('experience', index, 'duration', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-textarea"
                placeholder="Describe your responsibilities and achievements..."
                rows="3"
                value={exp.description}
                onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn-add"
          onClick={() => addArrayItem('experience', {
            company: "",
            position: "",
            duration: "",
            description: ""
          })}
        >
          ➕ Add Experience
        </button>
      </div>

      {/* Education */}
      <div className="form-section">
        <h3>🎓 Education</h3>
        {data.education.map((edu, index) => (
          <div key={index} className="array-item">
            <div className="array-header">
              <h4>Education #{index + 1}</h4>
              {data.education.length > 1 && (
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => removeArrayItem('education', index)}
                >
                  Remove
                </button>
              )}
            </div>
            <div className="form-group">
              <label>Institution</label>
              <input
                type="text"
                className="form-input"
                placeholder="University of Technology"
                value={edu.institution}
                onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Degree</label>
              <input
                type="text"
                className="form-input"
                placeholder="Bachelor of Computer Science"
                value={edu.degree}
                onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Year</label>
              <input
                type="text"
                className="form-input"
                placeholder="2016 - 2020"
                value={edu.year}
                onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn-add"
          onClick={() => addArrayItem('education', {
            institution: "",
            degree: "",
            year: ""
          })}
        >
          ➕ Add Education
        </button>
      </div>

      {/* Projects */}
      <div className="form-section">
        <h3>🚀 Projects</h3>
        {data.projects.map((project, index) => (
          <div key={index} className="array-item">
            <div className="array-header">
              <h4>Project #{index + 1}</h4>
              {data.projects.length > 1 && (
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => removeArrayItem('projects', index)}
                >
                  Remove
                </button>
              )}
            </div>
            <div className="form-group">
              <label>Project Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="E-commerce Platform"
                value={project.name}
                onChange={(e) => handleArrayChange('projects', index, 'name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-textarea"
                placeholder="Describe the project and your role..."
                rows="3"
                value={project.description}
                onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Technologies Used</label>
              <input
                type="text"
                className="form-input"
                placeholder="React, Node.js, MongoDB"
                value={project.technologies}
                onChange={(e) => handleArrayChange('projects', index, 'technologies', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Project Link</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://github.com/username/project"
                value={project.link}
                onChange={(e) => handleArrayChange('projects', index, 'link', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn-add"
          onClick={() => addArrayItem('projects', {
            name: "",
            description: "",
            technologies: "",
            link: ""
          })}
        >
          ➕ Add Project
        </button>
      </div>
    </div>
  );
};

export default PortfolioForm;