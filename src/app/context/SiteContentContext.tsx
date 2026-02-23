import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// =========================================
// TYPE DEFINITIONS
// =========================================
export interface HeroContent {
  churchName: string;
  subName: string;
  diocese: string;
  verse: string;
  verseRef: string;
  imageUrl: string;
}

export interface WelcomeContent {
  title: string;
  paragraph1: string;
  paragraph2: string;
  quote: string;
  quoteRef: string;
  pastorGreeting: string;
  pastorName: string;
  pastorTitle: string;
  imageUrl: string;
}

export interface Announcement {
  id: number;
  title: string;
  date: string;
  description: string;
  category: string;
}

export interface Schedule {
  day: string;
  time: string;
  type: string;
}

export interface WeeklyMass {
  day: string;
  time: string;
  type: string;
  language: string;
}

export interface HolyDay {
  date: string;
  event: string;
  time: string;
}

export interface SacramentRequirement {
  text: string;
}

export interface Sacrament {
  name: string;
  schedule: string;
  contact: string;
  requirements: string[];
}

export interface Devotion {
  name: string;
  schedule: string;
  description: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content?: string;
}

export interface Organization {
  id: number;
  name: string;
  description: string;
  members: string;
  leader: string;
  schedule: string;
  category: string;
  color: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
  youtube: string;
  officeHours: string;
  mapEmbedUrl: string;
}

export interface ProfileContent {
  churchFullName: string;
  stasisSince: string;
  parishName: string;
}

export interface TimelineItem {
  year: string;
  event: string;
}

export interface ChurchHistory {
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  imageUrl: string;
  timeline: TimelineItem[];
}

export interface VisiMisi {
  visi: string;
  misi: string[];
}

export interface StructureMember {
  position: string;
  name: string;
}

export interface PastorInfo {
  name: string;
  title: string;
  ordination: string;
  education: string;
  since: string;
  quote: string;
  bio: string;
  imageUrl: string;
}

export interface WilayahItem {
  name: string;
  ketua: string;
  families: number;
}

export interface WilayahData {
  totalLingkungan: string;
  totalKeluarga: string;
  totalJiwa: string;
  items: WilayahItem[];
}

export interface FooterContent {
  description: string;
  copyright: string;
}

export interface NavbarContent {
  churchName: string;
  subName: string;
}

export interface SiteContent {
  hero: HeroContent;
  welcome: WelcomeContent;
  announcements: Announcement[];
  homeSchedules: Schedule[];
  weeklyMass: WeeklyMass[];
  holyDays: HolyDay[];
  sacraments: Sacrament[];
  devotions: Devotion[];
  news: NewsArticle[];
  organizations: Organization[];
  contact: ContactInfo;
  profile: ProfileContent;
  history: ChurchHistory;
  visiMisi: VisiMisi;
  structure: StructureMember[];
  pastor: PastorInfo;
  wilayah: WilayahData;
  footer: FooterContent;
  navbar: NavbarContent;
}

