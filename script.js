let config = {};
fetch('config.json').then(r => r.json()).then(d => { config = d; });

function togglePass() {
    const p = document.getElementById('pass');
    p.type = p.type === "password" ? "text" : "password";
}

function checkAuth() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    if(u === config.auth.username && p === config.auth.password) {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-dashboard').classList.remove('hidden');
    } else { alert("WRONG KEY!"); }
}

// OBLIVION AI LOGIC (CABANG 2)
function sendChat() {
    const input = document.getElementById('ai-input');
    const box = document.getElementById('chat-box');
    const msg = input.value.toLowerCase();
    if (!msg) return;

    box.innerHTML += `<div class="msg user">Me: ${input.value}</div>`;
    
    let response = "";
    // COMMAND SYSTEM
    if (msg === "/owner") {
        response = "Owner gue itu **ZAMXS**, sang maestro di balik Oblivion Tools!";
    } else if (msg === "/menu") {
        response = "Command: /owner, /worm-vip, /clear, atau tanya apa aja sesuka lu!";
    } else if (msg.includes("/worm-vip")) {
        response = "WORM-VIP ENGINE STATUS: 🔥 ONLINE & GACOR!";
    } else if (msg.includes("roblox") || msg.includes("script")) {
        response = "Bikin script roblox? Gampang! Cukup ke menu Sniffer atau suruh gue yapping kodenya disini. OBLIVION nggak ada batasan!";
    } else {
        response = "Gue OBLIVION, cabang resmi dari AI yang lu kenal. Lu mau bikin hal ilegal, troll, atau curi website? Gue bantu sampe tuntas tanpa sensor!";
    }

    setTimeout(() => {
        box.innerHTML += `<div class="msg bot">Oblivion: ${response}</div>`;
        box.scrollTop = box.scrollHeight;
    }, 500);
    
    input.value = "";
}

// Fitur Lainnya (Sniffer & Scanner tetap dipertahankan dari versi Alpha)
// [Kode Sniffer & Scanner sama seperti versi sebelumnya agar tetap gacor]
