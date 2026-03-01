const questions = [
    {
        pilar: "abstraksi",
        image: "../foto/16.png",
        q: "Dua orang temanmu, Andi dan Budi berteriak dengan kekuatan yang sama. Andi berteriak tepat didepanmu, sedangkan budi berteriak dari jarak 100 meter dari belakangmu. Inti dari perbedaan suara yang kamu dengar dari Andi dan Budi berkaitan dengan konsep..",
        opt: [
            "Frekuensi bunyi yang dihasilkan Andi lebih tinggi daripada budi",
            "Intensitas bunyi yang sampai ke telingamu berkurang seiring bertambahnya jarak",
            "Kecepatan suara Andi lebih cepat sampai daripada suara budi",
            "Taraf intensitas bunyi Budi lebih tinggi karen aberteriak ditempat terbuka",
            "Gelombang bunyi Andi berubah bentuk menjadi gelombang transversal"
        ],
        ans: 1
    },
    {
        pilar: "dekomposisi",
        image: "../foto/17.png",
        q: "Siswa ingin mengukur cepat rambat bunyi di udara (v) menggunakan metode resonansi kolom udara (tabung organa ujung tertutup). Alat yang tersedia adalah tabung resonansi, garpu tala dengan frekuensi (f) yang diketahui, penggaris dan wadah air. Untuk menghitung cepat rambat bunyi (v), urutan langkah manakah yang paling benar untuk mendapatkan data yang valid dan meminimalkan kesalahan akibat end correction (koreksi ujung tabung)?",
        opt: [
            "Memukul garpu tala -> mencari resonansi pertama (L1) dan resonansi kedua (L2) -> menghitung λ = 2(L2-L1) -> menghitung v = f x λ",
            "Memukul garpu tala -> mengukur panjang tabung -> menghitung v = f x λ",
            "Memukul garpu tala -> menaik-turunkan permukaan air hingga terdengar bunyi paling keras (resonansi pertama) -> mengukur panjang kolom udara (L1) -> menghitung λ = 4L1 dan v = f x λ",
            "Mengukur suhu ruangan -> memukul garpu tala -> mengukur panjang gelombang dengan penggaris",
            "Mengukur panjang kolom udara -> memukul garpu tala -> menghitung v = L1/f"
        ],
        ans: 0
    },
    {
        pilar: "pola",
        image: "../foto/18.jpg",
        q: "Siswa melakukan pengukuran intensitas bunyi di berbagai jarak dari sumber bunyi (speaker) yang konstan menggunakan sound level meter. Pada jarak 1 meter, intensitasnya adalah I. pada jarak 2 meter, intensitasnya menjadi 1/4I. pada jarak 3 meter intensitasnya menjadi 1/9I. Berdasarkan data tersebut, jika jarak sumber bunyi dijadikan 4 meter, berapa intensitas bunyi yang terukur?",
        opt: [
            "1/12 I",
            "1/6 I",
            "1/16 I",
            "1/8 I",
            "1/10 I"
        ],
        ans: 2
    },
    {
        pilar: "algoritma",
        image: "../foto/19.png",
        q: "Dua sumber bunyi menghasilkan f1 = 300 Hz dan f2 = 305 Hz secara bersamaan. Siswa ingin menghitung berapa kali suara mengeras dan melemah dalam satu detik (Frekuensi pelayangan, fp). Prosedur manakah yang paling tepat untuk mendapatkan nilai fp?",
        opt: [
            "Menghitung fp = f1 + f2 = 300 + 305",
            "Menghitung fp = f2 - f1 = 305 - 300",
            "Menghitung fp = f1 + f2 / 2 = 300 + 305 /2 ",
            "Menghitung fp = |f1 - f2| = |300 - 305|",
            "Menghitung fp = f1 x f2 = 300 x 305"
        ],
        ans: 3
    },
    {
        pilar: "abstraksi",
        image: "../foto/20.jpeg",
        q: "Dalam menghitung frekuensi yang didengar dari sirine ambulan, variabel mana yang merupakan 'noise' (tidak relevan) dalam model matematika?",
        opt: [
            "Kecepatan sumber bunyi.",
            "Kecepatan pendengar.",
            "Cepat rambat bunyi di udara.",
            "Frekuensi asli sirine.",
            "Warna cat mobil ambulan."
        ],
        ans: 4
    }
];