// =========================================
// DEFAULT VALUES
// =========================================
const defaultContent: SiteContent = {
  navbar: {
    churchName: "Stasi Santa Bernadeth",
    subName: "Ba'lele Kondongan",
  },
  hero: {
    churchName: "Stasi Santa Bernadeth",
    subName: "Ba'lele Kondongan",
    diocese: "Keuskupan Agung Makassar",
    verse: "\"Betapa gembiranya, tatkala dikatakan kepadaku: Mari, kita pergi ke rumah TUHAN!\"",
    verseRef: "- Mazmur 122:1",
    imageUrl: "https://images.unsplash.com/photo-1621610212492-210f948fa466?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRob2xpYyUyMGNodXJjaCUyMGJ1aWxkaW5nJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzcxNzY2NDEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  welcome: {
    title: "Selamat Datang",
    paragraph1: "Saudara-saudari terkasih dalam Kristus, selamat datang di website Stasi Santa Bernadeth Ba'lele Kondongan. Kami adalah komunitas umat Katolik di Toraja Utara yang bersatu dalam iman, harapan, dan kasih.",
    paragraph2: "Sebagai bagian dari Keuskupan Agung Makassar, kami berkomitmen untuk memberikan pelayanan pastoral yang terbaik bagi umat melalui perayaan liturgi, kegiatan rohani, dan karya sosial kemasyarakatan.",
    quote: "\"Marilah kita saling mengasihi, sebab kasih itu berasal dari Allah.\"",
    quoteRef: "- 1 Yohanes 4:7",
    pastorGreeting: "Tuhan memberkati,",
    pastorName: "Rm. Andreas Wijaya, Pr",
    pastorTitle: "Pastor Paroki",
    imageUrl: "https://images.unsplash.com/photo-1636562705007-67a52b138df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRob2xpYyUyMGNodXJjaCUyMGludGVyaW9yJTIwYWx0YXJ8ZW58MXx8fHwxNzcxNjkzMDM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  announcements: [
    { id: 1, title: "Misa Paskah 2026", date: "2026-04-05", description: "Perayaan Paskah akan diadakan pada hari Minggu, 5 April 2026", category: "Liturgi" },
    { id: 2, title: "Kegiatan Bakti Sosial", date: "2026-03-15", description: "OMK mengadakan bakti sosial ke panti asuhan", category: "Sosial" },
    { id: 3, title: "Pendaftaran Krisma 2026", date: "2026-02-28", description: "Pendaftaran calon Krisma dibuka hingga akhir Februari", category: "Sakramen" },
  ],
  homeSchedules: [
    { day: "Minggu", time: "06:00 & 17:00", type: "Misa Minggu" },
    { day: "Senin - Sabtu", time: "06:00", type: "Misa Harian" },
    { day: "Kamis", time: "19:00", type: "Adorasi & Misa" },
    { day: "Jumat", time: "19:00", type: "Jalan Salib" },
  ],
  weeklyMass: [
    { day: "Minggu", time: "06:00 WIB", type: "Misa Minggu", language: "Bahasa Indonesia" },
    { day: "Minggu", time: "17:00 WIB", type: "Misa Minggu", language: "Bahasa Indonesia" },
    { day: "Senin", time: "06:00 WIB", type: "Misa Harian", language: "Bahasa Indonesia" },
    { day: "Selasa", time: "06:00 WIB", type: "Misa Harian", language: "Bahasa Indonesia" },
    { day: "Rabu", time: "06:00 WIB", type: "Misa Harian", language: "Bahasa Indonesia" },
    { day: "Kamis", time: "06:00 WIB", type: "Misa Harian", language: "Bahasa Indonesia" },
    { day: "Kamis", time: "19:00 WIB", type: "Adorasi & Misa", language: "Bahasa Indonesia" },
    { day: "Jumat", time: "06:00 WIB", type: "Misa Harian", language: "Bahasa Indonesia" },
    { day: "Jumat", time: "19:00 WIB", type: "Jalan Salib", language: "Bahasa Indonesia" },
    { day: "Sabtu", time: "06:00 WIB", type: "Misa Harian", language: "Bahasa Indonesia" },
  ],
  holyDays: [
    { date: "1 Januari", event: "Santa Maria Bunda Allah", time: "06:00 & 17:00 WIB" },
    { date: "Maret/April", event: "Kamis Putih", time: "19:00 WIB" },
    { date: "Maret/April", event: "Jumat Agung", time: "15:00 WIB" },
    { date: "Maret/April", event: "Sabtu Suci - Vigili Paskah", time: "19:00 WIB" },
    { date: "Maret/April", event: "Minggu Paskah", time: "06:00 & 17:00 WIB" },
    { date: "15 Agustus", event: "Santa Maria Diangkat ke Surga", time: "06:00 & 17:00 WIB" },
    { date: "25 Desember", event: "Hari Natal", time: "00:00, 06:00 & 17:00 WIB" },
  ],
  sacraments: [
    {
      name: "Baptis",
      schedule: "Minggu ke-2 setiap bulan, pukul 15:00 WIB",
      contact: "Sekretariat Gereja, minimal 2 minggu sebelumnya",
      requirements: [
        "Mengisi formulir pendaftaran",
        "Fotokopi Kartu Keluarga",
        "Fotokopi KTP Orang Tua",
        "Fotokopi Surat Nikah Gereja (jika ada)",
        "Mengikuti kursus persiapan baptis (3x pertemuan)",
      ],
    },
    {
      name: "Komuni Pertama",
      schedule: "Bulan Mei/Juni (sesuai kalender liturgi)",
      contact: "Pendaftaran dibuka Januari - Februari setiap tahun",
      requirements: [
        "Anak usia minimal 7 tahun",
        "Sudah dibaptis",
        "Mengikuti katekese persiapan (6 bulan)",
        "Mengikuti retret",
        "Mengikuti misa secara teratur",
      ],
    },
    {
      name: "Krisma",
      schedule: "Bulan Oktober/November (sesuai kalender liturgi)",
      contact: "Pendaftaran dibuka Februari - Maret setiap tahun",
      requirements: [
        "Usia minimal 17 tahun",
        "Sudah menerima Komuni Pertama",
        "Mengikuti katekese persiapan (8 bulan)",
        "Mengikuti retret",
        "Memilih nama krisma dan sponsor",
      ],
    },
    {
      name: "Pernikahan",
      schedule: "Sesuai kesepakatan dengan Pastor",
      contact: "Hubungi sekretariat untuk membuat janji dengan Pastor",
      requirements: [
        "Minimal 6 bulan sebelum pernikahan",
        "Mengisi formulir pendaftaran",
        "Surat Baptis baru (max. 6 bulan)",
        "KTP & KK calon mempelai",
        "Mengikuti kursus persiapan pernikahan",
        "Konsultasi dengan Pastor",
      ],
    },
  ],
  devotions: [
    { name: "Doa Rosario", schedule: "Setiap hari, pukul 17:30 WIB (sebelum Misa Sore)", description: "Doa rosario bersama umat" },
    { name: "Adorasi Ekaristi", schedule: "Kamis, pukul 18:00 - 19:00 WIB", description: "Adorasi dan doa di hadapan Sakramen Mahakudus" },
    { name: "Jalan Salib", schedule: "Jumat, pukul 19:00 WIB", description: "Merenungkan sengsara Yesus melalui 14 stasi" },
    { name: "Ibadat Sabda", schedule: "Selasa, pukul 19:00 WIB", description: "Ibadat dengan refleksi Kitab Suci" },
    { name: "Doa Novena", schedule: "Menjelang hari raya tertentu", description: "Doa persiapan menjelang perayaan besar" },
  ],
  news: [
    { id: 1, title: "Perayaan Natal 2025 Penuh Sukacita", date: "2025-12-25", category: "Liturgi", image: "https://images.unsplash.com/photo-1636562705007-67a52b138df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", excerpt: "Perayaan Natal tahun ini dihadiri oleh lebih dari 500 umat. Misa Natal Malam dan Misa Fajar berlangsung khidmat dan meriah.", content: "Perayaan Natal tahun 2025 di Stasi Santa Bernadeth Ba'lele Kondongan berlangsung dengan penuh sukacita dan kekhidmatan. Lebih dari 500 umat hadir memadati gereja untuk mengikuti Misa Natal Malam yang dipimpin oleh Pastor Paroki.\n\nMisa dimulai pukul 00.00 WIB dengan iringan lagu-lagu Natal dari Koor Santa Bernadeth yang telah berlatih selama berminggu-minggu. Suasana gereja yang dihiasi dengan kandang natal dan lampu-lampu natal menambah keindahan malam yang sakral ini.\n\nPada keesokan harinya, Misa Fajar juga dipadati oleh umat yang antusias ingin merayakan kelahiran Sang Juru Selamat. Pastor dalam homilinya mengajak umat untuk merenungkan makna kedatangan Yesus Kristus ke dunia sebagai wujud kasih Allah kepada manusia.\n\nSetelah perayaan Misa, umat saling berbagi kebahagiaan dan mengucapkan selamat Natal satu sama lain. Panitia Natal juga menyiapkan acara ramah tamah sederhana yang mempererat persaudaraan antar umat." },
    { id: 2, title: "OMK Mengadakan Bakti Sosial ke Panti Asuhan", date: "2026-01-15", category: "Sosial", image: "https://images.unsplash.com/photo-1639092419140-c9af5d9538f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", excerpt: "Orang Muda Katolik mengunjungi Panti Asuhan Santa Elisabeth dengan membawa donasi dan mengadakan kegiatan bersama anak-anak.", content: "Orang Muda Katolik (OMK) Stasi Santa Bernadeth mengadakan kegiatan bakti sosial ke Panti Asuhan Santa Elisabeth pada tanggal 15 Januari 2026. Kegiatan ini diikuti oleh 35 anggota OMK yang penuh semangat.\n\nRombongan OMK tiba di panti asuhan pukul 09.00 WIB dengan membawa berbagai donasi berupa sembako, pakaian layak pakai, alat tulis, dan perlengkapan sekolah. Total donasi yang terkumpul mencapai nilai yang cukup signifikan berkat partisipasi seluruh umat gereja.\n\nSelama kunjungan, OMK mengadakan berbagai kegiatan bersama anak-anak panti asuhan, mulai dari permainan edukatif, bernyanyi bersama, hingga sharing Firman Tuhan. Kegiatan ini disambut dengan antusias oleh anak-anak panti asuhan yang tampak sangat gembira.\n\nKetua OMK, Saudara David Kurniawan, menyatakan bahwa kegiatan ini merupakan wujud nyata dari semangat pelayanan kasih yang diajarkan oleh Gereja. Ke depannya, OMK berencana untuk mengadakan kegiatan bakti sosial secara rutin setiap triwulan." },
    { id: 3, title: "Retret Lingkungan Santo Petrus", date: "2026-01-20", category: "Kegiatan", image: "https://images.unsplash.com/photo-1765947382559-93260e5d6c89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", excerpt: "Lingkungan Santo Petrus mengadakan retret satu hari dengan tema 'Memperbarui Iman di Tahun Baru'.", content: "Lingkungan Santo Petrus berhasil melaksanakan retret satu hari dengan tema 'Memperbarui Iman di Tahun Baru' pada tanggal 20 Januari 2026. Retret yang berlangsung dari pagi hingga petang ini diikuti oleh 40 umat dari lingkungan Santo Petrus.\n\nRetret dipimpin oleh seorang pembicara dari luar, yaitu Romo Yohanes, Pr, yang membawakan materi tentang pentingnya memperbarui komitmen iman di awal tahun. Sesi demi sesi dibawakan dengan penuh kedalaman dan sangat menyentuh hati para peserta.\n\nKegiatan retret meliputi sesi refleksi pribadi, ibadat tobat, adorasi ekaristi, dan sharing dalam kelompok kecil. Momen adorasi ekaristi menjadi puncak dari seluruh rangkaian acara retret yang hening dan khidmat.\n\nSalah satu peserta, Bapak Antonius, mengungkapkan bahwa ia merasa sangat tersentuh dan mendapat pencerahan baru dalam perjalanan imannya. Kegiatan semacam ini sangat bermanfaat untuk memperdalam hubungan pribadi dengan Tuhan." },
    { id: 4, title: "Misa Syukur HUT Stasi ke-75", date: "2026-02-01", category: "Liturgi", image: "https://images.unsplash.com/photo-1561984781-de40954f2c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", excerpt: "Stasi Santa Bernadeth merayakan HUT ke-75 dengan Misa Syukur yang dipimpin oleh Romo Paroki.", content: "Stasi Santa Bernadeth Ba'lele Kondongan merayakan Hari Ulang Tahun ke-75 dengan penuh syukur dan kegembiraan. Misa Syukur yang digelar pada tanggal 1 Februari 2026 ini menjadi momen bersejarah bagi seluruh komunitas umat.\n\nMisa Syukur dipimpin langsung oleh Pastor Paroki, Rm. Paulus Tongli, Pr, dan dihadiri oleh ratusan umat termasuk tamu undangan dari paroki-paroki tetangga. Dalam homilinya, Romo Paulus mengajak umat untuk mensyukuri perjalanan panjang komunitas ini dan terus berkomitmen membangun Gereja yang hidup.\n\nSetelah Misa, acara dilanjutkan dengan pentas budaya yang menampilkan tarian tradisional Toraja dan persembahan lagu dari berbagai kelompok koor. Pameran foto sejarah gereja juga dipajang untuk mengenang perjalanan 75 tahun Stasi Santa Bernadeth.\n\nMomen bersejarah ini ditutup dengan makan bersama yang telah disiapkan oleh panitia dan ibu-ibu WKRI. Semua yang hadir pulang dengan hati penuh sukacita dan semangat baru untuk terus berjalan bersama dalam iman." },
    { id: 5, title: "Pentas Koor dalam Perayaan Paskah", date: "2026-02-10", category: "Kegiatan", image: "https://images.unsplash.com/photo-1709054754811-6c8d2d1ab015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", excerpt: "Koor Santa Bernadeth mempersiapkan lagu-lagu khusus untuk perayaan Paskah mendatang.", content: "Koor Santa Bernadeth saat ini tengah giat mempersiapkan diri untuk menyambut perayaan Paskah yang akan datang. Latihan intensif telah dimulai sejak bulan Februari 2026, dengan jadwal latihan dua kali seminggu setiap Selasa dan Jumat malam.\n\nDibawah arahan Bapak Petrus Wijaya selaku Koordinator Liturgi, koor mempersiapkan berbagai lagu liturgi khusus untuk rangkaian Pekan Suci, mulai dari Minggu Palma, Kamis Putih, Jumat Agung, Vigili Paskah, hingga Misa Paskah.\n\nBeberapa lagu baru dalam bahasa Latin turut dimasukkan dalam repertoar, memberikan nuansa yang lebih sakral dan khidmat pada perayaan. Para anggota koor berlatih dengan penuh semangat dan dedikasi tinggi.\n\nKoor juga berencana untuk menampilkan sebuah kantata paskah sederhana yang akan membawakan kisah sengsara dan kebangkitan Kristus melalui nyanyian. Ini akan menjadi penampilan perdana yang sangat dinantikan oleh seluruh umat." },
    { id: 6, title: "Program Bantuan untuk Keluarga Kurang Mampu", date: "2026-02-15", category: "Sosial", image: "https://images.unsplash.com/photo-1765947382559-93260e5d6c89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", excerpt: "Gereja memberikan bantuan sembako kepada 20 keluarga kurang mampu di sekitar wilayah stasi.", content: "Dalam semangat berbagi kasih, Stasi Santa Bernadeth Ba'lele Kondongan menyalurkan bantuan sembako kepada 20 keluarga kurang mampu di sekitar wilayah stasi pada tanggal 15 Februari 2026. Program ini merupakan bagian dari program sosial berkelanjutan gereja.\n\nBantuan yang disalurkan berupa paket sembako yang berisi beras, minyak goreng, gula, tepung, dan kebutuhan pokok lainnya. Selain sembako, beberapa keluarga juga menerima bantuan tambahan berupa pakaian layak pakai dan perlengkapan rumah tangga.\n\nPenyaluran bantuan dilakukan secara langsung dengan mendatangi rumah-rumah penerima bantuan yang sudah didata sebelumnya oleh tim Koordinator Sosial. Setiap keluarga penerima menyambut bantuan ini dengan rasa syukur yang tulus.\n\nKoordinator Sosial, Ibu Theresia Gunawan, menjelaskan bahwa program ini didanai melalui kolekte khusus sosial yang dikumpulkan setiap Minggu. Gereja berkomitmen untuk terus menjalankan program sosial ini sebagai wujud kepedulian Gereja kepada sesama yang membutuhkan." },
  ],
  organizations: [
    { id: 1, name: "Orang Muda Katolik (OMK)", description: "Kelompok pemuda-pemudi Katolik yang aktif dalam kegiatan iman, sosial, dan kepemudaan gereja.", members: "45 anggota", leader: "Saudara David Kurniawan", schedule: "Setiap Sabtu, 16:00 WIB", category: "Kepemudaan", color: "blue" },
    { id: 2, name: "Legio Maria", description: "Persekutuan umat Katolik yang mengabdikan diri kepada Bunda Maria melalui doa dan karya apostolat.", members: "30 anggota", leader: "Ibu Maria Susanti", schedule: "Setiap Selasa, 17:00 WIB", category: "Devosi", color: "blue" },
    { id: 3, name: "Koor Gereja", description: "Kelompok paduan suara yang memperindah perayaan liturgi dengan nyanyian pujian.", members: "25 anggota", leader: "Bapak Petrus Wijaya", schedule: "Latihan Jumat, 19:00 WIB", category: "Liturgi", color: "purple" },
    { id: 4, name: "Wanita Katolik RI (WKRI)", description: "Organisasi wanita Katolik yang berperan dalam pengembangan sosial dan pastoral gereja.", members: "35 anggota", leader: "Ibu Elizabeth Chen", schedule: "Setiap Kamis, 10:00 WIB", category: "Sosial", color: "pink" },
  ],
  contact: {
    address: "Jl. Tanditulak, Mentirotiku, Kec. Rantepao, Kabupaten Toraja Utara, Sulawesi Selatan 91833",
    phone: "0853-4680-8206",
    email: "info@stasibernadeth.org",
    facebook: "#",
    instagram: "#",
    youtube: "#",
    officeHours: "Senin - Jumat: 08:00 - 16:00 WIB | Sabtu: 08:00 - 12:00 WIB",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.123!2d119.898!3d-2.965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwNTcnNTQuMCJTIDExOcKwNTMnNTIuOCJF!5e0!3m2!1sen!2sid!4v1234567890",
  },
  profile: {
    churchFullName: "Stasi Santa Bernadeth Ba'lele Kondongan",
    stasisSince: "1950",
    parishName: "Paroki Santo Yohanes",
  },
  history: {
    paragraph1: "Stasi Santa Bernadeth Ba'lele Kondongan merupakan bagian dari perkembangan Gereja Katolik di wilayah Toraja Utara, Sulawesi Selatan. Berawal dari sekelompok kecil umat yang berkumpul untuk beribadah bersama, komunitas ini terus bertumbuh menjadi stasi yang melayani umat Katolik di kawasan Ba'lele Kondongan.",
    paragraph2: "Nama Santa Bernadeth dipilih sebagai bentuk penghormatan kepada Santa Bernadette Soubirous, seorang santa yang menerima penampakan Bunda Maria di Lourdes. Nama ini menjadi inspirasi iman dan keteguhan hati dalam mengikuti Kristus.",
    paragraph3: "Sebagai bagian dari Keuskupan Agung Makassar, Stasi Santa Bernadeth terus berkembang dalam pelayanan pastoral, kehidupan liturgi, dan karya sosial untuk membangun Kerajaan Allah di tengah masyarakat Toraja.",
    imageUrl: "https://images.unsplash.com/photo-1621610212492-210f948fa466?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRob2xpYyUyMGNodXJjaCUyMGJ1aWxkaW5nJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzcxNzY2NDEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    timeline: [
      { year: "1950", event: "Pembentukan komunitas umat Katolik pertama di wilayah ini" },
      { year: "1965", event: "Pembangunan gereja sederhana sebagai tempat ibadah" },
      { year: "1980", event: "Renovasi besar-besar gereja dan peresmian sebagai Stasi" },
      { year: "1995", event: "Penambahan fasilitas gedung pastoral dan aula" },
      { year: "2010", event: "Renovasi interior gereja dengan desain modern" },
      { year: "2020", event: "Digitalisasi pelayanan dan pembangunan website" },
    ],
  },
  visiMisi: {
    visi: "Menjadi komunitas umat beriman Katolik yang hidup, bersemangat dalam iman, dan aktif dalam karya kasih serta pewartaan Injil di tengah masyarakat.",
    misi: [
      "Menyelenggarakan perayaan liturgi yang khidmat dan bermakna bagi pertumbuhan iman umat",
      "Membina dan mengembangkan kehidupan rohani umat melalui berbagai kegiatan pastoral",
      "Mengembangkan semangat persaudaraan dan gotong royong antar umat",
      "Melaksanakan karya kasih dan kepedulian sosial kepada sesama, terutama yang membutuhkan",
      "Memberdayakan organisasi dan komunitas dalam gereja untuk terlibat aktif dalam kehidupan menggereja",
      "Mewartakan Injil melalui kesaksian hidup sehari-hari di tengah masyarakat",
    ],
  },
  structure: [
    { position: "Pastor Paroki", name: "Paulus Tongli, Pr" },
    { position: "Ketua Stasi", name: "Bapak Thomas Santoso" },
    { position: "Wakil Ketua", name: "Bapak Michael Tan" },
    { position: "Sekretaris", name: "Ibu Maria Susanti" },
    { position: "Bendahara", name: "Ibu Elizabeth Chen" },
    { position: "Koordinator Liturgi", name: "Bapak Petrus Wijaya" },
    { position: "Koordinator OMK", name: "Saudara David Kurniawan" },
    { position: "Koordinator Sosial", name: "Ibu Theresia Gunawan" },
  ],
  pastor: {
    name: "Paulus Tongli, Pr",
    title: "Pastor Paroki Santa Theresia Rantepao",
    ordination: "15 Agustus 2005",
    education: "Seminari Tinggi Santo Petrus",
    since: "Sejak 2018",
    quote: "Marilah kita bersama-sama membangun Gereja yang hidup, penuh kasih, dan menjadi terang bagi dunia. Tuhan memberkati kita semua.",
    bio: "Pastor Paulus melayani dengan penuh dedikasi dan kasih pastoral kepada seluruh umat di Paroki Santa Theresia Rantepao, termasuk di Stasi Santa Bernadeth.",
    imageUrl: "https://25thtahbisankams.wordpress.com/wp-content/uploads/2016/10/paulus-tongli.jpg?w=218&h=304",
  },
  wilayah: {
    totalLingkungan: "4",
    totalKeluarga: "105",
    totalJiwa: "~380",
    items: [
      { name: "Lingkungan Santo Petrus", ketua: "Bapak Antonius", families: 25 },
      { name: "Lingkungan Santo Paulus", ketua: "Bapak Yohanes", families: 30 },
      { name: "Lingkungan Santa Maria", ketua: "Ibu Fransiska", families: 28 },
      { name: "Lingkungan Santo Yusuf", ketua: "Bapak Gabriel", families: 22 },
    ],
  },
  footer: {
    description: "Komunitas umat Katolik yang bersatu dalam iman, harapan, dan kasih untuk memuliakan Tuhan.",
    copyright: "Stasi Santa Bernadeth Ba'lele Kondongan. Semua hak cipta dilindungi.",
  },
};

