document.addEventListener('DOMContentLoaded', () => {
    // --- Elemen DOM ---
    const wheel = document.getElementById('wheel');
    const spinBtn = document.getElementById('spin-btn');
    const modal = document.getElementById('modal');
    const prizeResult = document.getElementById('prize-result');
    const playAgainBtn = document.getElementById('play-again-btn');
    const tickSound = document.getElementById('tick-sound');
    const winSound = document.getElementById('win-sound');

    // =========================================================================
    // KUSTOMISASI DI SINI!
    // Ganti teks dan warna sesuai keinginan Anda.
    const prizes = [
        { text: "100", color: "#3F51B5" },
        { text: "200", color: "#FF9800" },
        { text: "300", color: "#E91E63" },
        { text: "400", color: "#9C27B0" },
        { text: "500", color: "#4CAF50" },
        { text: "600", color: "#FFEB3B" },
        { text: "700", color: "#00BCD4" },
        { text: "800", color: "#F44336" },
        { text: "900", color: "#795548" },
        { text: "1000.000", color: "#607D8B" },
    ];
    // =========================================================================

    // --- Variabel & Pengaturan ---
    const numSegments = prizes.length;
    const segmentAngle = 360 / numSegments;
    let currentRotation = 0;
    let isSpinning = false;
    
    // --- Fungsi Inisialisasi ---
    const initializeWheel = () => {
        // Membuat latar belakang roda dengan conic-gradient
        const conicGradient = `conic-gradient(${prizes.map((p, i) => `${p.color} ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`).join(', ')})`;
        wheel.style.background = conicGradient;
        
        // ====================================================================
        // --- LOGIKA BARU UNTUK MENEMPATKAN TEKS DENGAN BENAR ---
        prizes.forEach((prize, index) => {
            const rotation = (index * segmentAngle) + (segmentAngle / 2);

            // Membuat pembungkus (wrapper) untuk setiap teks
            const textWrapper = document.createElement('div');
            textWrapper.className = 'text-wrapper';
            // Memutar wrapper sesuai posisi segmen
            textWrapper.style.transform = `rotate(${rotation}deg)`;

            // Membuat elemen teks di dalam wrapper
            const text = document.createElement('div');
            text.className = 'prize-text';
            text.innerHTML = prize.text.replace('\n', '<br>');
            
            textWrapper.appendChild(text);
            wheel.appendChild(textWrapper);
        });
        // ====================================================================
    };

    // --- Fungsi Gameplay ---
    const spinTheWheel = () => {
        if (isSpinning) return;
        isSpinning = true;
        spinBtn.disabled = true;
        tickSound.play();

        const randomExtraRotation = Math.floor(Math.random() * 360);
        const totalSpins = 10 * 360;
        currentRotation += totalSpins + randomExtraRotation;
        
        wheel.style.transform = `rotate(${currentRotation}deg)`;

        // Tunggu animasi selesai
        setTimeout(() => {
            tickSound.pause();
            tickSound.currentTime = 0;

            const finalAngle = currentRotation % 360;
            // Koreksi perhitungan untuk mendapatkan indeks yang benar
            const winningIndex = Math.floor((360 - finalAngle % 360) / segmentAngle) % numSegments;
            const winningPrize = prizes[winningIndex];

            showModal(winningPrize.text);
            isSpinning = false;
            spinBtn.disabled = false;
        }, 8000); // Sesuaikan dengan durasi transisi di CSS
    };

    const showModal = (prizeText) => {
        prizeResult.innerHTML = prizeText.replace('\n', '<br>');
        modal.classList.add('show');
        launchConfetti();
        winSound.play();
    };

    const hideModal = () => modal.classList.remove('show');

    // --- Fungsi Efek Visual ---
    const launchConfetti = () => {
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = `${Math.random() * -100}vh`;
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.animationDelay = `${Math.random() * 0.2}s`;
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000);
        }
    };
    
    // --- Event Listeners ---
    spinBtn.addEventListener('click', spinTheWheel);
    playAgainBtn.addEventListener('click', hideModal);

    // --- Mulai! ---
    initializeWheel();
});

// --- FUNGSI UNTUK MEMBUAT BACKGROUND PARTIKEL ---
const createParticles = () => {
    const particleContainer = document.getElementById('background-particles');
    const particleCount = 50; // Jumlah partikel, bisa diubah

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Acak ukuran
        const size = Math.random() * 6 + 2; // Ukuran dari 2px sampai 8px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Acak posisi horizontal
        particle.style.left = `${Math.random() * 100}%`;

        // Acak durasi animasi (kecepatan) dan delay
        particle.style.animationDuration = `${Math.random() * 15 + 10}s`; // Durasi 10-25 detik
        particle.style.animationDelay = `${Math.random() * 10}s`; // Delay 0-10 detik
        
        particleContainer.appendChild(particle);
    }
};
// ===============================================

initializeWheel();
createParticles(); // TAMBAHKAN BARIS INI