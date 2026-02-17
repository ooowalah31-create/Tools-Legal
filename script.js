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
        alert("LOGIN GAGAL!");
    }
}

async function ultraSniffer() {
    const url = document.getElementById('target-url').value;
    const log = document.getElementById('sniff-log');
    if(!url) return;

    log.innerHTML = `<span style="color:#BE60EE">Bypassing...</span>`;
    
    try {
        const proxy = "https://api.allorigins.win/get?url=";
        const res = await fetch(proxy + encodeURIComponent(url));
        const data = await res.json();
        
        if (data.contents) {
            const blob = new Blob([data.contents], { type: 'text/html' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `WEB_CURIAN_${Date.now()}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            log.innerHTML = `<span style="color:#3fb950">SUKSES! File Terdownload.</span>`;
        }
    } catch (e) {
        log.innerHTML = `<span style="color:#ff3e3e">Gagal Bypass!</span>`;
    }
}

function switchTab(t) {
    document.querySelectorAll('.content-tab').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.t-btn').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + t).classList.remove('hidden');
    event.currentTarget.classList.add('active');
}
