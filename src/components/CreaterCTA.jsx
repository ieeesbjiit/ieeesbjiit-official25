import React, { useState } from 'react';
import './creatorsCTA.css';



const CreatorsCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const creators = [
    { name: "Ahmed Hassan", role: "Lead Developer" },
    { name: "Fatima Khan", role: "UI/UX Designer" },
    { name: "Muhammad Ali", role: "Frontend Developer" },
    { name: "Ayesha Malik", role: "Backend Developer" },
    { name: "Omar Sheikh", role: "Full Stack Developer" },
    { name: "Zara Ahmed", role: "Graphics Designer" },
    { name: "Hassan Raza", role: "Project Manager" },
    { name: "Sana Tariq", role: "Quality Assurance" },
    { name: "Bilal Ahmad", role: "DevOps Engineer" },
    { name: "Noor Fatima", role: "Content Writer" }
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* CTA Button */}
      <div className="creators-cta">
        <div className="cta-box" onClick={openModal}>
          <span className="cta-text">Creators</span>
          <span className="cta-subtitle">CLICK ME</span>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Website Creators</h2>
              <button className="close-button" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <p className="modal-description">
                Meet the talented team behind this IEEE website
              </p>
              <div className="creators-grid">
                {creators.map((creator, index) => (
                  <div key={index} className="creator-card">
                    <div className="creator-avatar">
                      {creator.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="creator-info">
                      <h3>{creator.name}</h3>
                      <p>{creator.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatorsCTA;