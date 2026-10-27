// DATASET RESMI PRO PLUS BONUS (ADDENDUM v2.1)
// Tiga Paket Implementasi Eksklusif Tanpa Duplikasi Workspace & Tanpa API AI Berbayar

export interface CampaignInABox {
  id: string;
  title: string;
  niche: string;
  targetAudience: {
    persona: string;
    demographics: string;
    coreProblem: string;
    buyingTrigger: string;
  };
  productSelection: {
    category: string;
    idealPriceRange: string;
    selectionCriteria: string[];
    sampleProducts: {
      name: string;
      price: string;
      estCommissionRate: string;
      reason: string;
    }[];
  };
  contentBriefs: {
    day: number;
    angleType: string;
    headline: string;
    hookScript: string;
    coreMessage: string;
    callToAction: string;
    targetMetric: string;
  }[];
  publishingSchedule: {
    phase: string;
    timeline: string;
    focus: string;
    actionItems: string[];
  }[];
  decisionGuide: {
    condition: string;
    diagnosis: string;
    correctiveAction: string;
  }[];
  assumptionsToCheck: string[];
  launchChecklist: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  niche: string;
  period: string;
  hypothesis: string;
  simulationMetrics: {
    impressions: number;
    clicks: number;
    orders: number;
    gmv: number;
    estimatedCommission: number;
    cancelledOrders: number;
    cancellationLoss: number;
    validCommission: number;
    ctr: string;
    cvr: string;
    epc: string;
    cancellationRate: string;
  };
  chronologicalSteps: {
    stage: string;
    actionTaken: string;
    reasoning: string;
  }[];
  successFactors: string[];
  mistakesAndCorrections: {
    mistake: string;
    impact: string;
    solution: string;
  }[];
  keyTakeaways: string[];
  disclaimer: string;
}

export interface ObjectionPlaybook {
  angleMatrix: {
    goal: string;
    buyerPainPoint: string;
    hookPattern: string;
    structure: string;
    recommendedCTA: string;
    primaryMetric: string;
  }[];
  objectionHandlers: {
    objectionType: string;
    buyerInternalMonologue: string;
    proofElementNeeded: string;
    ethicalResponseFormula: string;
    samplePhrases: string[];
    forbiddenClaims: string[];
  }[];
  prePublishChecklist: string[];
}

