// Türkiye'deki Kamu Kurumları - Bilişim Alanında
export const kamuKurumlari = [
  "TÜBİTAK (Türkiye Bilimsel ve Teknolojik Araştırma Kurumu)",
  "BTK (Bilgi Teknolojileri ve İletişim Kurumu)",
  "e-Devlet Kapısı",
  "Sağlık Bakanlığı Bilgi İşlem Dairesi",
  "Milli Eğitim Bakanlığı BİDB",
  "İçişleri Bakanlığı Bilgi İşlem Dairesi",
  "Savunma Sanayii Başkanlığı (SSB)",
  "Maliye Bakanlığı Bilgi İşlem Dairesi",
  "Ulaştırma ve Altyapı Bakanlığı",
  "Türksat A.Ş.",
  "PTT A.Ş. Bilgi Teknolojileri",
  "ASELSAN",
  "Türk Telekom",
  "Havelsan",
  "Bilgem (Bilişim ve Bilgi Güvenliği İleri Teknolojiler Araştırma Merkezi)",
  "TÜİK (Türkiye İstatistik Kurumu)",
  "Sosyal Güvenlik Kurumu (SGK) BİDB",
  "Merkez Bankası Bilgi Teknolojileri",
  "Kamu İhale Kurumu",
  "AFAD (Afet ve Acil Durum Yönetimi Başkanlığı)"
];

// Bilişim Meslekleri
export const bilisimMeslekleri = [
  "Yazılım Geliştirici",
  "Sistem Yöneticisi",
  "Veri Tabanı Yöneticisi",
  "Siber Güvenlik Uzmanı",
  "Network Mimarı",
  "Cloud Solutions Architect",
  "DevOps Mühendisi",
  "Data Scientist",
  "IT Proje Yöneticisi",
  "Yapay Zeka Uzmanı",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Mobile App Developer",
  "UI/UX Tasarımcı",
  "Bilgi İşlem Müdürü",
  "Sistem Analisti",
  "IT Güvenlik Uzmanı",
  "Blockchain Developer",
  "IoT Uzmanı"
];

// İlgi Alanları ve Uzmanlıklar
export const ilgiAlanlari = [
  "Yapay Zeka ve Makine Öğrenmesi",
  "Siber Güvenlik",
  "Cloud Computing",
  "Blockchain Teknolojileri",
  "IoT (Nesnelerin İnterneti)",
  "Big Data Analytics",
  "DevOps ve CI/CD",
  "Mobil Uygulama Geliştirme",
  "Web Teknolojileri",
  "Veri Bilimi",
  "Kurumsal Yazılım Mimarisi",
  "Mikroservis Mimarileri",
  "Kamu E-Dönüşüm",
  "Dijital Dönüşüm",
  "Açık Kaynak Teknolojiler"
];

// Türk İsimleri
const isimler = [
  "Ahmet", "Mehmet", "Ali", "Mustafa", "Hasan", "Hüseyin", "İbrahim", "Ömer", "Fatih", "Emre",
  "Ayşe", "Fatma", "Zeynep", "Elif", "Merve", "Esra", "Büşra", "Selin", "Deniz", "Burcu",
  "Cem", "Can", "Burak", "Onur", "Kemal", "Serkan", "Tolga", "Murat", "Kerem", "Baran",
  "Ebru", "Gizem", "Nazlı", "Tuğçe", "Özge", "Ceren", "İrem", "Damla", "Melike", "Yasemin"
];

const soyisimler = [
  "Yılmaz", "Kaya", "Demir", "Şahin", "Çelik", "Yıldız", "Yıldırım", "Öztürk", "Aydın", "Özdemir",
  "Arslan", "Doğan", "Kılıç", "Aslan", "Çetin", "Kara", "Koç", "Kurt", "Özkan", "Şimşek",
  "Erdoğan", "Akın", "Polat", "Turan", "Güneş", "Korkmaz", "Aktaş", "Avcı", "Eren", "Demirtaş"
];

