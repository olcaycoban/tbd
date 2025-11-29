// Network Analizi ve Korelasyon Algoritması

/**
 * İki katılımcı arasındaki benzerlik skorunu hesaplar
 */
export const calculateSimilarityScore = (participant1, participant2) => {
  let score = 0;
  
  // İlgi alanları benzerliği (en önemli faktör - %50)
  const commonInterests = participant1.ilgiAlanlari.filter(
    interest => participant2.ilgiAlanlari.includes(interest)
  );
  const interestScore = (commonInterests.length / Math.max(
    participant1.ilgiAlanlari.length,
    participant2.ilgiAlanlari.length
  )) * 50;
  score += interestScore;
  
  // Meslek uyumu (%20)
  const meslekScore = calculateJobCompatibility(
    participant1.meslek,
    participant2.meslek
  );
  score += meslekScore * 20;
  
  // Deneyim seviyesi uyumu (%15)
  const experienceDiff = Math.abs(
    participant1.deneyimYili - participant2.deneyimYili
  );
  const experienceScore = Math.max(0, 1 - (experienceDiff / 20));
  score += experienceScore * 15;
  
  // Farklı kurum bonusu (%15) - Networking için farklı kurumlar daha değerli
  const differentInstitution = participant1.kurum !== participant2.kurum;
  if (differentInstitution) {
    score += 15;
  }
  
  return Math.round(score * 10) / 10;
};

/**
 * Meslek uyumluluğunu hesaplar (0-1 arası)
 */
const calculateJobCompatibility = (job1, job2) => {
  // Aynı meslek
  if (job1 === job2) return 0.5; // Biraz daha düşük - farklı bakış açıları için
  
  // Uyumlu meslek grupları
  const compatibilityGroups = [
    ["Yazılım Geliştirici", "Full Stack Developer", "Frontend Developer", "Backend Developer"],
    ["Sistem Yöneticisi", "Network Mimarı", "DevOps Mühendisi"],
    ["Siber Güvenlik Uzmanı", "IT Güvenlik Uzmanı", "Network Mimarı"],
    ["Veri Tabanı Yöneticisi", "Data Scientist", "Sistem Analisti"],
    ["IT Proje Yöneticisi", "Bilgi İşlem Müdürü", "Sistem Analisti"],
    ["Yapay Zeka Uzmanı", "Data Scientist", "Yazılım Geliştirici"],
    ["Cloud Solutions Architect", "DevOps Mühendisi", "Sistem Yöneticisi"],
    ["Mobile App Developer", "UI/UX Tasarımcı", "Frontend Developer"]
  ];
  
  for (const group of compatibilityGroups) {
    if (group.includes(job1) && group.includes(job2)) {
      return 0.8;
    }
  }
  
  return 0.3; // Varsayılan uyumluluk
};

/**
 * Tüm katılımcılar için network analizi yapar
 */
export const analyzeNetwork = (participants) => {
  const connections = [];
  
  for (let i = 0; i < participants.length; i++) {
    for (let j = i + 1; j < participants.length; j++) {
      const score = calculateSimilarityScore(
        participants[i],
        participants[j]
      );
      
      if (score > 30) { // Minimum eşik değeri
        connections.push({
          participant1: participants[i],
          participant2: participants[j],
          score,
          commonInterests: participants[i].ilgiAlanlari.filter(
            interest => participants[j].ilgiAlanlari.includes(interest)
          )
        });
      }
    }
  }
  
  // Skorlara göre sırala
  connections.sort((a, b) => b.score - a.score);
  
  return connections;
};

/**
 * Masa eşleştirmesi için optimal grupları oluşturur
 */
