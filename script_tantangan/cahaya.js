const questions = [
    {
        pilar: "Abstraksi",
        image: "../foto/21.jfif",
        q: "Dalam percobaan celah ganda Young, seberkas cahaya monokromatik dilewatkan pada dua celah sempit, menghasilkan pola garis terang dan gelap pada layar di belakang celah. Untuk menganalisis pola interferensi tersebut, informasi manakah yang paling relevan (diambil inti konsepnya)?",
        opt: [
            "Warna intensitas cahaya yang digunakan",
            "Bahan layar yang digunakan untuk menangkap pola cahaya",
            "Jarak antar celah dan panjang gelombang cahaya",
            "Bentuk fisik lampu sumber cahaya",
            "Suhu ruangan tempat percobaan dilakukan"
        ],
        ans: 2
    },
    {
        pilar: "Dekomposisi",
        image: "../foto/22.jpg",
        q: "Sebuah kisi difraksi memiliki 500 garis per milimeter. Kisi tersebut disinari cahaya monokromatik dan menghasilkan spektrum garis terang pada layar. Untuk menghitung jarak antar celah (d) yang akan digunakan dalam rumus difraksi kisi d sin θ = mλ, langkah manakah yang tepat?",
        opt: [
            "Mengubah satuan 500 garis/mm menjadi 500.000 garis/m, lalu d= 1/(jumlah garis per meter)",
            "Mengalikan jumlah garis dengan panjang gelombang",
            "Membagi 1 mm dengan 500",
            "Menghitung sudut θ terlebih dahulu",
            "Mmebagi panjang gelombang dengan jumlah garis"
        ],
        ans: 0
    },
    {
        pilar: "Pola",
        image: "../foto/23.jpg",
        q: "Cahaya terpolarisasi dilewatkan pada sebuah analyzer. Jika sumbu transmisi analyzer diputar sehingga sejajar (0°) dengan arah polarisasi cahaya, bagaimana intensitas cahaya yang keluar? Berdasarkan hukum Malus I = I0 cos² θ, intensitas cahaya yang keluar adalah...",
        opt: [
            "Maksimum",
            "Minimum",
            "Nol",
            "Setengah dari intensitas awal",
            "Sama dengan intensitas awal dibagi empat"
        ],
        ans: 0
    },
    {
        pilar: "Algoritma",
        image: "../foto/24.jfif",
        q: "Sinar monokromatik dengan panjang gelombang (λ) diarahkan tegak lurus pada kisi difraksi dan menghasilkan garis terang orde pertama (m = 1) pada sudut θ. Manakah yang digunakan untuk mencari konstanta kisi (d) berdasarkan rumus difraksi kisi d sin θ = mλ?",
        opt: [
            "Menghitung d = sin θ/λ",
            "Menghitung d = λ/ sin θ",
            "Menghitung d = λ sinθ",
            "Menghitung d = λ/ tan θ",
            "Menghitung d = λ tanθ"
        ],
        ans: 1
    },
    {
        pilar: "Evaluasi",
        image: "https://via.placeholder.com/600x300?text=Interferometry+Laser+Pattern",
        q: "Layar LCD (Liquid Crystal Display) menggunakan prinsip polarisasi cahaya. Cahaya dari backlight melewati polarisator pertama, kemudian melalui lapisan kristal cair yang bisa diputar arah polarisasinya oleh arus listrik, dan akhirnya melewati polarisator kedua (analyzer) yang arahnya tegak lurus dengan polarisator pertama. Bagaimana prosedur algoritma untuk membuat piksel layar menjadi gelap (tidak ada cahaya yang keluar dari analyzer)?",
        opt: [
            "Mematikan arus listrik sehingga kristal cair tidak memutar cahaya",
            "Menyalakan arus listrik sehingga kristal cair tidak memutar cahaya",
            "Mengatur arus listrik agar kristal cair memutar arah polarisasi cahaya sebesar 90°",
            "Melepas polarisator kedua dari layar LCD",
            "Mengatur arus listrik agar kristal cair tidak memutar arah polarisasi cahaya, sehingga cahaya diblokir oleh polarisator kedua"
        ],
        ans: 4
    }
];

let currentIdx = 0;
let hasAnswered = false;
let scores = { dekomposisi: 0, pola: 0, abstraksi: 0, algoritma: 0, evaluasi: 0 };

function loadQuestion() {
    hasAnswered = false;
    const q = questions[currentIdx];
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
        scores[q.pilar.toLowerCase()] = 100; 
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
    const username = localStorage.getItem("username") || "Siswa_Baru_Cahaya";
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwzIL_2ScjfTJT8InR7zsJkkzkYu2UGieDAJZXS_eOx5aI-OOC7wgFpg9gwCjpeTEuQbg/exec';

    Swal.fire({ 
        title: 'Menyimpan Hasil...', 
        allowOutsideClick: false, 
        didOpen: () => Swal.showLoading() 
    });

    const payload = {
        action: "save_ct",
        username: username,
        materi: "Gelombang_Cahaya",
        tipe_tes: "Diagnostik Awal",
        dekomposisi: scores.dekomposisi,
        pola: scores.pola,
        abstraksi: scores.abstraksi,
        algoritma: scores.algoritma,
        total: (scores.dekomposisi + scores.pola + scores.abstraksi + scores.algoritma) / 4
    };

    try {
        const qs = new URLSearchParams(payload).toString();
        await fetch(`${scriptURL}?${qs}`, { method: 'POST', mode: 'no-cors' });
        
        Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Tes awal cahaya selesai. Hasilmu sudah terekam.',
            confirmButtonText: 'Lanjutkan ke Materi'
        }).then(() => {
            window.location.href = "../materi/cahaya.html";
        });
    } catch(e) {
        console.error("Error submitting:", e);
        window.location.href = "../materi/cahaya.html";
    }
}

// Inisialisasi soal pertama saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadQuestion);