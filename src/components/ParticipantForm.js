import React, { useState } from 'react';
import { kamuKurumlari, bilisimMeslekleri, ilgiAlanlari } from '../data/mockData';
import { simulateGoogleSearch } from '../utils/networkingAlgorithm';
import '../styles/ParticipantForm.css';

const ParticipantForm = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    isim: '',
    meslek: '',
    kurum: '',
    ilgiAlanlari: [],
    deneyimYili: '',
    email: '',
    telefon: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleInterestToggle = (interest) => {
    const currentInterests = formData.ilgiAlanlari;
    if (currentInterests.includes(interest)) {
      setFormData({
        ...formData,
        ilgiAlanlari: currentInterests.filter(i => i !== interest)
      });
    } else {
      setFormData({
        ...formData,
        ilgiAlanlari: [...currentInterests, interest]
      });
    }
  };

  const handleGoogleSearch = () => {
    setIsSearching(true);
    // Google Search API simülasyonu
    setTimeout(() => {
      const results = simulateGoogleSearch(formData);
      setSearchResults(results);
      setIsSearching(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.isim && formData.email;
      case 2:
        return formData.meslek && formData.kurum && formData.deneyimYili;
      case 3:
        return formData.ilgiAlanlari.length > 0;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <h2>Kişisel Bilgiler</h2>
            <p className="step-description">Lütfen ad soyad ve iletişim bilgilerinizi girin</p>
            
            <div className="form-group">
              <label>Ad Soyad *</label>
              <input
                type="text"
                name="isim"
                value={formData.isim}
                onChange={handleInputChange}
                placeholder="Örn: Ahmet Yılmaz"
                required
              />
            </div>

            <div className="form-group">
              <label>E-posta *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="ornek@kurum.gov.tr"
                required
              />
            </div>

            <div className="form-group">
              <label>Telefon</label>
              <input
                type="tel"
                name="telefon"
                value={formData.telefon}
                onChange={handleInputChange}
                placeholder="+90 5XX XXX XX XX"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-step">
            <h2>Mesleki Bilgiler</h2>
            <p className="step-description">Mesleğiniz, kurumunuz ve deneyiminiz</p>
            
            <div className="form-group">
              <label>Meslek *</label>
              <select
                name="meslek"
                value={formData.meslek}
                onChange={handleInputChange}
                required
              >
                <option value="">Mesleğinizi Seçin</option>
                {bilisimMeslekleri.map((meslek) => (
                  <option key={meslek} value={meslek}>
                    {meslek}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Kurum *</label>
              <select
                name="kurum"
                value={formData.kurum}
                onChange={handleInputChange}
                required
              >
                <option value="">Kurumunuzu Seçin</option>
                {kamuKurumlari.map((kurum) => (
                  <option key={kurum} value={kurum}>
                    {kurum}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Deneyim (Yıl) *</label>
              <input
                type="number"
                name="deneyimYili"
                value={formData.deneyimYili}
                onChange={handleInputChange}
                min="0"
                max="50"
                placeholder="Örn: 5"
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step">
            <h2>İlgi Alanları</h2>
            <p className="step-description">
              En az bir ilgi alanı seçin (birden fazla seçebilirsiniz)
            </p>
            
            <div className="interests-grid">
              {ilgiAlanlari.map((interest) => (
                <div
                  key={interest}
                  className={`interest-card ${
                    formData.ilgiAlanlari.includes(interest) ? 'selected' : ''
                  }`}
                  onClick={() => handleInterestToggle(interest)}
                >
                  <span className="interest-name">{interest}</span>
                  {formData.ilgiAlanlari.includes(interest) && (
                    <span className="checkmark">✓</span>
                  )}
                </div>
              ))}
            </div>

            <div className="selected-count">
              Seçilen: {formData.ilgiAlanlari.length} / {ilgiAlanlari.length}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="form-step">
            <h2>Profil Doğrulama</h2>
            <p className="step-description">
              Google Search API ile profilinizi zenginleştirin (Simülasyon)
            </p>
            
            <div className="profile-summary">
              <div className="summary-item">
                <strong>Ad Soyad:</strong> {formData.isim}
              </div>
              <div className="summary-item">
                <strong>Meslek:</strong> {formData.meslek}
              </div>
              <div className="summary-item">
                <strong>Kurum:</strong> {formData.kurum}
              </div>
              <div className="summary-item">
                <strong>Deneyim:</strong> {formData.deneyimYili} yıl
              </div>
              <div className="summary-item">
                <strong>İlgi Alanları:</strong>
                <div className="interest-tags">
                  {formData.ilgiAlanlari.map((interest) => (
                    <span key={interest} className="interest-tag">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {!searchResults && !isSearching && (
              <button
                type="button"
                className="btn btn-search"
                onClick={handleGoogleSearch}
              >
                🔍 Profil Zenginleştir (Google Search API)
              </button>
            )}

            {isSearching && (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Profil bilgileri aranıyor...</p>
              </div>
            )}

            {searchResults && (
              <div className="search-results">
                <h3>✓ Profil Zenginleştirildi</h3>
                <div className="enriched-data">
                  <div className="data-item">
                    <span className="data-label">Yayınlar:</span>
                    <span className="data-value">{searchResults.publications} makale/döküman</span>
                  </div>
                  <div className="data-item">
                    <span className="data-label">Konferanslar:</span>
                    <span className="data-value">{searchResults.conferences} etkinlik</span>
                  </div>
                  <div className="data-item">
                    <span className="data-label">Sosyal Skor:</span>
                    <span className="data-value">{searchResults.socialScore}/100</span>
                  </div>
                  <div className="data-item full-width">
                    <span className="data-label">Son Aktiviteler:</span>
                    <ul>
                      {searchResults.recentActivities.map((activity, idx) => (
                        <li key={idx}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="participant-form-container">
      <div className="form-card">
        <div className="form-header">
          <button className="back-button" onClick={onBack}>
            ← Geri
          </button>
          <h1>Katılımcı Kaydı</h1>
          <div className="step-indicator">
            Adım {currentStep} / 4
          </div>
        </div>

        <div className="step-progress">
          <div
            className="progress-fill"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>

        <form onSubmit={handleSubmit}>
          {renderStep()}

          <div className="form-actions">
            {currentStep > 1 && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Önceki
              </button>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!isStepValid()}
              >
                Sonraki
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!searchResults}
              >
                Kaydı Tamamla
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParticipantForm;

