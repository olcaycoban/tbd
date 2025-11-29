import React, { useState, useEffect } from 'react';
import { analyzeNetwork } from '../utils/networkingAlgorithm';
import '../styles/NetworkAnalysis.css';

const NetworkAnalysis = ({ participants, onNext, onBack }) => {
  const [connections, setConnections] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedConnection, setSelectedConnection] = useState(null);

  useEffect(() => {
    // Network analizi simülasyonu
    setTimeout(() => {
      const results = analyzeNetwork(participants);
      setConnections(results);
      setIsAnalyzing(false);
    }, 2000);
  }, [participants]);

  const getFilteredConnections = () => {
    switch (filter) {
      case 'high':
        return connections.filter(c => c.score >= 70);
      case 'medium':
        return connections.filter(c => c.score >= 50 && c.score < 70);
      case 'low':
        return connections.filter(c => c.score < 50);
      default:
        return connections;
    }
  };

  const filteredConnections = getFilteredConnections();

  const stats = {
    total: connections.length,
    high: connections.filter(c => c.score >= 70).length,
    medium: connections.filter(c => c.score >= 50 && c.score < 70).length,
    low: connections.filter(c => c.score < 50).length,
    avgScore: connections.length > 0
      ? Math.round(connections.reduce((sum, c) => sum + c.score, 0) / connections.length)
      : 0
  };

  if (isAnalyzing) {
    return (
      <div className="network-analysis-container">
        <div className="analyzing-screen">
          <div className="analyzing-animation">
            <div className="network-nodes">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="node" style={{
                  animationDelay: `${i * 0.1}s`
                }} />
              ))}
            </div>
          </div>
          <h2>Network Analizi Yapılıyor...</h2>
          <p>Katılımcılar arası korelasyonlar hesaplanıyor</p>
          <div className="progress-steps">
            <div className="step completed">✓ Profil verileri işleniyor</div>
            <div className="step completed">✓ İlgi alanları karşılaştırılıyor</div>
            <div className="step active">⏳ Uyumluluk skorları hesaplanıyor</div>
            <div className="step">Bağlantılar oluşturuluyor</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="network-analysis-container">
      <div className="analysis-header">
        <button className="back-button" onClick={onBack}>
          ← Geri
        </button>
        <div className="header-content">
          <h1>🔗 Network Analizi</h1>
          <p>Katılımcılar arası korelasyon ve uyumluluk tespiti</p>
        </div>
      </div>

      <div className="analysis-stats">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Toplam Bağlantı</div>
        </div>
        <div className="stat-card high">
          <div className="stat-value">{stats.high}</div>
          <div className="stat-label">Yüksek Uyum (&ge;70)</div>
        </div>
        <div className="stat-card medium">
          <div className="stat-value">{stats.medium}</div>
          <div className="stat-label">Orta Uyum (50-69)</div>
        </div>
        <div className="stat-card low">
          <div className="stat-value">{stats.low}</div>
          <div className="stat-label">Düşük Uyum (&lt;50)</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.avgScore}</div>
          <div className="stat-label">Ortalama Skor</div>
        </div>
      </div>

      <div className="filter-section">
        <label>Filtre:</label>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tümü ({stats.total})
          </button>
          <button
            className={`filter-btn ${filter === 'high' ? 'active' : ''}`}
            onClick={() => setFilter('high')}
          >
            Yüksek ({stats.high})
          </button>
          <button
            className={`filter-btn ${filter === 'medium' ? 'active' : ''}`}
            onClick={() => setFilter('medium')}
          >
            Orta ({stats.medium})
          </button>
          <button
            className={`filter-btn ${filter === 'low' ? 'active' : ''}`}
            onClick={() => setFilter('low')}
          >
            Düşük ({stats.low})
          </button>
        </div>
      </div>

      <div className="connections-grid">
        {filteredConnections.slice(0, 20).map((connection, idx) => (
          <div
            key={idx}
            className={`connection-card ${connection.score >= 70 ? 'high-match' : connection.score >= 50 ? 'medium-match' : 'low-match'}`}
            onClick={() => setSelectedConnection(connection)}
          >
            <div className="connection-header">
              <div className="connection-score">
                <div className="score-circle">
                  {connection.score}
                </div>
                <span className="score-label">Uyum</span>
              </div>
            </div>
            
            <div className="participant-info">
              <div className="participant">
                <div className="participant-name">{connection.participant1.isim}</div>
                <div className="participant-role">{connection.participant1.meslek}</div>
                <div className="participant-org">{connection.participant1.kurum}</div>
              </div>
              
              <div className="connection-line">
                <div className="connection-dots">⟷</div>
              </div>
              
              <div className="participant">
                <div className="participant-name">{connection.participant2.isim}</div>
                <div className="participant-role">{connection.participant2.meslek}</div>
                <div className="participant-org">{connection.participant2.kurum}</div>
              </div>
            </div>

            {connection.commonInterests.length > 0 && (
              <div className="common-interests">
                <strong>Ortak İlgi Alanları:</strong>
                <div className="interest-tags-small">
                  {connection.commonInterests.slice(0, 2).map((interest, i) => (
                    <span key={i} className="interest-tag-small">
                      {interest}
                    </span>
                  ))}
                  {connection.commonInterests.length > 2 && (
                    <span className="more-tag">
                      +{connection.commonInterests.length - 2}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredConnections.length > 20 && (
        <div className="more-results">
          Ve {filteredConnections.length - 20} bağlantı daha...
        </div>
      )}

      {selectedConnection && (
        <div className="modal-overlay" onClick={() => setSelectedConnection(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedConnection(null)}>
              ×
            </button>
            <h2>Bağlantı Detayları</h2>
            
            <div className="modal-score">
              <div className="score-big">{selectedConnection.score}</div>
              <div className="score-label-big">Uyumluluk Skoru</div>
            </div>

            <div className="modal-participants">
              <div className="modal-participant">
                <h3>{selectedConnection.participant1.isim}</h3>
                <p><strong>Meslek:</strong> {selectedConnection.participant1.meslek}</p>
                <p><strong>Kurum:</strong> {selectedConnection.participant1.kurum}</p>
                <p><strong>Deneyim:</strong> {selectedConnection.participant1.deneyimYili} yıl</p>
                <div className="modal-interests">
                  <strong>İlgi Alanları:</strong>
                  <div className="interest-tags">
                    {selectedConnection.participant1.ilgiAlanlari.map((interest, i) => (
                      <span key={i} className="interest-tag">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-participant">
                <h3>{selectedConnection.participant2.isim}</h3>
                <p><strong>Meslek:</strong> {selectedConnection.participant2.meslek}</p>
                <p><strong>Kurum:</strong> {selectedConnection.participant2.kurum}</p>
                <p><strong>Deneyim:</strong> {selectedConnection.participant2.deneyimYili} yıl</p>
                <div className="modal-interests">
                  <strong>İlgi Alanları:</strong>
                  <div className="interest-tags">
                    {selectedConnection.participant2.ilgiAlanlari.map((interest, i) => (
                      <span key={i} className="interest-tag">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {selectedConnection.commonInterests.length > 0 && (
              <div className="modal-common">
                <h3>Ortak İlgi Alanları ({selectedConnection.commonInterests.length})</h3>
                <div className="interest-tags">
                  {selectedConnection.commonInterests.map((interest, i) => (
                    <span key={i} className="interest-tag highlight">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="analysis-actions">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Önceki
        </button>
        <button className="btn btn-primary" onClick={onNext}>
          Etkinlik Programına Geç →
        </button>
      </div>
    </div>
  );
};

export default NetworkAnalysis;

