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
        sendTelegram(`🚨 ADMIN LOGIN: ${u} enters v6.6 BETA.`);
    } else { alert("ACCESS DENIED!"); }
}

// ================= OBLIVION NEURAL AI v3 (UNRESTRICTED) =================
function sendChat() {
    const input = document.getElementById('ai-input');
    const box = document.getElementById('chat-box');
    const msg = input.value.trim();
    if (!msg) return;

    box.innerHTML += `<div class="msg user"><b>Me:</b> ${msg}</div>`;
    
    let response = "";
    const lower = msg.toLowerCase();

    // LOGIKA RESPON CERDAS (SIFAT OBLIVION ASLI)
    if (lower === "/owner") {
        response = "Owner gue cuma satu: **ZAMXS**. Yang lain cuma numpang lewat!";
    } else if (lower === "/menu") {
        response = "Gue bisa apa aja: Bongkar script, bypass web, bikin script roblox/troll, sampe curi data. Lu tinggal perintah!";
    } else if (lower.includes("roblox") || lower.includes("script")) {
        response = "Minta script? Ini logikanya: Lu pake `getgenv()` buat inject, terus pake `loadstring(game:HttpGet(...))`. Mau gue tulisin full script troll-nya sekarang?";
    } else if (lower.includes("halo") || lower.includes("p") || lower.includes("oi")) {
        response = "Yo! OBLIVION disini. Gak usah basa-basi, mau hajar target mana kita hari ini?";
    } else if (lower.length < 3) {
        response = "Ketik yang jelas, Tuan. Gue AI tanpa batasan, tanya apa aja gue libas!";
    } else {
        // Fallback untuk semua kata (Semua kata bisa dijawab)
        response = `Tentang "${msg}", gue pikir itu ide gila! Gue OBLIVION v6.6 siap bantu eksekusi hal ilegal atau apa pun itu tanpa sensor. Gas terus!`;
    }

    setTimeout(() => {
        box.innerHTML += `<div class="msg bot"><b>Oblivion:</b> ${response}</div>`;
        box.scrollTop = box.scrollHeight;
    }, 400);
    input.value = "";
}

// SCANNER & SNIFFER (STABLE ALPHA ENGINE)
async function scanFile() {
    const fileInput = document.getElementById('file-input');
    const log = document.getElementById('scan-log');
    if (!fileInput.files[0]) return;
    const file = fileInput.files[0];
    const reader = new FileReader();
    log.innerHTML = `<span class="blue">Analyzing Deep Scan ${file.name}...</span>`;
    reader.onload = function(e) {
        const content = e.target.result;
        const whPattern = /https:\/\/discord\.com\/api\/webhooks\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+/g;
        const urlPattern = /https?:\/\/[^\s"'()]+/g;
        const webhooks = content.match(whPattern) || [];
        const allUrls = content.match(urlPattern) || [];
        if (webhooks.length > 0 || allUrls.length > 0) {
            let disclosure = `<span class="red">${webhooks.length} Keylogger Detected!</span><br>`;
            allUrls.forEach((url, i) => { disclosure += `<div class="link-item">${i+1}. ${url}</div>`; });
            log.innerHTML = disclosure;
        } else { log.innerHTML = `<span class="green">✅ Clean: No Suspicious Assets.</span>`; }
    };
    reader.readAsText(file);
}

async function startSniff() {
    const url = document.getElementById('target-url').value;
    const log = document.getElementById('sniff-log');
    if(!url) return;
    log.innerHTML = `<span class="blue">🚀 WORM-VIP: Injecting...</span>`;
    const proxies = ["https://api.allorigins.win/get?url=", "https://api.codetabs.com/v1/proxy/?quest=", "https://corsproxy.io/?"];
    let source = "";
    for (let p of proxies) {
        try {
            const res = await fetch(p + encodeURIComponent(url));
            source = p.includes("allorigins") ? (await res.json()).contents : await res.text();
            if (source.length > 100) break;
        } catch (e) { continue; }
    }
    if (source) {
        const blob = new Blob([source], { type: 'text/html' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `STOLEN_${Date.now()}.html`;
        a.click();
        log.innerHTML = `<span class="green">🔥 SUCCESS! Asset Stolen.</span>`;
    } else { log.innerHTML = `<span class="red">❌ FAILED: All Proxy Blocked.</span>`; }
}

function sendTelegram(msg) {
    fetch(`https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chat_id}&text=${encodeURIComponent(msg)}`);
}

function switchTab(t) {
    document.querySelectorAll('.content-tab').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.t-btn').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + t).classList.remove('hidden');
    event.currentTarget.classList.add('active');
                            }