// =========================================
// CONTEXT
// =========================================
interface SiteContentContextType {
  content: SiteContent;
  updateContent: (section: keyof SiteContent, data: SiteContent[keyof SiteContent]) => void;
  resetSection: (section: keyof SiteContent) => void;
  resetAll: () => void;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

const STORAGE_KEY = "stasi_site_content";
const AUTH_KEY = "stasi_admin_auth";
const ADMIN_PASSWORD = "admin123"; // In production, use proper auth

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Deep merge: top-level keys dari parsed menimpa default,
        // tapi pastikan setiap array/object section tidak hilang jika field baru ditambahkan
        return {
          ...defaultContent,
          ...parsed,
          // Pastikan setiap section object ter-merge dengan benar (bukan sekadar ditimpa)
          hero: { ...defaultContent.hero, ...(parsed.hero ?? {}) },
          welcome: { ...defaultContent.welcome, ...(parsed.welcome ?? {}) },
          contact: { ...defaultContent.contact, ...(parsed.contact ?? {}) },
          profile: { ...defaultContent.profile, ...(parsed.profile ?? {}) },
          footer: { ...defaultContent.footer, ...(parsed.footer ?? {}) },
          navbar: { ...defaultContent.navbar, ...(parsed.navbar ?? {}) },
          // Array sections: gunakan dari parsed jika ada, fallback ke default
          announcements: parsed.announcements ?? defaultContent.announcements,
          homeSchedules: parsed.homeSchedules ?? defaultContent.homeSchedules,
          weeklyMass: parsed.weeklyMass ?? defaultContent.weeklyMass,
          holyDays: parsed.holyDays ?? defaultContent.holyDays,
          sacraments: parsed.sacraments ?? defaultContent.sacraments,
          devotions: parsed.devotions ?? defaultContent.devotions,
          news: parsed.news ?? defaultContent.news,
          organizations: parsed.organizations ?? defaultContent.organizations,
          structure: parsed.structure ?? defaultContent.structure,
          pastor: { ...defaultContent.pastor, ...(parsed.pastor ?? {}) },
          history: parsed.history
            ? { ...defaultContent.history, ...parsed.history, timeline: parsed.history.timeline ?? defaultContent.history.timeline }
            : defaultContent.history,
          visiMisi: parsed.visiMisi
            ? { ...defaultContent.visiMisi, ...parsed.visiMisi, misi: parsed.visiMisi.misi ?? defaultContent.visiMisi.misi }
            : defaultContent.visiMisi,
          wilayah: parsed.wilayah
            ? { ...defaultContent.wilayah, ...parsed.wilayah, items: parsed.wilayah.items ?? defaultContent.wilayah.items }
            : defaultContent.wilayah,
        };
      }
    } catch { }
    return defaultContent;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem(AUTH_KEY) === "true";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  const updateContent = (section: keyof SiteContent, data: SiteContent[keyof SiteContent]) => {
    setContent((prev) => ({ ...prev, [section]: data }));
  };

  const resetSection = (section: keyof SiteContent) => {
    setContent((prev) => ({ ...prev, [section]: defaultContent[section] }));
  };

  const resetAll = () => {
    setContent(defaultContent);
  };

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem(AUTH_KEY, "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <SiteContentContext.Provider value={{ content, updateContent, resetSection, resetAll, isAdmin, login, logout }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error("useSiteContent must be used within SiteContentProvider");
  return ctx;
}

export { defaultContent };