// 1. DATA: CAMPAIGN-IN-A-BOX
export const PRO_PLUS_CAMPAIGN_DATA: CampaignInABox = {
  id: 'campaign-01',
  title: 'Kampanye Peluncuran 14 Hari: Solusi Dapur & Smart Living Ramah Kos/Rumah Minimalis',
  niche: 'Home Living & Small Kitchen Appliances',
  targetAudience: {
    persona: 'Anak Kos Mandiri & Pasutri Baru (First-Jobber)',
    demographics: 'Usia 20–32 tahun, tinggal di kamar sewa/apartemen studio berkapasitas daya listrik 900–1300 VA.',
    coreProblem: 'Keterbatasan ruang dapur sempit dan watt listrik terbatas, namun ingin memasak sehat & hemat tanpa ribet mencuci banyak wajan.',
    buyingTrigger: 'Melihat demonstrasi visual kepraktisan 1 alat multifungsi yang bisa menggoreng tanpa minyak dan hemat daya listrik.',
  },
  productSelection: {
    category: 'Peralatan Masak Kompak Low-Watt (Air Fryer Mini & Panci Listrik Multifungsi)',
    idealPriceRange: 'Rp120.000 – Rp280.000',
    selectionCriteria: [
      'Toko berstatus Shopee Mall atau Star+ dengan rating minimal 4.8 bintang (minimal 1.000 review).',
      'Daya listrik tidak melebihi 600 Watt agar aman untuk meteran listrik 900 VA tanpa jeglek.',
      'Tersedia opsi pengiriman Gratis Ongkir XTRA dan garansi resmi minimal 6 bulan.',
      'Komisi Shopee Affiliate murni minimal 5% – 8% (menghasilkan Rp8.000 – Rp18.000 per pesanan lunas).',
    ],
    sampleProducts: [
      {
        name: 'Mini Smart Electric Cooker 1.5L Low Watt (450W)',
        price: 'Rp139.000',
        estCommissionRate: '7.5% (Rp10.425/item)',
        reason: 'Sangat cocok untuk anak kos: bisa merebus mie, kukus telur, dan tumis lauk dalam satu panci.',
      },
      {
        name: 'Compact Air Fryer 2L Anti-Lengket (550W)',
        price: 'Rp249.000',
        estCommissionRate: '6.0% (Rp14.940/item)',
        reason: 'Solusi diet sehat tanpa minyak untuk pekerja kantoran yang tidak punya waktu memasak panjang.',
      },
    ],
  },
  contentBriefs: [
    {
      day: 1,
      angleType: 'Problem Agitation (Relatable Hook)',
      headline: 'Realita Masak di Kos Sempit: Panci Banyak vs Listrik Jeglek',
      hookScript: '"Kalian yang ngekos pasti pernah ngalamin momen mau masak mie instan jam 11 malam tapi takut sekering kamar jeglek?"',
      coreMessage: 'Tunjukkan wajan bertumpuk di wastafel mini, bandingkan dengan kepraktisan satu wadah mini cooker 450W yang ringkas.',
      callToAction: '"Link panci listrik low-watt yang aku pakai ada di bio nomor 01 ya!"',
      targetMetric: 'Retention Rate 3 detik pertama (>65%) & Komentar diskusi',
    },
    {
      day: 3,
      angleType: 'Visual Proof & Practical Demo',
      headline: 'Tes Daya Nyata: Nyalain AC + Panci Ini Sekaligus di Listrik 900VA',
      hookScript: '"Banyak yang nanya: beneran aman nggak buat kos 900 VA? Hari ini kita tes langsung pakai wattmeter colokan!"',
      coreMessage: 'Tunjukkan layar alat ukur watt meter berhenti di 442 Watt stabil, makanan matang dalam 6 menit tanpa pemadaman listrik.',
      callToAction: '"Buat yang butuh alat hemat daya buat sahur/buka, cek link keranjang kuning atau bio nomor 01."',
      targetMetric: 'Click-Through Rate (CTR) link affiliate (>4.5%)',
    },
    {
      day: 6,
      angleType: 'Cost Comparison (Hemat Bulanan)',
      headline: 'Hemat 300 Ribu Sebulan Cuma dengan Ganti Kebiasaan Order Makanan Online',
      hookScript: '"Ini rincian pengeluaran makan di luar vs masak telur kecap 5 menit pakai panci mini ini."',
      coreMessage: 'Bongkar matematika sederhana: pesan ojek online 35rb/porsi vs masak sendiri 12rb/porsi. Modal alat balik modal dalam 1 minggu.',
      callToAction: '"Amankan promo diskon tanggal kembar di etalase bio nomor 01 sebelum voucher toko habis."',
      targetMetric: 'Share to Friends & Save Konten (>150 saves)',
    },
    {
      day: 9,
      angleType: 'Anti-Objection (Uji Lapisan Anti Lengket & Cara Cuci)',
      headline: 'Apakah Susah Dicuci? Uji Masak Telur Tanpa Minyak!',
      hookScript: '"Yang paling bikin malas masak itu cucian wajan berkerak. Nah, mari kita siksa lapisan teflon panci ini."',
      coreMessage: 'Goreng telur tanpa minyak sampai gosong tipis, lalu lap pakai tisu basah dalam sekali usap langsung bersih mengilap.',
      callToAction: '"Biar nggak dapet barang KW tiruan, pastikan beli di toko Official Mall lewat tautan bio no 01."',
      targetMetric: 'Conversion Rate Pesanan (CVR > 3.0%)',
    },
    {
      day: 13,
      angleType: 'Scarcity & Social Proof Roundup',
      headline: '3 Alasan Panci Ini Sudah Terjual Lebih Dari 10.000 Unit Bulan Ini',
      hookScript: '"Setelah 2 minggu pemakaian intensif tiap hari, ini 3 kelebihan dan 1 kekurangan jujur yang wajib kamu tahu."',
      coreMessage: 'Sebutkan kelebihan (cepat panas, kabel bisa dilepas) dan 1 kekurangan minor (kabel bawaan cuma 1 meter jadi butuh colokan dekat meja). Kejujuran ini membangun kepercayaan tinggi.',
      callToAction: '"Stok batch minggu ini sisa sedikit karena lagi flash sale Shopee, langsung checkout di bio ya."',
      targetMetric: 'EPC Bersih & Pesanan Valid',
    },
  ],
  publishingSchedule: [
    {
      phase: 'Fase 1: Validasi Masalah & Penanaman Brand (Hari 1–4)',
      timeline: 'Hari 1 s.d. Hari 4 (Upload Jam 12:00 Siang & 19:30 Malam)',
      focus: 'Membangun empati audiens dan membuktikan klaim daya listrik rendah.',
      actionItems: [
        'Posting Video 1 & Video 2 pada jam istirahat kantor dan waktu santai malam.',
        'Balas semua komentar dalam 1 jam pertama untuk mendongkrak sinyal interaksi algoritma.',
        'Pastikan link bio aktif dan mengarah ke link affiliate yang telah di-shorten resmi.',
      ],
    },
    {
      phase: 'Fase 2: Konversi & Pembuktian Manfaat Nyata (Hari 5–10)',
      timeline: 'Hari 5 s.d. Hari 10',
      focus: 'Mengubah viewers penasaran menjadi klik keranjang melalui demo langsung dan perbandingan biaya.',
      actionItems: [
        'Posting Video 3 & Video 4 dengan penekanan pada link affiliate di pin komentar.',
        'Pantau laporan klik harian di Shopee Affiliate Dashboard untuk melihat rasio klik per view.',
        'Gunakan sticker countdown jika toko mengadakan voucher diskon terbatas.',
      ],
    },
    {
      phase: 'Fase 3: Panen Konversi & Evaluasi Angka (Hari 11–14)',
      timeline: 'Hari 11 s.d. Hari 14',
      focus: 'Mendorong audiens yang masih ragu untuk segera checkout dan menutup kampanye.',
      actionItems: [
        'Posting ulasan jujur kelebihan & kekurangan untuk menghapus sisa keberatan pembeli.',
        'Rekap metrik klik, CVR, dan pesanan pending di Performance Tracker Workspace.',
      ],
    },
  ],
  decisionGuide: [
    {
      condition: 'View di bawah 500 setelah 24 jam tayang',
      diagnosis: 'Hook 3 detik pertama gagal menahan jempol audiens (terlalu lambat atau visual pembuka membosankan).',
      correctiveAction: 'Ganti judul dan 3 detik pembuka: mulai langsung dari adegan ekstrem (misal asap masakan atau bunyi "jeglek" meteran) tanpa basa-basi.',
    },
    {
      condition: 'View tinggi (>10.000) tapi klik link affiliate di bawah 1%',
      diagnosis: 'Panggilan aksi (CTA) terlalu samar atau audiens tidak tahu di mana menemukan tautan produk.',
      correctiveAction: 'Tambahkan teks panah visual di layar yang menunjuk ke lokasi link bio/keranjang, dan sebutkan benefit diskon saat mengklik link.',
    },
    {
      condition: 'Klik tinggi (>500) tapi jumlah checkout sangat rendah (CVR < 1%)',
      diagnosis: 'Halaman toko produk bermasalah: rating toko turun, ongkir terlalu mahal, atau stok warna utama habis.',
      correctiveAction: 'Ganti link affiliate ke toko alternatif bereputasi Star+/Mall lain yang menjual produk serupa dengan harga bersaing.',
    },
  ],
  assumptionsToCheck: [
    'Pastikan produk sampel yang kamu miliki adalah barang fisik asli yang berfungsi normal.',
    'Verifikasi bahwa toko Shopee pilihan masih aktif membalas chat (< 1 jam) dan stok barang tersedia > 100 pcs.',
    'Konfirmasi bahwa skema komisi ekstra toko (jika ada) masih berlaku untuk bulan berjalan.',
  ],
  launchChecklist: [
    'Sampel produk sudah diuji coba masak minimal 3 kali sebelum rekaman.',
    'Pencahayaan video terang dan mikrofon menangkap suara mendesis masakan (efek audio ASMR).',
    'Tautan affiliate sudah di-generate dari Shopee Affiliate App dengan sub-id kampanye (misal: sub_id=panci_dapur_01).',
    'Deskripsi video mencantumkan disclosure resmi: "#ShopeeAffiliate #RekomendasiDapur (Link pembelian di bio)".',
  ],
};

