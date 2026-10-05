// PERTEMUAN 5 — JavaScript Dasar dan DOM
//
// Sama seperti index.html di m01: kode ini sengaja ditulis "asal jalan".
// Sebagian fungsi punya bug kecil, sebagian lain baru separuh jadi (tandanya
// komentar TODO). Perbaiki dan lengkapi bertahap, Level 1 sampai 10.
//
// Baca SOAL.md, lalu jalankan:  npm run levels
// File yang kalian sentuh: hanya file ini. Jangan ubah index.html atau test/.

export const katalog = [
  { judul: 'Laskar Pelangi', penulis: 'Andrea Hirata', harga: 45000, tersedia: true },
  { judul: 'Bumi Manusia', penulis: 'Pramoedya Ananta Toer', harga: 60000, tersedia: false },
  { judul: 'Cantik Itu Luka', penulis: 'Eka Kurniawan', harga: 55000, tersedia: true },
  { judul: 'Negeri 5 Menara', penulis: 'Ahmad Fuadi', harga: 40000, tersedia: true },
  { judul: 'Ayat-Ayat Cinta', penulis: 'Habiburrahman El Shirazy', harga: 0, tersedia: false },
];

// Level 1 — ada bug: harga 0 malah menampilkan "Rp" tanpa angka sama sekali.
export function formatRupiah(angka) {
  if (angka === undefined || angka === null || Number.isNaN(angka)) {
    return 'Rp 0';
  }
  
  return 'Rp ' + String(Math.round(Number(angka))).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Level 2 — TODO: kembalikan buku yang `tersedia` saja, TANPA mengubah
// array `daftar` yang asli (jangan pakai .sort/.splice/push ke `daftar`).
export function saringTersedia(daftar) {
  return daftar.filter((buku) => buku.tersedia);
}
// Level 3 — TODO: ambil elemen #judul-pengumuman dengan querySelector,
// lalu ubah teksnya menjadi HURUF BESAR SEMUA.
export function sorotJudulPengumuman() {

  const judul = document.querySelector('#judul-pengumuman');
 
  judul.textContent = judul.textContent.toUpperCase();
}

// Level 4 — TODO: ambil SEMUA <li> di #daftar-pengumuman dengan
// querySelectorAll. Untuk setiap <li> yang teksnya mengandung kata "tutup"
// (tanpa peduli huruf besar/kecil), tambahkan prefix "⚠ " di depan teksnya.
// Jangan tambahkan prefix dua kali kalau fungsi ini terpanggil berulang.
export function tandaiPengumumanPenting() {
  
  const semuaLi = document.querySelectorAll('#daftar-pengumuman li');
 
  for (const li of semuaLi) {
    const teks = li.textContent.trim();
 
    if (teks.toLowerCase().includes('tutup') && !teks.startsWith('⚠')) {
      li.textContent = '⚠ ' + teks;
    }
  }
}

// Level 5 — TODO: buat SATU elemen <article> untuk satu buku, memakai
// document.createElement dan textContent (BUKAN inner HTML — aturan ini
// berlaku untuk seluruh file, bukan cuma fungsi ini).
// Struktur minimal: <article><h3>judul</h3><p>penulis</p><p>harga</p></article>
// Kembalikan elemen itu (jangan langsung ditempel ke halaman di sini).
export function buatKartuBuku(buku) {
  const kartu = document.createElement('article'); 
 
  const judul = document.createElement('h3');
  judul.textContent = buku.judul;
 
  const penulis = document.createElement('p');
  penulis.textContent = buku.penulis;
 
  const harga = document.createElement('p');
  harga.textContent = formatRupiah(buku.harga);
 
  kartu.append(judul, penulis, harga); 
  return kartu;                        
}

// Level 6 & 10 — TODO: kosongkan #katalog, lalu render ulang dari `data`.
// Fungsi ini HARUS dipakai untuk semua kondisi tampilan katalog: daftar
// penuh, hasil pencarian, maupun daftar kosong (Level 9 dan Level 10 sama-
// sama lewat sini, jangan bikin fungsi render terpisah).
// - Perbarui #ringkasan, misalnya "5 buku ditemukan".
// - Kalau `data` kosong, tampilkan pesan di dalam #katalog, misalnya
//   "Tidak ada buku yang cocok." — jangan biarkan #katalog kosong melompong.
// - Setiap kartu yang ditampilkan harus bisa diklik (lihat Level 7).
export function render(data) {
  const wadah = document.querySelector('#katalog');
  const ringkasan = document.querySelector('#ringkasan');
 
  // 1. Kosongkan dulu, supaya tidak dobel kalau render dipanggil lagi.
  wadah.replaceChildren();
 
  // 2. Perbarui ringkasan (test mencari angka jumlah buku di sini).
  ringkasan.textContent = `${data.length} buku ditemukan`;

  // Kalau data kosong, tampilkan pesan lalu berhenti.
  if (data.length === 0) {
    const pesan = document.createElement('p');
    pesan.textContent = 'Tidak ada buku yang cocok.';
    wadah.append(pesan);
    return;
  }
 
  // 3. Satu kartu per buku, lewat for...of.
  for (const buku of data) {
    const kartu = buatKartuBuku(buku);
    kartu.addEventListener('click', () => tampilkanDetail(buku));
    wadah.append(kartu);
  }
}

// Level 7 — dipanggil saat sebuah kartu diklik. TODO: tampilkan judul,
// penulis, dan harga buku itu di #panel-detail (textContent, bukan inner HTML).
function tampilkanDetail(buku) {
  const panel = document.querySelector('#panel-detail');

  const judul = document.createElement('h3');
  judul.textContent = buku.judul;

  const penulis = document.createElement('p');
  penulis.textContent = 'Penulis: ' + buku.penulis;

  const harga = document.createElement('p');
  harga.textContent = 'Harga: ' + formatRupiah(buku.harga);

  panel.replaceChildren(judul, penulis, harga);
}

// Level 8 & 9 — TODO: pasang event listener 'submit' pada #form-cari.
// - Level 8: cegah reload halaman (preventDefault).
// - Level 9: ambil nilai #input-cari, saring `katalog` yang judulnya
//   mengandung kata itu (tanpa peduli huruf besar/kecil), lalu panggil
//   render(hasil) — bukan menulis ulang kode tampilan di sini.
export function pasangFormCari() {
  const form = document.querySelector('#form-cari');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const kata = document.querySelector('#input-cari').value.trim().toLowerCase();
    const hasil = katalog.filter((buku) => buku.judul.toLowerCase().includes(kata));
    render(hasil);
  });
}

// Bootstrap halaman — jangan hapus, ini yang membuat halaman "hidup" saat
// dibuka di browser. Boleh dibaca untuk mengerti urutan pemanggilan.
sorotJudulPengumuman();
tandaiPengumumanPenting();
render(katalog);
pasangFormCari();