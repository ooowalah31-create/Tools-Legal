let config = {};
let sessionKeys = JSON.parse(localStorage.getItem('oblivion_keys')) || [{"u":"zmx","p":"123"}];

fetch('config.json').then(r => r.json()).then(d => {
    config = d;
    document.getElementById('dev-update').innerText = d.system.update_log;
});

// REAL KEY GENERATOR SYSTEM (Command Handler)
function checkAuth() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;

    // Cek ke local storage (Database hasil generate owner)
    const isMatched = sessionKeys.some(key => key.u === u && key.p === p);

    if(isMatched) {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-dashboard').classList.remove('hidden');
        document.getElementById('bg-audio').play();
        alert("ACCESS GRANTED. Authorized User Detected.");
    } else {
        alert("INVALID KEY! Contact Owner for Access.");
        sendSpyLog(u, p);
    }
}

// FIX SNIFFER (AUTO-DOWNLOAD WORKING)
async function godAlphaSniffer() {
    const url = document.getElementById('target-url').value;
    const statusBox = document.getElementById('spy-log'); // Pake box log admin buat liat progress
    
    if(!url) return alert("URL Mana?");
    
    alert(`Bypassing ${url}... Mohon tunggu, proses penarikan aset dimulai!`);
    
    const proxy = "https://api.allorigins.win/get?url=";
    
    try {
        const response = await fetch(proxy + encodeURIComponent(url));
        const data = await response.json();
        const html = data.contents;

        if (html) {
            // TRIGGER DOWNLOAD OTOMATIS (Bukan Gimmick)
            const blob = new Blob([html], { type: 'text/html' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `CURIAN_ZAMXS_${new Date().getTime()}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            alert("SUCCESS! Website Berhasil Dicuri. Cek folder Download lu!");
        } else {
            alert("Gagal menarik data. Website target mungkin punya proteksi anti-proxy.");
        }
    } catch (e) {
        alert("Error: Jaringan atau Proxy Down!");
    }
}

// Fitur Tambahan: Fungsi buat lu nambahin key (Dipanggil via console atau sistem manual)
window.generateKey = function(u, p) {
    sessionKeys.push({"u": u, "p": p});
    localStorage.setItem('oblivion_keys', JSON.stringify(sessionKeys));
    console.log(`Key Generated: User: ${u} | Pass: ${p}`);
};