// 2. DATA: AFFILIATE CASE STUDY LAB
export const PRO_PLUS_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-01',
    title: 'Studi Kasus 1: Mengoptimalkan Niche Aksesoris Gadget Ergonomis — Strategi Volume Tinggi pada Margin Sedang',
    niche: 'Mobile Phone & Laptop Ergonomic Accessories',
    period: 'Periode Analisis: 30 Hari Kampanye Organik',
    hypothesis: 'Audiens pekerja remote/mahasiswa memiliki kebutuhan tinggi untuk stand laptop dan holder handphone portabel di bawah Rp100.000. Dengan menonjolkan perbandingan postur tubuh leher bungkuk vs tegak, conversion rate akan menembus >4% meskipun komisi per item hanya Rp4.000–Rp6.000.',
    simulationMetrics: {
      impressions: 142500,
      clicks: 6840,
      orders: 312,
      gmv: 24648000,
      estimatedCommission: 1725360,
      cancelledOrders: 14,
      cancellationLoss: 77400,
      validCommission: 1647960,
      ctr: '4.80%',
      cvr: '4.56%',
      epc: 'Rp240.93',
      cancellationRate: '4.48%',
    },
    chronologicalSteps: [
      {
        stage: 'Minggu 1: Pemilihan Produk & Uji Validasi Niche',
        actionTaken: 'Memilih Stand Laptop Aluminium Lipat harga Rp79.000 di toko Star+ dengan 12.000 ulasan positif.',
        reasoning: 'Harga di bawah Rp100.000 membuat impulse buying tinggi tanpa pertimbangan panjang dari pembeli.',
      },
      {
        stage: 'Minggu 2: Penerbitan 6 Konten Pendek dengan Format Split-Screen',
        actionTaken: 'Menampilkan layar terbelah: sisi kiri postur leher pegal tanpa stand, sisi kanan postur tegak nyaman saat mengetik.',
        reasoning: 'Konten komparasi visual langsung menyentuh titik sakit fisik (nyeri leher) yang dirasakan calon pembeli tiap hari.',
      },
      {
        stage: 'Minggu 3: Pengoptimalan Penempatan Link & Jawaban Komentar',
        actionTaken: 'Membuat link bio terorganisir dengan nomor kode yang jelas dan menyematkan link toko di video teratas.',
        reasoning: 'Mengurangi friksi audiens saat mencari link produk yang sedang trending di profil.',
      },
      {
        stage: 'Minggu 4: Retensi Pembeli & Skalasi Konten Turunan',
        actionTaken: 'Membuat variasi konten kedua: uji ketahanan beban dengan meletakkan buku tebal 5 kg di atas stand.',
        reasoning: 'Menghilangkan keraguan calon pembeli apakah stand berbahan plastik/ringkih mudah patah.',
      },
    ],
    successFactors: [
      'Visualisasi rasa sakit (neck pain) yang sangat relatable bagi jutaan orang yang menatap layar tiap hari.',
      'Harga produk di bawah titik resistensi psikologis pembeli online Indonesia (< Rp100.000).',
      'Rasio retur/pembatalan sangat rendah (hanya 4.48%) karena produk tidak memiliki ukuran pakaian yang rentan salah pilih.',
    ],
    mistakesAndCorrections: [
      {
        mistake: 'Pada 3 hari awal, link affiliate diarahkan ke toko termurah tapi waktu pengirimannya dari luar negeri (Cross-border).',
        impact: 'Banyak calon pembeli membatalkan checkout karena estimasi tiba barang 10–14 hari.',
        solution: 'Segera mengalihkan tautan ke toko lokal asal Jakarta/Surabaya dengan estimasi tiba 2–3 hari walaupun harga produk lebih mahal Rp3.000.',
      },
    ],
    keyTakeaways: [
      'Kecepatan pengiriman toko jauh lebih berpengaruh terhadap Conversion Rate daripada selisih harga murah Rp2.000.',
      'Untuk niche aksesoris kerja, pembuktian ketahanan fisik (uji beban) adalah faktor penentu konversi tertinggi.',
    ],
    disclaimer: 'Peringatan: Data di atas merupakan hasil simulasi terstruktur berbasis pola empiris kampanye nyata. Kinerja setiap individu dapat berbeda tergantung kualitas konten, algoritma platform, reputasi toko mitra, dan tren pasar yang berlaku.',
  },
  {
    id: 'case-02',
    title: 'Studi Kasus 2: Audit & Penyelamatan Kampanye Skincare Viral — Mengatasi Rasio Pembatalan Pesanan Tinggi (High Cancellation Audit)',
    niche: 'Beauty & Personal Care',
    period: 'Periode Analisis: 21 Hari Audit Penyelamatan',
    hypothesis: 'Video review skincare yang menghasilkan klik masif seringkali menderita rasio pembatalan pesanan (cancellation rate) di atas 18% akibat sistem bayar di tempat (COD) yang gagal kirim atau toko lambat memproses resi. Melalui audit toko dan edukasi payment non-COD, komisi valid dapat diamankan.',
    simulationMetrics: {
      impressions: 288000,
      clicks: 11520,
      orders: 480,
      gmv: 42240000,
      estimatedCommission: 4224000,
      cancelledOrders: 91,
      cancellationLoss: 800800,
      validCommission: 3423200,
      ctr: '4.00%',
      cvr: '4.16%',
      epc: 'Rp297.15',
      cancellationRate: '18.95%',
    },
    chronologicalSteps: [
      {
        stage: 'Tahap 1: Deteksi Anomali pada Dashboard Affiliate',
        actionTaken: 'Mendapati bahwa dari 480 pesanan yang tercatat, hampir 1 dari 5 pesanan berstatus Batal/Retur COD.',
        reasoning: 'Rasio pembatalan di atas 15% menggerus profit bersih dan membuang impresi traffic yang sudah mahal didapatkan.',
      },
      {
        stage: 'Tahap 2: Investigasi Penyebab Akar Masalah (Root Cause Analysis)',
        actionTaken: 'Melakukan penyamaran pesanan (mystery shopping) ke toko mitra affiliate.',
        reasoning: 'Menemukan bahwa toko mitra membutuhkan waktu 3–4 hari kerja hanya untuk menyerahkan paket ke kurir, menyebabkan pembeli COD berubah pikiran.',
      },
      {
        stage: 'Tahap 3: Tindakan Korektif Cepat (SOP Pengalihan Toko)',
        actionTaken: 'Mengubah seluruh shortlink affiliate di bio ke Toko Official Mall yang memiliki jaminan pengiriman Same Day / 24 Jam.',
        reasoning: 'Kecepatan pengemasan toko resmi langsung memangkas waktu tunggu sehingga pembeli tidak sempat menolak paket COD.',
      },
      {
        stage: 'Tahap 4: Edukasi Konten Tambahan & Klarifikasi Manfaat',
        actionTaken: 'Membuat video edukasi cara klaim gratis ongkir menggunakan SpayLater/ShopeePay agar pembeli beralih dari COD tunai ke pembayaran digital.',
        reasoning: 'Pesanan non-COD memiliki rasio penolakan kurir mendekati 0.5% (sangat stabil).',
      },
    ],
    successFactors: [
      'Kecepatan affiliate dalam memantau 4 status komisi (Estimasi vs Valid) di dashboard sehingga anomali cepat terdeteksi.',
      'Keberanian mengganti toko mitra meskipun komisi toko awal tampak sedikit lebih besar di atas kertas.',
      'Edukasi cara pembayaran digital yang menguntungkan pembeli (dapat voucher diskon tambahan).',
    ],
    mistakesAndCorrections: [
      {
        mistake: 'Tergiur janji komisi toko 12% dari seller non-star tanpa mengecek performa chat dan kecepatan kirim paket.',
        impact: 'Kehilangan estimasi komisi Rp800.000 akibat paket ditolak saat tiba di alamat pembeli.',
        solution: 'Menetapkan standar baku: hanya mempromosikan toko dengan performa chat > 90% dan kecepatan kirim < 24 jam.',
      },
    ],
    keyTakeaways: [
      'Komisi persentase tinggi tidak ada artinya jika barang tidak pernah sampai ke tangan pembeli secara lunas.',
      'Prioritaskan integritas toko pengirim: Shopee Mall dan Star+ terverifikasi adalah benteng keamanan komisi affiliate.',
    ],
    disclaimer: 'Peringatan: Kasus ini disajikan sebagai sarana pembelajaran analisis keputusan komersial. Hindari klaim berlebihan mengenai khasiat obat/kosmetik yang dilarang regulasi BPOM dan Shopee.',
  },
];