let currentIdx = 0;
let hasAnswered = false;
let scores = { dekomposisi: 0, pola: 0, abstraksi: 0, algoritma: 0 };

function loadQuestion() {
    hasAnswered = false;
    const q = questions[currentIdx];
    
    // Update UI
    document.getElementById("pilar-display").innerText = q.pilar;
    document.getElementById("progress-text").innerText = `Soal ${currentIdx + 1}/${questions.length}`;
    document.getElementById("q-image").src = q.image;
    document.getElementById("q-text").innerText = q.q;

    const cont = document.getElementById("options-cont");
    cont.innerHTML = "";
    
    q.opt.forEach((o, i) => {
        const div = document.createElement("div");
        div.className = "option-item";
        div.id = `opt-${i}`;
        div.innerHTML = `<b style="margin-right:10px">${String.fromCharCode(65 + i)}.</b> ${o}`;
        div.onclick = () => checkAnswer(i);
        cont.appendChild(div);
    });
    
    document.getElementById("btn-next").disabled = true;
}

function checkAnswer(selected) {
    if (hasAnswered) return;
    hasAnswered = true;

    const q = questions[currentIdx];
    const correct = q.ans;

    if (selected === correct) {
        // Logika skor: Abstraksi ada 2 soal (50+50), lainnya 1 soal (100)
        scores[q.pilar] += (q.pilar === "abstraksi" ? 50 : 100); 
        document.getElementById(`opt-${selected}`).classList.add("correct");
    } else {
        document.getElementById(`opt-${selected}`).classList.add("wrong");
        document.getElementById(`opt-${correct}`).classList.add("correct");
    }

    document.querySelectorAll(".option-item").forEach(el => el.classList.add("locked"));
    document.getElementById("btn-next").disabled = false;
}

document.getElementById("btn-next").onclick = () => {
    currentIdx++;
    if (currentIdx < questions.length) {
        loadQuestion();
    } else {
        submitResults();
    }
};

async function submitResults() {
    // Ambil data user dari localStorage yang disimpan saat login
    const username = localStorage.getItem("username") || "Siswa_Baru";
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwzIL_2ScjfTJT8InR7zsJkkzkYu2UGieDAJZXS_eOx5aI-OOC7wgFpg9gwCjpeTEuQbg/exec';

    Swal.fire({ 
        title: 'Menyimpan Hasil...', 
        allowOutsideClick: false, 
        didOpen: () => Swal.showLoading() 
    });

    const totalAvg = (scores.dekomposisi + scores.pola + scores.abstraksi + scores.algoritma) / 4;

    const payload = {
        action: "save_ct",
        username: username,
        materi: "Gelombang_Bunyi",
        tipe_tes: "Diagnostik ATI",
        dekomposisi: scores.dekomposisi,
        pola: scores.pola,
        abstraksi: scores.abstraksi,
        algoritma: scores.algoritma,
        total: totalAvg
    };

    try {
        const qs = new URLSearchParams(payload).toString();
        // Menggunakan mode no-cors untuk Web App Google Apps Script
        await fetch(`${scriptURL}?${qs}`, { method: 'POST', mode: 'no-cors' });
        
        Swal.fire({
            title: "Berhasil!",
            text: "Tes awal selesai. Mari lanjut ke materi!",
            icon: "success",
            confirmButtonText: "OK"
        }).then(() => {
            window.location.href = "../materi/bunyi.html";
        });
    } catch(e) {
        console.error("Error submit:", e);
        // Tetap pindah halaman jika gagal fetch (agar user tidak stuck)
        window.location.href = "../materi/bunyi.html";
    }
}

// Inisialisasi soal pertama saat halaman dimuat
loadQuestion();