let config = {
    auth: { user: "zmx", pass: "123" }
};

// Smoke Effect from base
function createSmoke() {
    const container = document.getElementById('smoke-background');
    setInterval(() => {
        const p = document.createElement('div');
        p.className = 'smoke-particle';
        p.style.left = Math.random() * 100 + "%";
        container.appendChild(p);
        setTimeout(() => p.remove(), 15000);
    }, 500);
}
createSmoke();

function checkAuth() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;

    if(u === config.auth.user && p === config.auth.pass) {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-dashboard').classList.remove('hidden');
        document.getElementById('bg-audio').play();
        alert("ACCESS GRANTED. Welcome, ZAMXS.");
    } else {
        alert("INVALID CREDENTIALS. Contact Owner!");
        sendSpyLog(u, p);
    }
}

function sendSpyLog(u, p) {
    const log = document.getElementById('spy-log');
    const msg = `⚠️ FAILED LOGIN: User[${u}] Pass[${p}]`;
    log.innerHTML += `<br><span class='red'>${msg}</span>`;
    // fetch telegram logic here...
}

function switchTab(t) {
    document.querySelectorAll('.content-tab').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.t-btn').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + t).classList.remove('hidden');
    event.currentTarget.classList.add('active');
}

// Reuse Sniffer from v6.2
async function godAlphaSniffer() {
    const url = document.getElementById('target-url').value;
    if(!url) return;
    alert("Bypassing " + url + "...");
}
