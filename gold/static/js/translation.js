// Fungsi ini akan berjalan setelah seluruh halaman (HTML, CSS) selesai dimuat
document.addEventListener('DOMContentLoaded', () => {

    // Fungsi untuk mengambil file JSON kamus bahasa
    async function fetchTranslations(lang) {
        try {
            // Menggunakan fetch untuk mengambil file dari folder static/lang
            const response = await fetch(`/static/lang/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Kamus ${lang}.json tidak ditemukan.`);
            }
            return await response.json();
        } catch (error) {
            console.error('Gagal memuat file terjemahan:', error);
            // Fallback ke bahasa Inggris jika ada masalah
            const response = await fetch(`/static/lang/en.json`);
            return await response.json();
        }
    }

    // Fungsi utama untuk menerapkan terjemahan ke halaman
    async function applyTranslations(lang) {
        // Ambil kamus yang sesuai
        const translations = await fetchTranslations(lang);

        // Cari semua elemen yang punya penanda 'data-translate'
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key]) {
                // Ganti teks di dalam elemen
                element.textContent = translations[key];
            }
        });

        // Lakukan hal yang sama untuk placeholder
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (translations[key]) {
                element.setAttribute('placeholder', translations[key]);
            }
        });
    }

    // Fungsi untuk mengganti dan menyimpan bahasa pilihan
    function setLanguage(lang) {
        // Simpan pilihan di localStorage agar diingat di semua halaman
        localStorage.setItem('language', lang);
        // Terapkan terjemahan
        applyTranslations(lang);
    }

    // --- Logika Utama ---

    // 1. Tambahkan event listener ke semua tombol ganti bahasa di halaman
    // Ini akan bekerja untuk tombol di halaman 'bahasa.html' atau di mana pun
    document.querySelectorAll('[data-lang]').forEach(button => {
        button.addEventListener('click', (event) => {
            const selectedLang = event.target.getAttribute('data-lang');
            setLanguage(selectedLang);
            
            // Contoh: Jika tombol ada di halaman bahasa, arahkan ke lobi setelah memilih
            if (window.location.pathname.includes('pilih_bahasa')) {
                window.location.href = '/go/Lobby';
            }
        });
    });

    // 2. Saat halaman dimuat, periksa bahasa yang tersimpan
    const savedLanguage = localStorage.getItem('language') || 'id'; // Default ke Bahasa Indonesia
    applyTranslations(savedLanguage);
});
