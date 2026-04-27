/**
 * Demo data for thptlytaito271ai
 */

export const UNIVERSITY_SCORES = [
  {
    id: 1,
    name: "Đại học Bách Khoa Hà Nội",
    major: "Khoa học Máy tính",
    region: "Miền Bắc",
    scores: { "2024": 29.42, "2025": 29.5, "2026": 29.6 }
  },
  {
    id: 2,
    name: "Đại học Kinh tế Quốc dân",
    major: "Logistics và Quản lý chuỗi cung ứng",
    region: "Miền Bắc",
    scores: { "2024": 28.2, "2025": 28.5, "2026": 28.8 }
  },
  {
    id: 3,
    name: "Đại học Quốc gia TP.HCM",
    major: "Kỹ thuật Phần mềm",
    region: "Miền Nam",
    scores: { "2024": 27.5, "2025": 27.8, "2026": 28.0 }
  },
  {
    id: 4,
    name: "Đại học Ngoại thương",
    major: "Kinh tế đối ngoại",
    region: "Miền Bắc",
    scores: { "2024": 28.9, "2025": 29.1, "2026": 29.3 }
  },
  {
    id: 5,
    name: "Đại học Sư phạm Kỹ thuật TP.HCM",
    major: "Công nghệ Kỹ thuật Ô tô",
    region: "Miền Nam",
    scores: { "2024": 25.5, "2025": 26.0, "2026": 26.5 }
  },
  {
    id: 6,
    name: "Đại học Đà Nẵng",
    major: "Công nghệ Thông tin",
    region: "Miền Trung",
    scores: { "2024": 24.5, "2025": 25.0, "2026": 25.5 }
  }
];

export const EXAM_INFO = {
  schedule: [
    { date: "24/06/2026", morning: "Ngữ Văn (120')", afternoon: "Toán (90')" },
    { date: "25/06/2026", morning: "KHTN/KHXH (150')", afternoon: "Ngoại ngữ (60')" }
  ],
  structure: [
    { subject: "Toán", format: "Trắc nghiệm", questions: 50, duration: "90 phút" },
    { subject: "Ngữ Văn", format: "Tự luận", questions: 2, duration: "120 phút" },
    { subject: "Tiếng Anh", format: "Trắc nghiệm", questions: 50, duration: "60 phút" }
  ],
  admissionMethods: [
    { title: "Xét điểm thi THPT", desc: "Sử dụng kết quả kỳ thi tốt nghiệp THPT 2026." },
    { title: "Xét học bạ", desc: "Dựa trên điểm trung bình các học kỳ THPT." },
    { title: "Đánh giá năng lực", desc: "Kỳ thi riêng của ĐHQG Hà Nội, ĐHQG TP.HCM." },
    { title: "Tuyển thẳng", desc: "Dành cho học sinh giỏi quốc gia, quốc tế." }
  ]
};