export const createTableMatches = (participants, tableSize = 6) => {
  const tables = [];
  const assigned = new Set();
  const connections = analyzeNetwork(participants);
  
  // Her masa için en iyi eşleşmeleri bul
  while (assigned.size < participants.length) {
    const table = [];
    
    // İlk katılımcıyı seç (henüz atanmamış)
    const firstParticipant = participants.find(p => !assigned.has(p.id));
    if (!firstParticipant) break;
    
    table.push(firstParticipant);
    assigned.add(firstParticipant.id);
    
    // Masaya en uygun diğer katılımcıları ekle
    while (table.length < tableSize && assigned.size < participants.length) {
      let bestMatch = null;
      let bestScore = 0;
      
      // Masadaki mevcut katılımcılarla en iyi uyumu bul
      for (const participant of participants) {
        if (assigned.has(participant.id)) continue;
        
        let totalScore = 0;
        for (const tableParticipant of table) {
          totalScore += calculateSimilarityScore(tableParticipant, participant);
        }
        
        const avgScore = totalScore / table.length;
        
        if (avgScore > bestScore) {
          bestScore = avgScore;
          bestMatch = participant;
        }
      }
      
      if (bestMatch) {
        table.push(bestMatch);
        assigned.add(bestMatch.id);
      } else {
        break;
      }
    }
    
    if (table.length > 0) {
      tables.push({
        id: tables.length + 1,
        participants: table,
        avgCompatibility: calculateTableCompatibility(table)
      });
    }
  }
  
  return tables;
};

/**
 * Masa uyumluluk skorunu hesaplar
 */
const calculateTableCompatibility = (tableParticipants) => {
  if (tableParticipants.length < 2) return 0;
  
  let totalScore = 0;
  let pairCount = 0;
  
  for (let i = 0; i < tableParticipants.length; i++) {
    for (let j = i + 1; j < tableParticipants.length; j++) {
      totalScore += calculateSimilarityScore(
        tableParticipants[i],
        tableParticipants[j]
      );
      pairCount++;
    }
  }
  
  return Math.round((totalScore / pairCount) * 10) / 10;
};

/**
 * Bir katılımcı için en iyi networking önerileri
 */
export const getNetworkingRecommendations = (participant, allParticipants, count = 5) => {
  const recommendations = [];
  
  for (const other of allParticipants) {
    if (other.id === participant.id) continue;
    
    const score = calculateSimilarityScore(participant, other);
    const commonInterests = participant.ilgiAlanlari.filter(
      interest => other.ilgiAlanlari.includes(interest)
    );
    
    recommendations.push({
      participant: other,
      score,
      commonInterests,
      reason: generateRecommendationReason(participant, other, commonInterests)
    });
  }
  
  recommendations.sort((a, b) => b.score - a.score);
  
  return recommendations.slice(0, count);
};

/**
 * Öneri nedeni oluştur
 */
const generateRecommendationReason = (participant1, participant2, commonInterests) => {
  const reasons = [];
  
  if (commonInterests.length > 0) {
    reasons.push(`Ortak ilgi alanları: ${commonInterests.slice(0, 2).join(", ")}`);
  }
  
  if (participant1.kurum !== participant2.kurum) {
    reasons.push("Farklı kurumdan deneyim paylaşımı");
  }
  
  const experienceDiff = Math.abs(participant1.deneyimYili - participant2.deneyimYili);
  if (experienceDiff > 5) {
    if (participant1.deneyimYili > participant2.deneyimYili) {
      reasons.push("Mentorluk fırsatı");
    } else {
      reasons.push("Yeni perspektifler");
    }
  }
  
  return reasons.join(" • ");
};

/**
 * Google Search API simülasyonu - Katılımcı hakkında yapılandırılmış bilgi
 */
export const simulateGoogleSearch = (participant) => {
  // Mock Google arama sonuçları
  return {
    name: participant.isim,
    position: participant.meslek,
    organization: participant.kurum,
    expertise: participant.ilgiAlanlari,
    experience: `${participant.deneyimYili} yıl deneyim`,
    recentActivities: [
      `${participant.ilgiAlanlari[0]} konusunda proje yönetimi`,
      `${participant.kurum} bünyesinde sistem geliştirme`,
      "Kamu dijital dönüşüm projeleri"
    ],
    publications: Math.floor(Math.random() * 5) + 1,
    conferences: Math.floor(Math.random() * 10) + 1,
    socialScore: Math.floor(Math.random() * 50) + 50
  };
};

