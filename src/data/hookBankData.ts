export interface HookTemplate {
  id: string;
  category: 'masalah' | 'penasaran' | 'demonstrasi' | 'komparasi' | 'keberatan';
  categoryLabel: string;
  hookText: string;
  exampleContext: string;
  angle: string;
}

export const HOOK_BANK: HookTemplate[] = [
  // 1. KATEGORI: MASALAH (Problem-Centric)
  {
    id: 'h01',
    category: 'masalah',
    categoryLabel: 'Masalah',
    hookText: 'Pernah nggak sih kamu ngerasa frustrasi gara-gara [MASALAH_UTAMA] padahal udah coba [CARA_LAMA]?',
    exampleContext: 'Pernah nggak sih kamu ngerasa frustrasi gara-gara leher pegel waktu kerja padahal udah coba bantal duduk biasa?',
    angle: 'Sentuh titik sakit audiens langsung di detik pertama.'
  },
  {
    id: 'h02',
    category: 'masalah',
    categoryLabel: 'Masalah',
    hookText: 'Stop buang duit buat [PRODUK_MAHAL] kalau kamu masih punya masalah [MASALAH_SPESIFIK] ini!',
    exampleContext: 'Stop buang duit buat skincare jutaan kalau kamu masih sering males bersihin muka pake oil cleanser!',
    angle: 'Pola interupsi peringatan pemborosan uang.'
  },
  {
    id: 'h03',
    category: 'masalah',
    categoryLabel: 'Masalah',
    hookText: 'Kalau kamu sering ngalamin [MASALAH], tonton video ini 30 detik aja sebelum makin parah.',
    exampleContext: 'Kalau kamu sering ngalamin wajan lengket pas masak telur, tonton video ini 30 detik sebelum wajanmu rusak.',
    angle: 'Urgensi mencegah konsekuensi negatif.'
  },
  {
    id: 'h04',
    category: 'masalah',
    categoryLabel: 'Masalah',
    hookText: 'Kenapa ya banyak orang nggak sadar kalau [MASALAH_TERSEMBUNYI] itu penyebab utama [DAMPAK_BURUK]?',
    exampleContext: 'Kenapa ya banyak orang nggak sadar kalau kabel charger kusut itu penyebab utama port HP cepet rusak?',
    angle: 'Mengungkap kesalahan tersembunyi.'
  },
  {
    id: 'h05',
    category: 'masalah',
    categoryLabel: 'Masalah',
    hookText: 'Jujur, tadinya aku nyerah sama [MASALAH], sampai akhirnya nemu satu barang kecil ini...',
    exampleContext: 'Jujur, tadinya aku nyerah sama noda minyak di kompor, sampai akhirnya nemu satu sabun scrub ini...',
    angle: 'Storytelling empati dari keputusasaan ke solusi.'
  },
  {
    id: 'h06',
    category: 'masalah',
    categoryLabel: 'Masalah',
    hookText: 'Tiga tanda kalau kamu butuh ganti [BENDA_LAMA] kamu sekarang juga!',
    exampleContext: 'Tiga tanda kalau kamu butuh ganti botol minum anak kamu sekarang juga!',
    angle: 'Checklist self-diagnostic yang memicu rasa butuh.'
  },

  // 2. KATEGORI: RASA INGIN TAHU (Curiosity Gap)
  {
    id: 'h07',
    category: 'penasaran',
    categoryLabel: 'Penasaran',
    hookText: 'Barang under [HARGA_MURAH] di Shopee yang bikin aku mikir: "Kok bisa sebagus ini harganya segini?!"',
    exampleContext: 'Barang under 30 ribuan di Shopee yang bikin aku mikir: "Kok bisa sebagus ini harganya segini?!"',
    angle: 'Kontras harga murah vs nilai guna luar biasa.'
  },
  {
    id: 'h08',
    category: 'penasaran',
    categoryLabel: 'Penasaran',
    hookText: 'Ternyata ini rahasia [HASIL_DESIRED] tanpa perlu keluar biaya [BIAYA_BESAR]!',
    exampleContext: 'Ternyata ini rahasia bikin kopi ala kafe di rumah tanpa perlu beli mesin jutaan!',
    angle: 'Shortcut rahasia hemat biaya.'
  },
  {
    id: 'h09',
    category: 'penasaran',
    categoryLabel: 'Penasaran',
    hookText: 'Aku beli barang Shopee paling viral minggu ini, dan ternyata hasilnya...',
    exampleContext: 'Aku beli pel lantai putar paling viral minggu ini di Shopee, dan ternyata hasilnya...',
    angle: 'Uji coba produk viral secara objektif.'
  },
  {
    id: 'h10',
    category: 'penasaran',
    categoryLabel: 'Penasaran',
    hookText: 'Jangan beli [PRODUK] ini sebelum kamu tahu 1 kekurangan fatalnya!',
    exampleContext: 'Jangan beli vacuum cleaner mini ini sebelum kamu tahu 1 kekurangan fatalnya!',
    angle: 'Reverse psychology & ulasan jujur.'
  },
  {
    id: 'h11',
    category: 'penasaran',
    categoryLabel: 'Penasaran',
    hookText: 'Barang kecil yang kelihatannya sepele, tapi langsung ngerubah cara aku [AKTIVITAS_HARIAN].',
    exampleContext: 'Barang kecil yang kelihatannya sepele, tapi langsung ngerubah cara aku nata kabel meja kerja.',
    angle: 'Ekspektasi rendah menjadi kejutan manfaat.'
  },
  {
    id: 'h12',
    category: 'penasaran',
    categoryLabel: 'Penasaran',
    hookText: 'Kenapa barang seharga [NOMINAL] ini terjual puluhan ribu pieces di Shopee? Mari kita bedah!',
    exampleContext: 'Kenapa pisau set seharga 45 ribu ini terjual 50 ribu pcs di Shopee? Mari kita bedah!',
    angle: 'Social proof berbasis volume penjualan.'
  },

  // 3. KATEGORI: DEMONSTRASI (Proof & Action)
  {
    id: 'h13',
    category: 'demonstrasi',
    categoryLabel: 'Demonstrasi',
    hookText: 'Liat bedanya sebelum vs sesudah pake [NAMA_PRODUK] ini dalam 5 detik...',
    exampleContext: 'Liat bedanya sebelum vs sesudah pake pembersih kerak kamar mandi ini dalam 5 detik...',
    angle: 'Visual proof langsung tanpa basa-basi.'
  },
  {
    id: 'h14',
    category: 'demonstrasi',
    categoryLabel: 'Demonstrasi',
    hookText: 'Uji ketahanan ekstrem: Apakah [NAMA_PRODUK] ini beneran tahan [UJI_COBA]?',
    exampleContext: 'Uji ketahanan ekstrem: Apakah payung lipat 30 ribuan ini beneran tahan angin kencang?',
    angle: 'Stress-test produk secara langsung.'
  },
  {
    id: 'h15',
    category: 'demonstrasi',
    categoryLabel: 'Demonstrasi',
    hookText: 'Tutorial bikin [HASIL_KEREN] cuma pake satu alat praktis ini!',
    exampleContext: 'Tutorial bikin sarapan telur gulung estetik cuma pake wajan sekat ini!',
    angle: 'Instruksi praktis yang mudah ditiru.'
  },
  {
    id: 'h16',
    category: 'demonstrasi',
    categoryLabel: 'Demonstrasi',
    hookText: 'Mari kita tes klaim seller yang bilang produk ini bisa [KLAIM_SELLER]...',
    exampleContext: 'Mari kita tes klaim seller yang bilang lem ini bisa nahan beban 20 kg...',
    angle: 'Investigasi objektivitas klaim penjual.'
  },
  {
    id: 'h17',
    category: 'demonstrasi',
    categoryLabel: 'Demonstrasi',
    hookText: 'Unboxing dan pasang sendiri [PRODUK] dalam waktu kurang dari 3 menit!',
    exampleContext: 'Unboxing dan pasang sendiri rak sepatu gantung dalam waktu 3 menit!',
    angle: 'Kemudahan instalasi tanpa tukang.'
  },
  {
    id: 'h18',
    category: 'demonstrasi',
    categoryLabel: 'Demonstrasi',
    hookText: 'Trik rahasia pake [PRODUK] biar hasilnya 2x lipat lebih maksimal!',
    exampleContext: 'Trik rahasia pake tripod bluetooth ini biar video kamu nggak goyang sama sekali!',
    angle: 'Tips pro memaksimalkan fungsi alat.'
  },

  // 4. KATEGORI: KOMPARASI (Head-to-Head)
  {
    id: 'h19',
    category: 'komparasi',
    categoryLabel: 'Komparasi',
    hookText: 'Produk harga Rp[MURAH] vs Rp[MAHAL]: Mana yang beneran worth it dibeli?',
    exampleContext: 'Mic clip-on harga 50 ribu vs 300 ribu: Mana yang beneran worth it buat pemula?',
    angle: 'Komparasi nilai guna berdasarkan anggaran.'
  },
  {
    id: 'h20',
    category: 'komparasi',
    categoryLabel: 'Komparasi',
    hookText: 'Dua produk paling populer di Shopee untuk [KEBUTUHAN], ini pemenang aslinya!',
    exampleContext: 'Dua botol tumbler paling populer di Shopee, ini pemenang tahan dingin aslinya!',
    angle: 'Penyelesaian dilema pembeli antara 2 opsi populer.'
  },
  {
    id: 'h21',
    category: 'komparasi',
    categoryLabel: 'Komparasi',
    hookText: 'Daripada beli [BARANG_A] mending pilih [BARANG_B], ini 3 alasannya...',
    exampleContext: 'Daripada beli rak piring besi biasa mending pilih rak lipat stainless, ini 3 alasannya...',
    angle: 'Rekomendasi upgrade produk yang lebih efisien.'
  },
  {
    id: 'h22',
    category: 'komparasi',
    categoryLabel: 'Komparasi',
    hookText: 'Battle produk viral: Toko A vs Toko B, jangan sampai salah checkout!',
    exampleContext: 'Battle cermin LED viral: Toko A vs Toko B, jangan sampai salah checkout!',
    angle: 'Membantu pembeli memilih seller terbaik.'
  },
  {
    id: 'h23',
    category: 'komparasi',
    categoryLabel: 'Komparasi',
    hookText: 'Versi KW vs Versi Asli: Apakah ada bedanya untuk pemakaian sehari-hari?',
    exampleContext: 'Case HP murah vs Case branded: Apakah ada bedanya untuk proteksi jatuh?',
    angle: 'Evaluasi rasional versus prestise merk.'
  },
  {
    id: 'h24',
    category: 'komparasi',
    categoryLabel: 'Komparasi',
    hookText: 'Udah coba 4 merk berbeda, cuma merk ini yang beneran awet lebih dari setahun!',
    exampleContext: 'Udah coba 4 merk gantungan baju, cuma merk ini yang nggak patah pas jemur jeans!',
    angle: 'Otoritas pengalaman jangka panjang.'
  },

  // 5. KATEGORI: SOLUSI KEBERATAN (Objection Handling)
  {
    id: 'h25',
    category: 'keberatan',
    categoryLabel: 'Solusi Keberatan',
    hookText: 'Pasti kamu mikir barang harga segini ringkih kan? Sama, awalnya aku juga mikir gitu...',
    exampleContext: 'Pasti kamu mikir payung 20 ribuan ringkih kan? Sama, awalnya aku juga mikir gitu...',
    angle: 'Menjawab keraguan kualitas harga murah.'
  },
  {
    id: 'h26',
    category: 'keberatan',
    categoryLabel: 'Solusi Keberatan',
    hookText: 'Buat kamu yang takut ribet bersihinnya: tenang, alat ini cuma butuh dibilas air!',
    exampleContext: 'Buat kamu yang takut ribet bersihin blender portable: tenang, ini cuma butuh dibilas air!',
    angle: 'Menghapus hambatan kemalasan perawatan.'
  },
  {
    id: 'h27',
    category: 'keberatan',
    categoryLabel: 'Solusi Keberatan',
    hookText: 'Nggak punya keahlian [SKILL]? Alat ini didesain biar siapa pun bisa langsung pakai!',
    exampleContext: 'Nggak punya keahlian potong rambut? Alat cukur ini didesain biar pemula nggak bakal luka!',
    angle: 'Menghapus keraguan keahlian teknis.'
  },
  {
    id: 'h28',
    category: 'keberatan',
    categoryLabel: 'Solusi Keberatan',
    hookText: 'Takut nggak muat di ruangan sempit? Coba liat pas alat ini dilipat...',
    exampleContext: 'Takut nggak muat di kamar kos sempit? Coba liat pas jemuran handuk ini dilipat...',
    angle: 'Menjawab batasan ruang kamar/rumah kos.'
  },
  {
    id: 'h29',
    category: 'keberatan',
    categoryLabel: 'Solusi Keberatan',
    hookText: 'Banyak yang nanya: "Beneran hemat listrik nggak?" Mari kita ukur pake watt meter!',
    exampleContext: 'Banyak yang nanya: "Air fryer ini beneran hemat listrik nggak?" Mari kita ukur pake watt meter!',
    angle: 'Validasi data konsumsi daya.'
  },
  {
    id: 'h30',
    category: 'keberatan',
    categoryLabel: 'Solusi Keberatan',
    hookText: 'Kalau kamu ragu beli ini karena takut zonk, perhatikan 2 detail penting ini sebelum checkout...',
    exampleContext: 'Kalau kamu ragu beli sprei online karena takut kasar, perhatikan 2 detail bahan ini...',
    angle: 'Edukasi panduan pembeli bijak.'
  }
];