// Mock Katılımcı Verisi Oluştur
export const generateMockParticipants = (count = 50) => {
  const participants = [];
  
  for (let i = 0; i < count; i++) {
    const isim = isimler[Math.floor(Math.random() * isimler.length)];
    const soyisim = soyisimler[Math.floor(Math.random() * soyisimler.length)];
    const meslek = bilisimMeslekleri[Math.floor(Math.random() * bilisimMeslekleri.length)];
    const kurum = kamuKurumlari[Math.floor(Math.random() * kamuKurumlari.length)];
    
    // Her katılımcıya 2-4 ilgi alanı ata
    const katilimciIlgiAlanlari = [];
    const ilgiAlanSayisi = Math.floor(Math.random() * 3) + 2;
    const shuffledIlgilar = [...ilgiAlanlari].sort(() => 0.5 - Math.random());
    
    for (let j = 0; j < ilgiAlanSayisi; j++) {
      katilimciIlgiAlanlari.push(shuffledIlgilar[j]);
    }
    
    participants.push({
      id: i + 1,
      isim: `${isim} ${soyisim}`,
      meslek,
      kurum,
      ilgiAlanlari: katilimciIlgiAlanlari,
      deneyimYili: Math.floor(Math.random() * 20) + 1,
      email: `${isim.toLowerCase()}.${soyisim.toLowerCase()}@${kurum.split(' ')[0].toLowerCase()}.gov.tr`,
      telefon: `+90 5${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10}`
    });
  }
  
  return participants;
};

// Etkinlik Zaman Planı
export const etkinlikProgrami = [
  {
    id: 1,
    saat: "09:00 - 09:30",
    aktivite: "Kayıt ve Karşılama",
    aciklama: "Katılımcı kayıtları ve hoş geldin kahvesi"
  },
  {
    id: 2,
    saat: "09:30 - 10:00",
    aktivite: "Açılış Konuşması",
    aciklama: "Etkinlik tanıtımı ve günün akışı"
  },
  {
    id: 3,
    saat: "10:00 - 11:00",
    aktivite: "Ana Sunum: Kamu Dijital Dönüşümü",
    aciklama: "Türkiye'de kamu sektöründe dijital dönüşüm süreçleri"
  },
  {
    id: 4,
    saat: "11:00 - 11:15",
    aktivite: "Kahve Molası",
    aciklama: "Networking fırsatı"
  },
  {
    id: 5,
    saat: "11:15 - 12:00",
    aktivite: "Panel: Siber Güvenlik ve Kamu",
    aciklama: "Uzmanlar ile siber güvenlik tartışması"
  },
  {
    id: 6,
    saat: "12:00 - 13:00",
    aktivite: "Öğle Yemeği ve Networking",
    aciklama: "Eşleştirilmiş masa düzeni ile networking yemeği"
  },
  {
    id: 7,
    saat: "13:00 - 14:30",
    aktivite: "Paralel Atölyeler",
    aciklama: "Yapay Zeka, Cloud, DevOps atölyeleri"
  },
  {
    id: 8,
    saat: "14:30 - 15:00",
    aktivite: "Kahve ve Networking Seansı",
    aciklama: "Yönlendirilmiş networking oturumu"
  },
  {
    id: 9,
    saat: "15:00 - 16:00",
    aktivite: "Masa Başı Tartışmalar",
    aciklama: "İlgi alanlarına göre gruplandırılmış tartışma masaları"
  },
  {
    id: 10,
    saat: "16:00 - 16:30",
    aktivite: "Kapanış ve Ağ Oluşturma",
    aciklama: "Etkinlik değerlendirmesi ve veda"
  }
];

// Networking Konuları
export const networkingKonulari = [
  "Kamu kurumlarında açık kaynak yazılım kullanımı",
  "E-devlet hizmetlerinin geleceği",
  "Siber güvenlik zorlukları ve çözümleri",
  "Yapay zeka uygulamaları kamu sektöründe",
  "Cloud migrasyonu deneyimleri",
  "DevOps kültürünün kamu kurumlarında benimsenmesi",
  "Veri analitiği ile kamu hizmetlerini iyileştirme",
  "Blockchain teknolojisinin kamu hizmetlerinde kullanımı",
  "Mobil uygulama geliştirme standartları",
  "Kurumsal sistem entegrasyonları",
  "Bilgi güvenliği politikaları ve uygulamaları",
  "Dijital dönüşüm proje yönetimi",
  "Kamu yazılım projelerinde agile metodolojiler",
  "IT altyapı modernizasyonu",
  "Veri merkezleri ve sanallaştırma teknolojileri"
];

