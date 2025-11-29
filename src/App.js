import React, { useState } from 'react';
import './App.css';
import ParticipantForm from './components/ParticipantForm';
import Dashboard from './components/Dashboard';
import NetworkAnalysis from './components/NetworkAnalysis';
import EventSchedule from './components/EventSchedule';
import NetworkingRecommendations from './components/NetworkingRecommendations';
import TableMatching from './components/TableMatching';
import { generateMockParticipants } from './data/mockData';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [participants, setParticipants] = useState(generateMockParticipants(50));
  const [currentUser, setCurrentUser] = useState(null);

  const steps = [
    { id: 0, name: 'Giriş', component: 'welcome' },
    { id: 1, name: 'Katılımcı Kaydı', component: 'form' },
    { id: 2, name: 'Dashboard', component: 'dashboard' },
    { id: 3, name: 'Network Analizi', component: 'network' },
    { id: 4, name: 'Etkinlik Programı', component: 'schedule' },
    { id: 5, name: 'Networking Önerileri', component: 'recommendations' },
    { id: 6, name: 'Masa Eşleştirme', component: 'tables' }
  ];

  const handleParticipantSubmit = (participant) => {
    const newParticipant = {
      ...participant,
      id: participants.length + 1
    };
    setParticipants([...participants, newParticipant]);
    setCurrentUser(newParticipant);
    setCurrentStep(2);
  };

  const handleUseMockData = () => {
    const mockUser = participants[0];
    setCurrentUser(mockUser);
    setCurrentStep(2);
  };

  const renderContent = () => {
    switch (steps[currentStep].component) {
      case 'welcome':
        return (
          <div className="welcome-screen">
            <div className="welcome-card">
              <div className="logo-section">
                <div className="logo-circle">
                  <span className="logo-text">TBD</span>
                </div>
                <h1 className="app-title">TBD Networking Platform</h1>
                <p className="app-subtitle">Kamu Bilişim Etkinliği</p>
              </div>
              
              <div className="welcome-content">
                <h2>Akıllı Networking Sistemi</h2>
                <p className="description">
                  Yapay zeka destekli algoritmamız, ilgi alanlarınıza, mesleki deneyiminize 
                  ve kurumunuza göre en uyumlu katılımcıları bulur ve size önerir.
                </p>
                
                <div className="features-grid">
                  <div className="feature-item">
                    <span className="feature-icon">🎯</span>
                    <h3>Akıllı Eşleştirme</h3>
                    <p>İlgi alanlarınıza göre ideal networking partnerleri</p>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🔍</span>
                    <h3>Profil Analizi</h3>
                    <p>Kapsamlı katılımcı profil değerlendirmesi</p>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">📊</span>
                    <h3>Network Analizi</h3>
                    <p>Katılımcılar arası korelasyon tespiti</p>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🪑</span>
                    <h3>Masa Organizasyonu</h3>
                    <p>Optimize edilmiş oturma düzeni</p>
                  </div>
                </div>

                <div className="action-buttons">
                  <button 
                    className="btn btn-primary"
                    onClick={() => setCurrentStep(1)}
                  >
                    Yeni Katılımcı Kaydı
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={handleUseMockData}
                  >
                    Demo ile Devam Et
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'form':
        return (
          <ParticipantForm 
            onSubmit={handleParticipantSubmit}
            onBack={() => setCurrentStep(0)}
          />
        );

      case 'dashboard':
        return (
          <Dashboard 
            currentUser={currentUser}
            participants={participants}
            onNext={() => setCurrentStep(3)}
          />
        );

      case 'network':
        return (
          <NetworkAnalysis 
            participants={participants}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        );

      case 'schedule':
        return (
          <EventSchedule 
            onNext={() => setCurrentStep(5)}
            onBack={() => setCurrentStep(3)}
          />
        );

      case 'recommendations':
        return (
          <NetworkingRecommendations 
            currentUser={currentUser}
            participants={participants}
            onNext={() => setCurrentStep(6)}
            onBack={() => setCurrentStep(4)}
          />
        );

      case 'tables':
        return (
          <TableMatching 
            participants={participants}
            currentUser={currentUser}
            onBack={() => setCurrentStep(5)}
            onRestart={() => setCurrentStep(0)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="App">
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
