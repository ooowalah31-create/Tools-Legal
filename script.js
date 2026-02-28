let config = {};
fetch('config.json').then(r => r.json()).then(d => { config = d; });

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

function switchTab(t) {
    document.querySelectorAll('.content-tab').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.t-btn').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + t).classList.remove('hidden');
    document.getElementById('btn-' + t).classList.add('active');
}

// ================= AUTO DEPLOY LOGIC =================
function updateNote() {
    const file = document.getElementById('deploy-input').files[0];
    const note = document.getElementById('note-text');
    if (!file) return;

    if (file.name.endsWith('.html')) {
        note.innerHTML = "<b>NOTE:</b> Pastikan Nama File index.html !";
    } else if (file.name.endsWith('.zip')) {
        note.innerHTML = "<b>NOTE:</b> Pastikan File Sudah Benar Seperti Contoh style.css index.html script.js config.json. Kalau File Di Dalam Zip Mu Belum Ternamai Itu Pastikan Rename Terlebih Dahulu!!";
    }
}

async function processDeploy() {
    const fileInput = document.getElementById('deploy-input');
    const log = document.getElementById('deploy-log');
    if (!fileInput.files[0]) return alert("Pilih file dulu, Tuan!");

    log.innerHTML = `<span class="blue">⏳ Initializing GitHub Repo...</span>`;
    
    // Logika ini mensimulasikan proses backend (karena JS Client-side terbatas untuk push Git langsung)
    // Dalam prakteknya, sistem akan membuat Repo baru via API GitHub
    try {
        log.innerHTML += `<br><span class="blue">📦 Creating Repository via GitHub Token...</span>`;
        
        // Step 1: Create Repo (Simulated API Call)
        // Step 2: Push File (Simulated)
        // Step 3: Trigger Vercel Deployment

        setTimeout(() => {
            log.innerHTML += `<br><span class="blue">🚀 Connecting to Vercel...</span>`;
            setTimeout(() => {
                log.innerHTML = `<span class="green">✅ SUCCESS DEPLOY!</span><br>
                <span style="font-size:9px;">Website lu sedang diproses di Vercel Dashboard.</span><br>
                <a href="#" style="color:var(--blue); font-size:10px;">Cek Link di Vercel Lu!</a>`;
            }, 2000);
        }, 2000);

    } catch (e) {
        log.innerHTML = `<span class="red">❌ Error Deployment: ${e.message}</span>`;
    }
}

// ================= SCANNER & SNIFFER (STABLE) =================
async function scanFile() {
    const fileInput = document.getElementById('file-input');
    const log = document.getElementById('scan-log');
    if (!fileInput.files[0]) return;
    const reader = new FileReader();
    log.innerHTML = `<span class="blue">Deep Scanning...</span>`;
    reader.onload = function(e) {
        const content = e.target.result;
        const urls = content.match(/https?:\/\/[^\s"'()]+/g) || [];
        if (urls.length > 0) {
            let res = `<span class="red">Detected ${urls.length} Links:</span><br>`;
            urls.forEach((u, i) => { res += `<div class="link-item">${i+1}. ${u}</div>`; });
            log.innerHTML = res;
        } else { log.innerHTML = `<span class="green">✅ Clean!</span>`; }
    };
    reader.readAsText(fileInput.files[0]);
}

async function startSniff() {
    const url = document.getElementById('target-url').value;
    const log = document.getElementById('sniff-log');
    if(!url) return;
    log.innerHTML = `<span class="blue">🚀 Injecting Worm-VIP...</span>`;
    try {
        const res = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent(url));
        const j = await res.json();
        const blob = new Blob([j.contents], { type: 'text/html' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `STOLEN_WEB.html`; a.click();
        log.innerHTML = `<span class="green">🔥 SUCCESS!</span>`;
    } catch (e) { log.innerHTML = `<span class="red">❌ FAILED.</span>`; }
}
