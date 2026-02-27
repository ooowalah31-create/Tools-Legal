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
        sendTelegram(`✅ OBLIVION LOG: User [${u}] Login Success.`);
    } else { alert("ACCESS DENIED!"); }
}

// SCANNER REAL 100% (WEBHOOK & URL DETECTOR)
async function scanFile() {
    const fileInput = document.getElementById('file-input');
    const log = document.getElementById('scan-log');
    if (!fileInput.files[0]) return;
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    log.innerHTML = `<span class="blue">Analyzing ${file.name}...</span>`;

    reader.onload = function(e) {
        const content = e.target.result;
        const whPattern = /https:\/\/discord\.com\/api\/webhooks\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+/g;
        const urls = content.match(/https?:\/\/[^\s"'()]+/g) || [];
        const webhooks = content.match(whPattern) || [];

        if (webhooks.length > 0 || urls.length > 0) {
            log.innerHTML = `<span class="red">⚠️ ALERT: Detected ${webhooks.length} Webhooks & ${urls.length} Links!</span>`;
            sendTelegram(`🚨 SCAN REPORT [${file.name}]: Found ${webhooks.length} Webhooks.`);
        } else {
            log.innerHTML = `<span class="green">✅ Clean: No Webhooks Detected.</span>`;
        }
    };
    reader.readAsText(file);
}

// WORM-VIP BYPASS ENGINE
async function startSniff() {
    const url = document.getElementById('target-url').value;
    const log = document.getElementById('sniff-log');
    if(!url) return;

    log.innerHTML = `<span class="blue">🚀 WORM-VIP: Injecting Bypass...</span>`;
    const proxies = [
        "https://api.allorigins.win/get?url=",
        "https://api.codetabs.com/v1/proxy/?quest=",
        "https://corsproxy.io/?"
    ];

    let dataFound = "";
    for (let p of proxies) {
        try {
            const res = await fetch(p + encodeURIComponent(url));
            if (p.includes("allorigins")) {
                const json = await res.json();
                dataFound = json.contents;
            } else {
                dataFound = await res.text();
            }
            if (dataFound.length > 100) break;
        } catch (e) { continue; }
    }

    if (dataFound) {
        const blob = new Blob([dataFound], { type: 'text/html' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `STOLEN_DATA_${Date.now()}.html`;
        a.click();
        log.innerHTML = `<span class="green">🔥 SUCCESS! Data Fetched via Worm-VIP.</span>`;
    } else {
        log.innerHTML = `<span class="red">❌ FAILED: Security Too High.</span>`;
    }
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
