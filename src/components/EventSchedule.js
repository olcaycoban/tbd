import React, { useState } from 'react';
import { etkinlikProgrami } from '../data/mockData';
import '../styles/EventSchedule.css';

const EventSchedule = ({ onNext, onBack }) => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [registeredActivities, setRegisteredActivities] = useState([]);

  const handleRegister = (activityId) => {
    if (registeredActivities.includes(activityId)) {
      setRegisteredActivities(registeredActivities.filter(id => id !== activityId));
    } else {
      setRegisteredActivities([...registeredActivities, activityId]);
    }
  };

  const networkingActivities = etkinlikProgrami.filter(
    a => a.aktivite.toLowerCase().includes('networking') ||
         a.aktivite.toLowerCase().includes('masa') ||
         a.aktivite.toLowerCase().includes('yemek')
  );

  return (
    <div className="event-schedule-container">
      <div className="schedule-header">
        <button className="back-button" onClick={onBack}>
          ← Geri
        </button>
        <div className="header-content">
          <h1>📅 Etkinlik Programı</h1>
          <p>Kamu Bilişim Etkinliği - Zaman Planı</p>
        </div>
      </div>

      <div className="schedule-info">
        <div className="info-card">
          <span className="info-icon">📍</span>
          <div className="info-content">
            <strong>Lokasyon</strong>
            <p>Ankara Kongre Merkezi</p>
          </div>
        </div>
        <div className="info-card">
          <span className="info-icon">📆</span>
          <div className="info-content">
            <strong>Tarih</strong>
            <p>15 Aralık 2025</p>
          </div>
        </div>
        <div className="info-card">
          <span className="info-icon">⏱️</span>
          <div className="info-content">
            <strong>Süre</strong>
            <p>09:00 - 16:30 (7.5 saat)</p>
          </div>
        </div>
        <div className="info-card highlight">
          <span className="info-icon">🤝</span>
          <div className="info-content">
            <strong>Networking Seansları</strong>
            <p>{networkingActivities.length} aktivite</p>
          </div>
        </div>
      </div>

      <div className="timeline-container">
        <div className="timeline">
          {etkinlikProgrami.map((activity, index) => {
            const isNetworking = networkingActivities.some(a => a.id === activity.id);
            const isRegistered = registeredActivities.includes(activity.id);
            
            return (
              <div
                key={activity.id}
                className={`timeline-item ${isNetworking ? 'networking' : ''} ${isRegistered ? 'registered' : ''}`}
                onClick={() => setSelectedActivity(activity)}
              >
                <div className="timeline-marker">
                  <div className="marker-dot"></div>
                  {index < etkinlikProgrami.length - 1 && (
                    <div className="marker-line"></div>
                  )}
                </div>
                
                <div className="timeline-content">
                  <div className="activity-time">{activity.saat}</div>
                  <div className="activity-title">
                    {activity.aktivite}
                    {isNetworking && <span className="networking-badge">🤝 Networking</span>}
                  </div>
                  <div className="activity-description">{activity.aciklama}</div>
                  
                  {isNetworking && (
                    <button
                      className={`register-btn ${isRegistered ? 'registered' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRegister(activity.id);
                      }}
                    >
                      {isRegistered ? '✓ Kayıtlı' : '+ Katıl'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedActivity && (
        <div className="modal-overlay" onClick={() => setSelectedActivity(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedActivity(null)}>
              ×
            </button>
            
            <div className="modal-header">
              <h2>{selectedActivity.aktivite}</h2>
              <div className="modal-time">{selectedActivity.saat}</div>
            </div>
            
            <div className="modal-body">
              <p className="modal-description">{selectedActivity.aciklama}</p>
              
              {networkingActivities.some(a => a.id === selectedActivity.id) && (
                <div className="networking-info">
                  <h3>🤝 Networking Fırsatı</h3>
                  <p>
                    Bu aktivite sırasında, sistemimizin önerdiği kişilerle tanışma 
                    fırsatı bulacaksınız. Masa eşleştirmemiz, ortak ilgi alanlarınıza 
                    göre optimize edilmiştir.
                  </p>
                  
                  <div className="networking-tips">
                    <h4>💡 İpuçları:</h4>
                    <ul>
                      <li>Masanızdaki herkesle göz teması kurun</li>
                      <li>Ortak projeler hakkında konuşun</li>
                      <li>LinkedIn bağlantısı kurmayı unutmayın</li>
                      <li>Kartvizit değişimi yapın</li>
                    </ul>
                  </div>
                </div>
              )}

              {selectedActivity.id === 7 && (
                <div className="workshop-info">
                  <h3>Atölye Seçenekleri</h3>
                  <div className="workshop-options">
                    <div className="workshop-option">
                      <strong>Salon A:</strong> Yapay Zeka ve Makine Öğrenmesi
                    </div>
                    <div className="workshop-option">
                      <strong>Salon B:</strong> Cloud Computing ve Güvenlik
                    </div>
                    <div className="workshop-option">
                      <strong>Salon C:</strong> DevOps Best Practices
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {networkingActivities.some(a => a.id === selectedActivity.id) && (
              <div className="modal-actions">
                <button
                  className={`btn ${registeredActivities.includes(selectedActivity.id) ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={() => handleRegister(selectedActivity.id)}
                >
                  {registeredActivities.includes(selectedActivity.id) 
                    ? '✓ Kayıtlı - İptal Et' 
                    : '+ Katıl'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="schedule-summary">
        <h3>📝 Özet</h3>
        <div className="summary-stats">
          <div className="summary-item">
            <strong>{etkinlikProgrami.length}</strong>
            <span>Toplam Aktivite</span>
          </div>
          <div className="summary-item">
            <strong>{networkingActivities.length}</strong>
            <span>Networking Seansı</span>
          </div>
          <div className="summary-item">
            <strong>{registeredActivities.length}</strong>
            <span>Kayıtlı Olduğunuz</span>
          </div>
        </div>
      </div>

      <div className="schedule-actions">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Önceki
        </button>
        <button className="btn btn-primary" onClick={onNext}>
          Networking Önerilerine Geç →
        </button>
      </div>
    </div>
  );
};

export default EventSchedule;