// 3. DATA: CONTENT ANGLE & OBJECTION PLAYBOOK
export const PRO_PLUS_OBJECTION_PLAYBOOK: ObjectionPlaybook = {
  angleMatrix: [
    {
      goal: 'Edukasi & Kesadaran Masalah (Top-of-Funnel)',
      buyerPainPoint: 'Pembeli belum sadar bahwa metode lama mereka menimbulkan kerugian atau pemborosan waktu.',
      hookPattern: '"3 kesalahan fatal saat [aktivitas sehari-hari] yang bikin kamu buang-buang uang..."',
      structure: 'Sebutkan kesalahan -> Tunjukkan dampak buruknya -> Kenalkan kategori solusi tanpa hard-selling.',
      recommendedCTA: '"Kira-kira kalian sering lakuin yang nomor berapa? Tulis di komentar ya!"',
      primaryMetric: 'Rasio tonton video hingga 50% & Jumlah komentar',
    },
    {
      goal: 'Demonstrasi Produk Nyata (Mid-Funnel)',
      buyerPainPoint: 'Pembeli ingin melihat apakah barang benar-benar bekerja seperti di iklan promosi.',
      hookPattern: '"Beli barang viral ini biar kalian nggak perlu beli: mari kita uji langsung apakah zonk atau jackpot!"',
      structure: 'Buka kemasan -> Uji fungsi utama dalam kondisi ekstrem -> Tunjukkan hasil nyata tanpa filter.',
      recommendedCTA: '"Yang mau barang aslinya, link tokonya sudah aku taruh di bio nomor urut [X]."',
      primaryMetric: 'Click-Through Rate (CTR) link affiliate (>4%)',
    },
    {
      goal: 'Komparasi Berdampingan (Decision-Stage)',
      buyerPainPoint: 'Pembeli bingung memilih antara opsi murah Rp50rb vs opsi berkualitas Rp120rb.',
      hookPattern: '"Beda 70 ribu dapet apa aja? Perbandingan langsung produk A vs produk B."',
      structure: 'Bandingkan material fisik -> Uji keawetan -> Berikan rekomendasi spesifik untuk profil pemakai.',
      recommendedCTA: '"Kalau budget mepet ambil A, tapi kalau mau awet bertahun-tahun langsung checkout B di bio."',
      primaryMetric: 'Conversion Rate Pesanan (CVR > 3.5%)',
    },
    {
      goal: 'Solusi Masalah Mendesak (Problem-Solve Direct)',
      buyerPainPoint: 'Pembeli butuh solusi cepat untuk masalah yang mengganggu hari ini juga.',
      hookPattern: '"Buat yang kamarnya sering lembap dan bau apek, tonton video 30 detik ini sampai habis."',
      structure: 'Sorot masalah menjengkelkan -> Tunjukkan alat bekerja dalam 1 detik -> Buktikan aroma segar/hasil instan.',
      recommendedCTA: '"Lagi ada voucher diskon ongkir di keranjang bawah, langsung amankan sebelum habis."',
      primaryMetric: 'Add to Cart Rate & Direct Checkout',
    },
    {
      goal: 'Anti-Objection & Penghancur Keraguan (Closing-Stage)',
      buyerPainPoint: 'Pembeli ingin beli tapi takut kecewa, takut barang tiruan, atau takut rusak di jalan.',
      hookPattern: '"Banyak yang takut beli ini karena takut [keberatan utama]. Ini fakta sebenarnya setelah kubongkar..."',
      structure: 'Sebutkan ketakutan utama -> Tunjukkan garansi resmi & packing tebal -> Tunjukkan bukti keaslian.',
      recommendedCTA: '"Beli lewat link di bio karena tokonya berani garansi ganti baru 100% jika rusak."',
      primaryMetric: 'Penurunan Pembatalan & Lonjakan Valid Commission',
    },
  ],
  objectionHandlers: [
    {
      objectionType: '1. Keraguan Harga: "Apakah barang semurah ini berkualitas atau cepat rusak?"',
      buyerInternalMonologue: 'Harganya cuma Rp45.000, jangan-jangan seminggu dipakai sudah jebol dan buang duit.',
      proofElementNeeded: 'Demonstrasi ketahanan fisik: tekan sambungan material, tekuk plastik, atau uji di air.',
      ethicalResponseFormula: 'Akui materialnya sesuai kelas harganya secara proporsional, jelaskan batasan pemakaian wajarnya tanpa melebih-lebihkan.',
      samplePhrases: [
        '"Jujur dengan harga 50 ribuan, bahannya bukan besi baja, tapi plastik ABS tebal yang sangat solid buat pemakaian harian."',
        '"Aku sudah pakai barang ini 4 bulan non-stop tiap pagi, dan ini kondisi fisiknya: masih mulus tanpa kendala."',
      ],
      forbiddenClaims: [
        'DILARANG: Mengklaim "Dijamin seumur hidup tidak akan rusak".',
        'DILARANG: Membandingkan dengan brand jutaan rupiah secara tidak adil dan tidak ilmiah.',
      ],
    },
    {
      objectionType: '2. Keraguan Kebutuhan: "Apakah saya benar-benar butuh sekarang atau cuma lapar mata?"',
      buyerInternalMonologue: 'Barangnya lucu, tapi kalau nanti cuma jadi pajangan di pojok kamar kan sayang uangnya.',
      proofElementNeeded: 'Kalkulasi frekuensi penggunaan mingguan vs nilai penghematan rupiah nyata.',
      ethicalResponseFormula: 'Bandingkan biaya membeli produk dengan akumulasi pengeluaran sepele yang sering terbuang.',
      samplePhrases: [
        '"Kalau kamu cuma masak sebulan sekali, nggak usah beli ini. Tapi kalau kamu masak tiap hari, alat ini menghemat 20 menit waktumu setiap pagi."',
        '"Harganya setara 2 gelas kopi kekinian, tapi bisa kamu pakai ratusan kali di kosan."',
      ],
      forbiddenClaims: [
        'DILARANG: Melakukan fear-mongering ("Kalau nggak beli hidupmu bakal rugi selamanya").',
      ],
    },
    {
      objectionType: '3. Keraguan Toko & Keaslian: "Takut dapet barang tiruan atau seller fiktif."',
      buyerInternalMonologue: 'Di Shopee banyak toko foto sama tapi barang yang dikirim beda jauh kualitasnya.',
      proofElementNeeded: 'Tampilan tangkapan layar lencana Shopee Mall / Star+, jumlah ribuan review bintang 5, dan sertifikasi resmi.',
      ethicalResponseFormula: 'Tunjukkan langkah tepat memilih toko: verifikasi nama toko yang kamu tautkan di bio.',
      samplePhrases: [
        '"Biar nggak zonk dapet produk kw, pastikan hanya beli di toko official yang ada centang merah Mall di link bio."',
        '"Ini resi dan bukti unboxing waktu barang pertamaku datang langsung dari gudang resminya."',
      ],
      forbiddenClaims: [
        'DILARANG: Menuduh toko kompetitor lain secara spesifik sebagai penipu tanpa dasar hukum.',
      ],
    },
    {
      objectionType: '4. Keraguan Pengiriman: "Takut barang pecah di jalan saat dikirim kurir."',
      buyerInternalMonologue: 'Produk kaca/elektronik rawan dibanting kurir ekspedisi pas pengiriman antarkota.',
      proofElementNeeded: 'Rekam kondisi paket saat baru dibuka: tunjukkan ketebalan bubble wrap lapis 3 dan kardus tebal.',
      ethicalResponseFormula: 'Beritahukan cara klaim garansi toko jika ada kerusakan paket saat tiba di rumah.',
      samplePhrases: [
        '"Tokonya pakai bubble wrap super tebal 3 lapis plus kardus bersegel, jadi aman dikirim sampai ke luar pulau."',
        '"Wajib buat video unboxing pas paket datang ya, karena toko ini ganti 100% tanpa ribet kalau ada pecah."',
      ],
      forbiddenClaims: [
        'DILARANG: Menjamin kurir 100% tidak akan terlambat dalam situasi cuaca ekstrem atau bencana.',
      ],
    },
    {
      objectionType: '5. Keraguan Manfaat: "Apakah hasilnya beneran nyata atau cuma trik editan video?"',
      buyerInternalMonologue: 'Video kreator zaman sekarang banyak pakai efek lighting dan filter kecantikan palsu.',
      proofElementNeeded: 'Tampilkan perbandingan langsung di bawah pencahayaan lampu alami tanpa filter saturasi warna.',
      ethicalResponseFormula: 'Tunjukkan proses step-by-step secara berurutan tanpa potongan klip yang mencurigakan.',
      samplePhrases: [
        '"Ini aku rekam di depan jendela kamar siang hari pakai kamera biasa tanpa filter apa pun, biar kalian bisa lihat tekstur aslinya."',
        '"Hasil di tiap orang bisa beda tergantung jenis kulit, tapi di aku dalam 14 hari perubahannya seperti ini."',
      ],
      forbiddenClaims: [
        'DILARANG: Menjanjikan "Pasti putih dalam 3 hari" atau klaim medis pengobatan tanpa izin BPOM.',
      ],
    },
  ],
  prePublishChecklist: [
    'Konten sudah menyasar minimal 1 sudut pandang spesifik dari matriks (bukan video acak).',
    'Setiap keraguan utama audiens sudah dijawab dengan bukti demonstrasi visual konkret.',
    'Tidak ada klaim berlebihan yang melanggar ketentuan Shopee Community Guidelines atau hukum periklanan konsumen.',
    'Panggilan aksi (CTA) jelas mengarahkan audiens ke tautan affiliate resmi tanpa kata-kata mengecoh.',
    'Disclosure kemitraan affiliate (#ShopeeAffiliate) sudah terpasang dengan jelas.',
  ],
};
