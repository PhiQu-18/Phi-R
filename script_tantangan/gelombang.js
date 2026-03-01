/**
 * Phi-R Interactive | Gelombang Lab
 * Logic: Diagnostic Test ATI-CT (Final Fix)
 * Database: Google Sheets (action: save_ct)
 */

// Konfigurasi Soal dengan Identitas Pilar CT
const questions = [
    {
        pilar: "abstraksi", // Soal 1
        image: "../foto/11.webp",
        text: "Diluar angkasa yang hampa udara (tidak ada oksigen/gas), sebuah ledakan besar terjadi. Kamu bisa melihat kilatan cahaya apinya, tetapi kamu tidak bisa mendengar suara ledakannya. Jika kita ingin tahu alasan mengapa suara tidak terdengar, informasi mana yang paling penting untuk kita perhatikan?",
        options: [
            "Warna api dari ledakan tersebut", 
            "Jarak kita dari ledakan tersebut", 
            "Tidak adanya udara udara sebagai perantara suara", 
            "Bentuk benda yang meledak", 
            "Nama astronot yang melihat ledakan"
        ],
        answer: 2 
    },
    {
        pilar: "pola", // Soal 2
        image: "../foto/12.jpg",
        text: "Kamu memperhatikan tetesan air yang jatuh kedalam kolam setiap 2 detik sekali. Setiap tetesan menciptakan lingkaran gelombang yang bergerak menjauh dari pusat. Kamu mencatat bahwa jarak antara satu puncak gelombang dengan puncak berikutnya selalu sama, yaitu 20 cm. Apa yang bisa kamu prediksi jika tetesan air jatuh lebih cepat (misalnya setiap 1 detik sekali)?",
        options: [
            "Warna air kolam akan berubah menjadi lebih gelap", 
            "Jarak antar puncak gelombang akan berubah karena polanya mengikuti kecepatan tetesan", 
            "Jarak antar puncak gelombang akan tetap 20 cm", 
            "Gelombang akan berhenti muncul sama sekali", 
            "Kedalaman kolam akan otomatis berubah"
        ],
        answer: 1
    },
    {
        pilar: "dekomposisi", // Soal 3
        image: "../foto/13.JPG",
        text: "Kamu melihat sebuah gelombang tali yang sedang bergerak. Kamu ingin menghitung kecepatan gelombang tali tersebut, tetapi kamu tidak tahu rumusnya. Langkah kecil apa saja yang harus kamu cari terlebih dahulu agar bisa menghitung kecepatannya?",
        options: [
            "Mengukur jarak satu gelombang (Panjang) dan waktu untuk satu getaran", 
            "Mencari tahu warna tali dan siapa yang memegang tali tersebut", 
            "Langsung menebak angka kecepatannya tanpa melihat tali tersebut", 
            "Menghitung jumlah debu yang menempel pada tali tersebut", 
            "Menunggu sampai tali tersebut berhenti bergerak sepenuhnya"
        ],
        answer: 0 
    },
    {
        pilar: "algoritma", // Soal 4
        image: "../foto/14.jpg",
        text: "Kamu ditugaskan untuk melihat apakah gelombang tersebut saling menghilangkan (destruktif) pada permukaan air kolam menggunakan dua buah batu. Bagaimana langkah-langkah yang harus kamu lakukan untuk menghasilkan gelombang tersebut?",
        options: [
            "Melempar dua batu secara bersamaan ketempat yang sama", 
            "Melempar dua batu ditempat yang berbeda dengan kekuatan yang berbeda", 
            "Melempar satu batu, menunggu air tenang, lalu melempar batu kedua", 
            "Melempar dua batu secara bergantian dengan jeda waktu yang lama", 
            "Melempar dua batu secara bersamaan ditempat yang berbeda, lalu mengatur waktu jatuhnya agar puncak gelombang A bertemu lembah gelombang B"
        ],
        answer: 4 
    },
    {
        pilar: "pola", // Soal 5
        image: "../foto/15.jfif",
        text: "Kamu memegang ujung tali dan menggerakkan tanganmu ke atas dan ke bawah dengan sangat cepat. Tali akan membentuk banyak gundukan kecil. Lalu kamu menggerakkan tanganmu keatas dan kebawah dengan sangat lambat. Tali akan membentuk gundukan yang besar dan sedikit. Apa yang dapat kamu simpulkan jika kamu ingin membuat gundukan gelombang yang paling kecil dan rapat?",
        options: [
            "Menggerakkan tangan dengan sangat lambat", 
            "Menggerakkan tangan ke kiri dan ke kanan", 
            "Melepaskan tali dari pegangan", 
            "Menggerakkan tangan dengan sangat cepat", 
            "Mengganti tali dengan rantai besi"
        ],
        answer: 3 
    }
];

