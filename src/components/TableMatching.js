import React, { useState, useEffect } from 'react';
import { createTableMatches } from '../utils/networkingAlgorithm';
import '../styles/TableMatching.css';

const TableMatching = ({ participants, currentUser, onBack, onRestart }) => {
  const [tables, setTables] = useState([]);
  const [isMatching, setIsMatching] = useState(true);
  const [selectedTable, setSelectedTable] = useState(null);
  const [userTable, setUserTable] = useState(null);

  useEffect(() => {
    // Masa eşleştirme algoritması çalıştır
    setTimeout(() => {
      const matchedTables = createTableMatches(participants, 6);
      setTables(matchedTables);
      
      // Kullanıcının masasını bul
      const userTableFound = matchedTables.find(table =>
        table.participants.some(p => p.id === currentUser.id)
      );
      setUserTable(userTableFound);
      setIsMatching(false);
    }, 2500);
  }, [participants, currentUser]);

  if (isMatching) {
    return (
      <div className="table-matching-container">
        <div className="matching-screen">
          <div className="matching-animation">
            <div className="table-grid-anim">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="table-dot" style={{
                  animationDelay: `${i * 0.15}s`
                }}>
                  🪑
                </div>
              ))}
            </div>
          </div>
          <h2>Optimal Masa Düzeni Oluşturuluyor...</h2>
          <p>Tüm katılımcılar için en uyumlu masa eşleşmeleri hesaplanıyor</p>
          <div className="progress-items">
            <div className="progress-item completed">✓ Katılımcı profilleri analiz edildi</div>
            <div className="progress-item completed">✓ Uyumluluk matrisi oluşturuldu</div>
            <div className="progress-item active">⏳ Optimal masa grupları belirleniyor</div>
            <div className="progress-item">Masa önerileri hazırlanıyor</div>
          </div>
        </div>
      </div>
    );
  }

  const getTableColor = (avgCompatibility) => {
    if (avgCompatibility >= 65) return 'excellent';
    if (avgCompatibility >= 50) return 'good';
    return 'average';
  };

  return (
    <div className="table-matching-container">
      <div className="matching-header">
        <button className="back-button" onClick={onBack}>
          ← Geri
        </button>
        <div className="header-content">
          <h1>🪑 Masa Eşleştirme</h1>
          <p>AI destekli optimal oturma düzeni</p>
        </div>
      </div>

      {userTable && (
        <div className="your-table-section">
          <div className="section-badge">Sizin Masanız</div>
          <div className={`your-table-card ${getTableColor(userTable.avgCompatibility)}`}>
            <div className="table-header-info">
              <div className="table-id">
                <span className="table-icon">🪑</span>
                <span className="table-number">Masa {userTable.id}</span>
              </div>
              <div className="table-score">
                <div className="score-value">{userTable.avgCompatibility}</div>
                <div className="score-label">Uyumluluk</div>
              </div>
            </div>

            <div className="table-participants-list">
              {userTable.participants.map((participant, idx) => (
                <div
                  key={idx}
                  className={`participant-item ${participant.id === currentUser.id ? 'current-user' : ''}`}
                >
                  <div className="participant-avatar">
                    {participant.isim.charAt(0)}
                  </div>
                  <div className="participant-details">
                    <div className="participant-name">
                      {participant.isim}
                      {participant.id === currentUser.id && (
                        <span className="you-badge">Siz</span>
                      )}
                    </div>
                    <div className="participant-role">{participant.meslek}</div>
                    <div className="participant-org">{participant.kurum}</div>
                  </div>
                  <div className="participant-interests-mini">
                    {participant.ilgiAlanlari.slice(0, 2).map((interest, i) => (
                      <span key={i} className="interest-mini" title={interest}>
                        {interest.substring(0, 15)}...
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="table-insights">
              <h4>🎯 Masa İçgörüleri</h4>
              <div className="insights-grid">
                <div className="insight-item">
                  <strong>{userTable.participants.length}</strong>
                  <span>Kişi</span>
                </div>
                <div className="insight-item">
                  <strong>
                    {new Set(userTable.participants.map(p => p.kurum)).size}
                  </strong>
                  <span>Farklı Kurum</span>
                </div>
                <div className="insight-item">
                  <strong>
                    {Math.round(
                      userTable.participants.reduce((sum, p) => sum + p.deneyimYili, 0) /
                      userTable.participants.length
                    )}
                  </strong>
                  <span>Ort. Deneyim</span>
                </div>
                <div className="insight-item">
                  <strong>
                    {getCommonInterestsCount(userTable.participants)}
                  </strong>
                  <span>Ortak İlgi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="all-tables-section">
        <h2>Tüm Masa Düzeni</h2>
        <p className="section-description">
          {tables.length} masa, {participants.length} katılımcı için optimize edildi
        </p>

        <div className="tables-grid">
          {tables.map((table) => (
            <div
              key={table.id}
              className={`table-card ${getTableColor(table.avgCompatibility)} ${
                userTable && table.id === userTable.id ? 'user-table' : ''
              }`}
              onClick={() => setSelectedTable(table)}
            >
              <div className="table-card-header">
                <div className="table-number">
                  Masa {table.id}
                  {userTable && table.id === userTable.id && (
                    <span className="user-indicator">★</span>
                  )}
                </div>
                <div className="table-compatibility">
                  <span className="compat-score">{table.avgCompatibility}</span>
                  <span className="compat-label">uyum</span>
                </div>
              </div>

              <div className="table-members-preview">
                <div className="avatars-stack">
                  {table.participants.slice(0, 4).map((participant, idx) => (
                    <div
                      key={idx}
                      className="avatar-mini"
                      style={{ zIndex: 4 - idx }}
                      title={participant.isim}
                    >
                      {participant.isim.charAt(0)}
                    </div>
                  ))}
                  {table.participants.length > 4 && (
                    <div className="avatar-mini more" style={{ zIndex: 0 }}>
                      +{table.participants.length - 4}
                    </div>
                  )}
                </div>
                <div className="member-count">
                  {table.participants.length} kişi
                </div>
              </div>

              <div className="table-stats-mini">
                <span>{new Set(table.participants.map(p => p.kurum)).size} kurum</span>
                <span>•</span>
                <span>{getCommonInterestsCount(table.participants)} ortak ilgi</span>
              </div>

              <button className="view-details-btn">Detayları Gör</button>
            </div>
          ))}
        </div>
      </div>

      {selectedTable && (
        <div className="modal-overlay" onClick={() => setSelectedTable(null)}>
          <div className="modal-content xlarge" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedTable(null)}>
              ×
            </button>

            <div className="modal-table-header">
              <div className="modal-table-title">
                <span className="modal-table-icon">🪑</span>
                <div>
                  <h2>Masa {selectedTable.id}</h2>
                  <p>{selectedTable.participants.length} Katılımcı</p>
                </div>
              </div>
              <div className={`modal-compatibility-badge ${getTableColor(selectedTable.avgCompatibility)}`}>
                <div className="badge-score">{selectedTable.avgCompatibility}</div>
                <div className="badge-label">Uyumluluk Skoru</div>
              </div>
            </div>

            <div className="modal-table-body">
              <div className="participants-detail-list">
                {selectedTable.participants.map((participant, idx) => (
                  <div key={idx} className="participant-detail-card">
                    <div className="participant-number">{idx + 1}</div>
                    <div className="participant-avatar-large">
                      {participant.isim.charAt(0)}
                    </div>
                    <div className="participant-info-detail">
                      <h4>{participant.isim}</h4>
                      <p className="p-role">{participant.meslek}</p>
                      <p className="p-org">{participant.kurum}</p>
                      <p className="p-exp">{participant.deneyimYili} yıl deneyim</p>
                      <div className="p-interests">
                        {participant.ilgiAlanlari.map((interest, i) => (
                          <span key={i} className="interest-tag-small">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="table-analysis">
                <h3>📊 Masa Analizi</h3>
                <div className="analysis-stats">
                  <div className="analysis-stat">
                    <span className="stat-icon">👥</span>
                    <span className="stat-value">{selectedTable.participants.length}</span>
                    <span className="stat-label">Katılımcı</span>
                  </div>
                  <div className="analysis-stat">
                    <span className="stat-icon">🏛️</span>
                    <span className="stat-value">
                      {new Set(selectedTable.participants.map(p => p.kurum)).size}
                    </span>
                    <span className="stat-label">Farklı Kurum</span>
                  </div>
                  <div className="analysis-stat">
                    <span className="stat-icon">⭐</span>
                    <span className="stat-value">
                      {Math.round(
                        selectedTable.participants.reduce((sum, p) => sum + p.deneyimYili, 0) /
                        selectedTable.participants.length
                      )}
                    </span>
                    <span className="stat-label">Ort. Deneyim</span>
                  </div>
                  <div className="analysis-stat">
                    <span className="stat-icon">🎯</span>
                    <span className="stat-value">
                      {getCommonInterestsCount(selectedTable.participants)}
                    </span>
                    <span className="stat-label">Ortak İlgi</span>
                  </div>
                </div>

                <div className="common-interests-section">
                  <h4>Ortak İlgi Alanları</h4>
                  <div className="common-interests-list">
                    {getTableCommonInterests(selectedTable.participants).map((interest, i) => (
                      <div key={i} className="common-interest-item">
                        <span className="interest-name">{interest.name}</span>
                        <span className="interest-count">{interest.count} kişi</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="completion-section">
        <div className="completion-card">
          <div className="completion-icon">✓</div>
          <h2>Süreç Tamamlandı!</h2>
          <p>
            Tüm katılımcılar için optimal masa eşleşmeleri oluşturuldu. 
            Etkinlik günü masanızı kolayca bulabilirsiniz.
          </p>
          <div className="completion-stats">
            <div className="comp-stat">
              <strong>{tables.length}</strong>
              <span>Masa Oluşturuldu</span>
            </div>
            <div className="comp-stat">
              <strong>{participants.length}</strong>
              <span>Katılımcı Eşleştirildi</span>
            </div>
            <div className="comp-stat">
              <strong>
                {Math.round(
                  tables.reduce((sum, t) => sum + t.avgCompatibility, 0) / tables.length
                )}
              </strong>
              <span>Ortalama Uyumluluk</span>
            </div>
          </div>
        </div>
      </div>

      <div className="matching-actions">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Önceki
        </button>
        <button className="btn btn-primary" onClick={onRestart}>
          🏠 Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
};

// Yardımcı fonksiyonlar
function getCommonInterestsCount(participants) {
  const interestCount = {};
  participants.forEach(p => {
    p.ilgiAlanlari.forEach(interest => {
      interestCount[interest] = (interestCount[interest] || 0) + 1;
    });
  });
  
  return Object.values(interestCount).filter(count => count >= 2).length;
}

function getTableCommonInterests(participants) {
  const interestCount = {};
  participants.forEach(p => {
    p.ilgiAlanlari.forEach(interest => {
      interestCount[interest] = (interestCount[interest] || 0) + 1;
    });
  });
  
  return Object.entries(interestCount)
    .filter(([_, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
}

export default TableMatching;

