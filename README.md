# TBD - Kamu Bilişim Etkinliği Networking Platformu

## 📋 Proje Açıklaması

TBD (To Be Determined), kamu sektöründe çalışan bilişim profesyonelleri için yapay zeka destekli akıllı networking sistemidir. Etkinlik katılımcılarını ilgi alanlarına, mesleki deneyimlerine ve kurumlarına göre eşleştirerek optimize edilmiş networking fırsatları sunar.

## 🎯 Özellikler

- **Akıllı Katılımcı Kaydı**: Çok adımlı form ile detaylı profil oluşturma
- **Google Search API Simülasyonu**: Katılımcı profillerini zenginleştirme
- **Network Analizi**: AI tabanlı korelasyon ve uyumluluk tespiti
- **Etkinlik Programı**: Detaylı zaman planlaması ve networking seansları
- **Kişiselleştirilmiş Öneriler**: Sizin için en uygun networking partnerlerini bulma
- **Akıllı Masa Eşleştirme**: Optimize edilmiş oturma düzeni oluşturma

## 🏛️ Kamu Kurumları

Sistem, aşağıdaki kamu kurumlarından katılımcılar için tasarlanmıştır:

- TÜBİTAK (Türkiye Bilimsel ve Teknolojik Araştırma Kurumu)
- BTK (Bilgi Teknolojileri ve İletişim Kurumu)
- e-Devlet Kapısı
- Sağlık Bakanlığı, MEB, İçişleri Bakanlığı
- Savunma Sanayii Başkanlığı
- ASELSAN, Havelsan, Türksat ve daha fazlası...

## 💻 Teknolojiler

- **Frontend**: React 19
- **Styling**: CSS3 (Gradient designs, animations)
- **State Management**: React Hooks (useState, useEffect)
- **Algorithm**: Custom networking correlation algorithm

## 🚀 Kurulum

### Gereksinimler
- Node.js 14+
- npm veya yarn

### Adımlar

```bash
# Projeyi klonlayın
git clone [repo-url]

# Proje dizinine gidin
cd TBD/tbd

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm start

# Tarayıcınızda açın
http://localhost:3000
```

## 📁 Proje Yapısı

```
tbd/
├── public/
├── src/
│   ├── components/          # React bileşenleri
│   │   ├── ParticipantForm.js
│   │   ├── Dashboard.js
│   │   ├── NetworkAnalysis.js
│   │   ├── EventSchedule.js
│   │   ├── NetworkingRecommendations.js
│   │   └── TableMatching.js
│   ├── data/                # Mock veri
│   │   └── mockData.js
│   ├── styles/              # CSS dosyaları
│   │   ├── ParticipantForm.css
│   │   ├── Dashboard.css
│   │   ├── NetworkAnalysis.css
│   │   ├── EventSchedule.css
│   │   ├── NetworkingRecommendations.css
│   │   └── TableMatching.css
│   ├── utils/               # Yardımcı fonksiyonlar
│   │   └── networkingAlgorithm.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## 🎨 Kullanım

### 1. Karşılama Ekranı
- Sisteme giriş yapın veya demo ile devam edin
- 50 mock katılımcı verisi ile test edebilirsiniz

### 2. Katılımcı Kaydı
- **Adım 1**: Kişisel bilgiler (Ad, e-posta, telefon)
- **Adım 2**: Mesleki bilgiler (Meslek, kurum, deneyim)
- **Adım 3**: İlgi alanları seçimi
- **Adım 4**: Google Search API ile profil zenginleştirme

### 3. Dashboard
- Profil özeti
- Etkinlik istatistikleri
- Popüler ilgi alanları
- Hızlı erişim menüsü

### 4. Network Analizi
- Tüm katılımcılar arası bağlantı analizi
- Uyumluluk skorları (Yüksek/Orta/Düşük)
- Ortak ilgi alanları tespiti
- Filtreleme seçenekleri

### 5. Etkinlik Programı
- 09:00 - 16:30 arası detaylı program
- Networking seansları vurgulama
- Aktivite detayları
- Kayıt sistemi

### 6. Networking Önerileri
- Size özel 10 kişi önerisi
- Uyumluluk skorları
- Sohbet konuları
- Networking ipuçları

### 7. Masa Eşleştirme
- AI tabanlı optimal masa düzeni
- 6 kişilik masa grupları
- Uyumluluk analizi
- Detaylı masa istatistikleri

## 🧮 Algoritma

### Uyumluluk Skoru Hesaplama

Sistem, iki katılımcı arasındaki uyumluluğu şu faktörlere göre hesaplar:

1. **İlgi Alanları Benzerliği** (%50 ağırlık)
2. **Meslek Uyumu** (%20 ağırlık)
3. **Deneyim Seviyesi Uyumu** (%15 ağırlık)
4. **Farklı Kurum Bonusu** (%15 ağırlık)

### Masa Eşleştirme

- Her masa için optimal grup oluşturma
- Masadaki tüm katılımcılar arası ortalama uyumluluk maksimizasyonu
- Çeşitlilik sağlama (farklı kurumlar, deneyim seviyeleri)

## 🎯 Mock Veri

Sistem, gerçekçi test için 50 mock katılımcı verisi içerir:

- 40 farklı Türk isim/soyisim kombinasyonu
- 20 kamu kurumu
- 20 bilişim mesleği
- 15 ilgi alanı kategorisi

## 🎨 Tasarım

- Modern gradient renkler (#667eea, #764ba2)
- Smooth animasyonlar
- Responsive tasarım
- Kullanıcı dostu arayüz
- Accessibility standartları

## 📝 Notlar

- Bu proje demo amaçlıdır ve mock veri kullanır
- Google Search API entegrasyonu simüle edilmiştir
- Gerçek kullanım için backend entegrasyonu gereklidir

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altındadır.

## 👥 İletişim

Proje Sahibi - TBD Ekibi

---

**Made with ❤️ for Turkish Public Sector IT Professionals**