let currentIdx = 0;
let score = 0;
let isAnswered = false; 

// Penampung Skor CT Per Pilar
let ctResults = {
    dekomposisi: 0,
    pola: 0,
    abstraksi: 0,
    algoritma: 0
};

// Bind DOM Elements
const qText = document.getElementById("question-text");
const qImg = document.getElementById("question-image");
const optCont = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");

function loadQuestion() {
    isAnswered = false;
    nextBtn.disabled = true; 
    nextBtn.innerText = "Pilih Jawaban...";
    
    const q = questions[currentIdx];
    qText.innerText = q.text;
    qImg.src = q.image;
    
    progressText.innerText = `${currentIdx + 1} / ${questions.length}`;
    const progressPercent = ((currentIdx + 1) / questions.length) * 100;
    progressFill.style.width = `${progressPercent}%`;

    optCont.innerHTML = "";
    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.classList.add("opt-item");
        btn.onclick = () => handleInstantFeedback(i, btn);
        optCont.appendChild(btn);
    });
}

function handleInstantFeedback(selectedIndex, selectedBtn) {
    if (isAnswered) return; 
    isAnswered = true;

    const q = questions[currentIdx];
    const correctIdx = q.answer;
    const allBtns = document.querySelectorAll(".opt-item");

    // Logika Penyekoran CT
    if (selectedIndex === correctIdx) {
        score++;
        if (q.pilar === "pola") {
            ctResults.pola += 50; // Karena ada 2 soal pola, masing-masing 50 poin
        } else {
            ctResults[q.pilar] = 100; // Pilar lain cuma 1 soal, langsung 100 poin
        }
    }

    // Feedback Warna
    allBtns.forEach((btn, i) => {
        btn.style.cursor = "default";
        if (i === correctIdx) {
            btn.style.backgroundColor = "#00b894";
            btn.style.color = "white";
        } else if (i === selectedIndex && i !== correctIdx) {
            btn.style.backgroundColor = "#ff7675";
            btn.style.color = "white";
        } else {
            btn.style.opacity = "0.4";
        }
    });

    nextBtn.disabled = false;
    nextBtn.innerText = currentIdx === questions.length - 1 ? "Simpan Hasil Ke Database" : "Lanjut ke Soal Berikutnya";
}

nextBtn.onclick = () => {
    currentIdx++;
    if (currentIdx < questions.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
};

async function finishQuiz() {
    const finalScore = (score / questions.length) * 100;
    const levelATI = finalScore >= 60 ? "SEDANG" : "RENDAH";
    const activeUser = localStorage.getItem("username") || "User_SMA_Ammar";

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwzIL_2ScjfTJT8InR7zsJkkzkYu2UGieDAJZXS_eOx5aI-OOC7wgFpg9gwCjpeTEuQbg/exec'; 

    const payload = {
        action: "save_ct",
        username: activeUser,
        materi: "Gelombang",
        tipe_tes: "Diagnostik ATI",
        dekomposisi: ctResults.dekomposisi,
        pola: ctResults.pola,
        abstraksi: ctResults.abstraksi,
        algoritma: ctResults.algoritma,
        total: finalScore
    };

    Swal.fire({
        title: "Menyimpan Progres...",
        text: "Mohon tunggu sebentar, data sedang dikirim ke database.",
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
    });

    const queryString = new URLSearchParams(payload).toString();

    try {
        await fetch(`${scriptURL}?${queryString}`, { 
            method: 'POST',
            mode: 'no-cors' 
        });
        
        Swal.fire({
            title: "Data Tersimpan!",
            text: `Skor CT: ${finalScore}. Jalur Belajar: ${levelATI}.`,
            icon: "success",
            confirmButtonText: "Mulai Tantangan 1: Gelombang"
        }).then(() => {
            window.location.href = `../materi/gelombang.html?level=${levelATI}`;
        });

    } catch (err) {
        console.error("Error:", err);
        window.location.href = `../materi/gelombang.html?level=${levelATI}`;
    }
}

loadQuestion();