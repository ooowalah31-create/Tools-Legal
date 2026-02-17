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
        alert("ACCESS DENIED!");
    }
}

// FIXED SNIFFER - FORCE AUTO DOWNLOAD
async function ultraSniffer() {
    const url = document.getElementById('target-url').value;
    const log = document.getElementById('sniff-log');
    if(!url) return;

    log.innerHTML = `<span class="blue">Bypassing... Sedang Mengambil Aset!</span>`;
    
    try {
        const proxy = "https://api.allorigins.win/get?url=";
        const res = await fetch(proxy + encodeURIComponent(url));
        const data = await res.json();
        const html = data.contents;

        if (html) {
            // Logika Auto Download Tanpa Bug
            const blob = new Blob([html], { type: 'text/html' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `CURIAN_v64_${Date.now()}.html`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            log.innerHTML = `<span class="green">TERCURI! Cek Folder Download Lu.</span>`;
        }
    } catch (e) {
        log.innerHTML = `<span class="red">Gagal! Website Terlalu Kuat.</span>`;
    }
}

function switchTab(t) {
    document.querySelectorAll('.content-tab').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.t-btn').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + t).classList.remove('hidden');
    event.currentTarget.classList.add('active');
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
