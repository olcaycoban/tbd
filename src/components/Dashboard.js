import React from 'react';
import { simulateGoogleSearch, getNetworkingRecommendations } from '../utils/networkingAlgorithm';
import '../styles/Dashboard.css';

const Dashboard = ({ currentUser, participants, onNext, onViewRecommendations }) => {
  const enrichedProfile = simulateGoogleSearch(currentUser);
  
  // Kullanıcıya özel öneriler
  const recommendations = getNetworkingRecommendations(currentUser, participants, 6);

  const stats = {
    totalParticipants: participants.length,
    totalInstitutions: new Set(participants.map(p => p.kurum)).size,
    avgExperience: Math.round(
      participants.reduce((sum, p) => sum + p.deneyimYili, 0) / participants.length
    ),
    topInterests: getTopInterests(participants)
  };

  function getTopInterests(participants) {
    const interestCount = {};
    participants.forEach(p => {
      p.ilgiAlanlari.forEach(interest => {
        interestCount[interest] = (interestCount[interest] || 0) + 1;
      });
    });
    
    return Object.entries(interestCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([interest, count]) => ({ interest, count }));
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Hoş Geldiniz, {currentUser.isim}!</h1>
        <p className="subtitle">Kamu Bilişim Etkinliği Dashboard</p>
      </div>

      <div className="dashboard-grid">
        {/* Kullanıcı Profili */}
        <div className="dashboard-card user-profile">
          <h2>👤 Profiliniz</h2>
          <div className="profile-details">
            <div className="profile-item">
              <span className="label">Meslek:</span>
              <span className="value">{currentUser.meslek}</span>
            </div>
            <div className="profile-item">
              <span className="label">Kurum:</span>
              <span className="value">{currentUser.kurum}</span>
            </div>
            <div className="profile-item">
              <span className="label">Deneyim:</span>
              <span className="value">{currentUser.deneyimYili} yıl</span>
            </div>
            <div className="profile-item">
              <span className="label">E-posta:</span>
              <span className="value">{currentUser.email}</span>
            </div>
          </div>

          <div className="profile-interests">
            <strong>İlgi Alanlarınız:</strong>
            <div className="interest-tags">
              {currentUser.ilgiAlanlari.map((interest, idx) => (
                <span key={idx} className="interest-tag">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="profile-score">
            <div className="score-item">
              <span className="score-value">{enrichedProfile.publications}</span>
              <span className="score-label">Yayın</span>
            </div>
            <div className="score-item">
              <span className="score-value">{enrichedProfile.conferences}</span>
              <span className="score-label">Konferans</span>
            </div>
            <div className="score-item">
              <span className="score-value">{enrichedProfile.socialScore}</span>
              <span className="score-label">Sosyal Skor</span>
            </div>
          </div>
        </div>

        {/* Etkinlik İstatistikleri */}
        <div className="dashboard-card event-stats">
          <h2>📊 Etkinlik İstatistikleri</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <div className="stat-value">{stats.totalParticipants}</div>
                <div className="stat-label">Toplam Katılımcı</div>
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-icon">🏛️</div>
              <div className="stat-content">
                <div className="stat-value">{stats.totalInstitutions}</div>
                <div className="stat-label">Farklı Kurum</div>
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <div className="stat-value">{stats.avgExperience}</div>
                <div className="stat-label">Ort. Deneyim (Yıl)</div>
              </div>
            </div>
          </div>
        </div>

        {/* En Popüler İlgi Alanları */}
        <div className="dashboard-card top-interests">
          <h2>🔥 En Popüler İlgi Alanları</h2>
          <div className="interests-list">
            {stats.topInterests.map((item, idx) => (
              <div key={idx} className="interest-row">
                <div className="interest-rank">{idx + 1}</div>
                <div className="interest-info">
                  <div className="interest-name">{item.interest}</div>
                  <div className="interest-bar">
                    <div
                      className="interest-fill"
                      style={{
                        width: `${(item.count / stats.totalParticipants) * 100}%`
                      }}
                    />
                  </div>
                </div>
                <div className="interest-count">{item.count} kişi</div>
              </div>
            ))}
          </div>
        </div>

        {/* Size Özel Eşleşmeler */}
        <div className="dashboard-card recommended-matches">
          <h2>🤝 Sizin İçin Önerilen Eşleşmeler</h2>
          <p className="section-desc">İlgi alanlarınıza göre en uyumlu katılımcılar</p>
          <div className="matches-grid">
            {recommendations.slice(0, 3).map((rec, idx) => (
              <div key={idx} className="match-card">
                <div className="match-score-badge">
                  {rec.score}
                </div>
                <div className="match-avatar">
                  {rec.participant.isim.charAt(0)}
                </div>
                <h4>{rec.participant.isim}</h4>
                <p className="match-role">{rec.participant.meslek}</p>
                <p className="match-org">{rec.participant.kurum}</p>
                {rec.commonInterests.length > 0 && (
                  <div className="match-common">
                    <strong>Ortak:</strong>
                    <div className="match-tags">
                      {rec.commonInterests.slice(0, 2).map((interest, i) => (
                        <span key={i} className="match-tag">{interest}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="btn-see-all" onClick={onViewRecommendations}>
            Tüm Önerileri Gör ({recommendations.length} kişi)
          </button>
        </div>

        {/* Kişiselleştirilmiş Öneriler */}
        <div className="dashboard-card personalized-tips">
          <h2>💡 Sizin İçin Öneriler</h2>
          <div className="tips-list">
            <div className="tip-item">
              <span className="tip-icon">🎯</span>
              <div className="tip-text">
                <strong>{recommendations[0]?.participant.isim}</strong> ile ortak ilgi alanınız: <strong>{recommendations[0]?.commonInterests[0]}</strong>
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon">🏛️</span>
              <div className="tip-text">
                <strong>{stats.totalInstitutions}</strong> farklı kurumdan katılımcı var. Farklı deneyimler öğrenin!
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon">📊</span>
              <div className="tip-text">
                Deneyim seviyeniz (<strong>{currentUser.deneyimYili} yıl</strong>) ortalama üzerinde. Mentorluk fırsatları değerlendirin!
              </div>
            </div>
          </div>
        </div>

        {/* Hızlı Erişim */}
        <div className="dashboard-card quick-access">
          <h2>🚀 Hızlı Erişim</h2>
          <div className="quick-links">
            <button className="quick-link-btn network" onClick={onNext}>
              <span className="link-icon">🔗</span>
              <span className="link-text">Network Analizi</span>
            </button>
            <button className="quick-link-btn schedule" onClick={onNext}>
              <span className="link-icon">📅</span>
              <span className="link-text">Etkinlik Programı</span>
            </button>
            <button className="quick-link-btn recommendations" onClick={onNext}>
              <span className="link-icon">💡</span>
              <span className="link-text">Networking Önerileri</span>
            </button>
            <button className="quick-link-btn tables" onClick={onNext}>
              <span className="link-icon">🪑</span>
              <span className="link-text">Masa Eşleştirme</span>
            </button>
          </div>
        </div>

        {/* Günün Tavsiyesi */}
        <div className="dashboard-card daily-tip">
          <h2>💬 Networking İpucu</h2>
          <div className="tip-content">
            <p>
              "{getRandomTip()}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function getRandomTip() {
  const tips = [
    "Ortak ilgi alanlarınız olan kişilerle sohbete başlamak networking'in anahtarıdır.",
    "Farklı kurumlardan kişilerle deneyim paylaşımı yapmayı unutmayın.",
    "LinkedIn bağlantısı kurmak için kartvizit değişimi yapmayı ihmal etmeyin.",
    "Aktif dinleyici olmak, iyi bir networker olmanın temel kuralıdır.",
    "Toplantı sonrasında takip e-postası göndermek profesyonel bir davranıştır."
  ];
  return tips[Math.floor(Math.random() * tips.length)];
}

export default Dashboard;

