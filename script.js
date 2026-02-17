let config = {};
fetch('config.json').then(r => r.json()).then(d => {
    config = d;
    document.getElementById('dev-update').innerText = d.system.update_log;
});

// Toggle Password Mata
function togglePass() {
    const p = document.getElementById('pass');
    const icon = document.getElementById('togglePassword');
    if (p.type === "password") {
        p.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        p.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

function checkAuth() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    if(u === config.auth.username && p === config.auth.password) {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-dashboard').classList.remove('hidden');
    } else { alert("ACCESS DENIED!"); }
}

// Web Preview Function
function webPreview() {
    const url = document.getElementById('target-url').value;
    const frame = document.getElementById('preview-frame');
    const container = document.getElementById('preview-container');
    if(!url) return alert("URL Mana Tuan?");
    
    container.classList.remove('hidden');
    frame.src = "https://api.allorigins.win/get?url=" + encodeURIComponent(url);
    document.getElementById('sniff-log').innerHTML = `<span class="blue">Previewing Target...</span>`;
}

// Ultra Sniffer Bypass Rage (Auto-Download)
async function ultraSniffer() {
    const url = document.getElementById('target-url').value;
    const log = document.getElementById('sniff-log');
    if(!url) return;

    log.innerHTML = `<span class="blue">Bypassing Security...</span>`;
    
    try {
        const proxy = "https://api.allorigins.win/get?url=";
        const res = await fetch(proxy + encodeURIComponent(url));
        const data = await res.json();
        
        if (data.contents) {
            const blob = new Blob([data.contents], { type: 'text/html' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `ZAMXS_CURIAN_${Date.now()}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            log.innerHTML = `<span class="green">SUCCESS! File Auto-Downloaded.</span>`;
        }
    } catch (e) {
        log.innerHTML = `<span class="red">FAILED! Security Too High.</span>`;
    }
}

function switchTab(t) {
    document.querySelectorAll('.content-tab').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.t-btn').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + t).classList.remove('hidden');
    event.currentTarget.classList.add('active');
}
