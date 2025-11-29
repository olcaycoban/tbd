import React, { useState, useEffect } from 'react';
import { getNetworkingRecommendations } from '../utils/networkingAlgorithm';
import { networkingKonulari } from '../data/mockData';
import '../styles/NetworkingRecommendations.css';

const NetworkingRecommendations = ({ currentUser, participants, onNext, onBack }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [conversationTopics, setConversationTopics] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Networking önerileri hesapla
    setTimeout(() => {
      const recs = getNetworkingRecommendations(currentUser, participants, 10);
      setRecommendations(recs);
      
      // Kullanıcının ilgi alanlarına göre sohbet konuları öner
      const topics = networkingKonulari
        .filter(topic => {
          return currentUser.ilgiAlanlari.some(interest =>
            topic.toLowerCase().includes(interest.toLowerCase()) ||
            interest.toLowerCase().includes(topic.toLowerCase().split(' ')[0])
          );
        })
        .slice(0, 8);
      
      // Yeterli konu yoksa genel konular ekle
      if (topics.length < 5) {
        const remainingTopics = networkingKonulari
          .filter(t => !topics.includes(t))
          .slice(0, 8 - topics.length);
        topics.push(...remainingTopics);
      }
      
      setConversationTopics(topics);
      setIsLoading(false);
    }, 1500);
  }, [currentUser, participants]);

  if (isLoading) {
    return (
      <div className="recommendations-container">
        <div className="loading-screen">
          <div className="loading-animation">
            <div className="ai-brain">
              <div className="brain-pulse"></div>
              <span className="brain-emoji">🧠</span>
            </div>
          </div>
          <h2>Yapay Zeka Önerileri Hazırlanıyor...</h2>
          <p>Sizin için en uygun networking partnerleri belirleniyor</p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 70) return 'high';
    if (score >= 50) return 'medium';
    return 'low';
  };

  const getScoreLabel = (score) => {
    if (score >= 70) return 'Yüksek Uyum';
    if (score >= 50) return 'Orta Uyum';
    return 'Düşük Uyum';
  };

  return (
    <div className="recommendations-container">
      <div className="recommendations-header">
        <button className="back-button" onClick={onBack}>
          ← Geri
        </button>
        <div className="header-content">
          <h1>💡 Networking Önerileri</h1>
          <p>Sizin için özel olarak hazırlanmış kişiler ve konular</p>
        </div>
      </div>

      <div className="user-preview">
        <div className="preview-content">
          <span className="user-avatar">{currentUser.isim.charAt(0)}</span>
          <div className="user-info">
            <h3>{currentUser.isim}</h3>
            <p>{currentUser.meslek} • {currentUser.kurum}</p>
          </div>
        </div>
      </div>

      <section className="recommendations-section">
        <h2>🎯 Size Önerilen Kişiler</h2>
        <p className="section-description">
          İlgi alanlarınıza, mesleki deneyiminize ve kurumunuza göre en uyumlu {recommendations.length} kişi
        </p>

        <div className="recommendations-grid">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className={`recommendation-card ${getScoreColor(rec.score)}`}
              onClick={() => setSelectedPerson(rec)}
            >
              <div className="card-header">
                <div className="person-rank">#{idx + 1}</div>
                <div className={`score-badge ${getScoreColor(rec.score)}`}>
                  <span className="score-value">{rec.score}</span>
                  <span className="score-max">/100</span>
                </div>
              </div>

              <div className="person-avatar">
                {rec.participant.isim.charAt(0)}
              </div>

              <div className="person-info">
                <h3 className="person-name">{rec.participant.isim}</h3>
                <p className="person-role">{rec.participant.meslek}</p>
                <p className="person-org">{rec.participant.kurum}</p>
                <p className="person-exp">
                  {rec.participant.deneyimYili} yıl deneyim
                </p>
              </div>

              <div className="match-label">
                {getScoreLabel(rec.score)}
              </div>

              {rec.commonInterests.length > 0 && (
                <div className="common-interests-preview">
                  <strong>Ortak İlgi Alanları:</strong>
                  <div className="interests-tags">
                    {rec.commonInterests.slice(0, 2).map((interest, i) => (
                      <span key={i} className="interest-tag">
                        {interest}
                      </span>
                    ))}
                    {rec.commonInterests.length > 2 && (
                      <span className="more-tag">
                        +{rec.commonInterests.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="recommendation-reason">
                <span className="reason-icon">💬</span>
                {rec.reason}
              </div>

              <button className="contact-btn">
                Detayları Gör →
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="topics-section">
        <h2>💬 Önerilen Sohbet Konuları</h2>
        <p className="section-description">
          İlgi alanlarınıza uygun networking konuları
        </p>

        <div className="topics-grid">
          {conversationTopics.map((topic, idx) => (
            <div key={idx} className="topic-card">
              <div className="topic-icon">💡</div>
              <div className="topic-content">
                <h4>{topic}</h4>
                <div className="topic-tags">
                  {currentUser.ilgiAlanlari
                    .filter(interest => 
                      topic.toLowerCase().includes(interest.toLowerCase()) ||
                      interest.toLowerCase().includes(topic.toLowerCase().split(' ')[0])
                    )
                    .slice(0, 2)
                    .map((interest, i) => (
                      <span key={i} className="topic-tag">
                        {interest}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="tips-section">
        <h2>📚 Networking İpuçları</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <span className="tip-icon">🤝</span>
            <h4>İlk İzlenim</h4>
            <p>Kendinden emin, samimi ve pozitif bir tutum sergileyin.</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">👂</span>
            <h4>Aktif Dinleme</h4>
            <p>Konuşmadan çok dinleyin, sorular sorun ve ilgi gösterin.</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">💼</span>
            <h4>Değer Katın</h4>
            <p>Karşınızdakine nasıl yardımcı olabileceğinizi düşünün.</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">📱</span>
            <h4>Takip Edin</h4>
            <p>Etkinlik sonrası LinkedIn üzerinden bağlantı kurun.</p>
          </div>
        </div>
      </section>

      {selectedPerson && (
        <div className="modal-overlay" onClick={() => setSelectedPerson(null)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPerson(null)}>
              ×
            </button>

            <div className="modal-header-section">
              <div className="modal-avatar">
                {selectedPerson.participant.isim.charAt(0)}
              </div>
              <div className="modal-title-section">
                <h2>{selectedPerson.participant.isim}</h2>
                <p className="modal-subtitle">
                  {selectedPerson.participant.meslek}
                </p>
              </div>
              <div className={`modal-score ${getScoreColor(selectedPerson.score)}`}>
                <div className="score-number">{selectedPerson.score}</div>
                <div className="score-text">Uyum Skoru</div>
              </div>
            </div>

            <div className="modal-body-section">
              <div className="info-row">
                <div className="info-item">
                  <strong>Kurum:</strong>
                  <span>{selectedPerson.participant.kurum}</span>
                </div>
                <div className="info-item">
                  <strong>Deneyim:</strong>
                  <span>{selectedPerson.participant.deneyimYili} yıl</span>
                </div>
                <div className="info-item">
                  <strong>E-posta:</strong>
                  <span>{selectedPerson.participant.email}</span>
                </div>
              </div>

              <div className="interests-section">
                <h3>İlgi Alanları</h3>
                <div className="interests-tags">
                  {selectedPerson.participant.ilgiAlanlari.map((interest, i) => (
                    <span
                      key={i}
                      className={`interest-tag ${
                        selectedPerson.commonInterests.includes(interest) ? 'common' : ''
                      }`}
                    >
                      {interest}
                      {selectedPerson.commonInterests.includes(interest) && ' ✓'}
                    </span>
                  ))}
                </div>
              </div>

              {selectedPerson.commonInterests.length > 0 && (
                <div className="common-section highlight">
                  <h3>🎯 Ortak İlgi Alanları ({selectedPerson.commonInterests.length})</h3>
                  <div className="interests-tags">
                    {selectedPerson.commonInterests.map((interest, i) => (
                      <span key={i} className="interest-tag common">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="reason-section">
                <h3>Neden Bu Kişi?</h3>
                <p className="reason-text">{selectedPerson.reason}</p>
              </div>

              <div className="suggestions-section">
                <h3>💬 Önerilen Sohbet Açılışları</h3>
                <ul className="suggestions-list">
                  {selectedPerson.commonInterests.length > 0 && (
                    <li>
                      "{selectedPerson.commonInterests[0]} konusunda ne tür projeler üzerinde çalışıyorsunuz?"
                    </li>
                  )}
                  <li>
                    "{selectedPerson.participant.kurum} bünyesinde dijital dönüşüm süreçleri nasıl ilerliyor?"
                  </li>
                  <li>
                    "{selectedPerson.participant.meslek} olarak en büyük zorluklarınız neler?"
                  </li>
                  {selectedPerson.participant.deneyimYili > currentUser.deneyimYili && (
                    <li>
                      "Sektördeki tecrübenizden yola çıkarak, genç profesyonellere önerileriniz neler?"
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="recommendations-actions">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Önceki
        </button>
        <button className="btn btn-primary" onClick={onNext}>
          Masa Eşleştirmeye Geç →
        </button>
      </div>
    </div>
  );
};

export default NetworkingRecommendations;

