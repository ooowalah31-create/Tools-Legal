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
        sendTelegram(`🚨 ADMIN LOGIN: ${u} enters dashboard.`);
    } else { alert("ACCESS DENIED!"); }
}

// SCANNER DISCLOSURE (HASILNYA LANGSUNG MUNCUL)
async function scanFile() {
    const fileInput = document.getElementById('file-input');
    const log = document.getElementById('scan-log');
    if (!fileInput.files[0]) return;
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    log.innerHTML = `<span class="blue">Beding Deep Scan on ${file.name}...</span>`;

    reader.onload = function(e) {
        const content = e.target.result;
        const whPattern = /https:\/\/discord\.com\/api\/webhooks\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+/g;
        const urlPattern = /https?:\/\/[^\s"'()]+/g;

        const webhooks = content.match(whPattern) || [];
        const allUrls = content.match(urlPattern) || [];

        let disclosure = "";
        if (webhooks.length > 0 || allUrls.length > 0) {
            disclosure = `<span class="red">${webhooks.length} Keylogger Detected!</span><br>`;
            disclosure += `<span class="blue">${allUrls.length} Suspicious Link(s) Found:</span><br><hr>`;
            
            // TAMPILIN SEMUA LINK NYA DISINI
            allUrls.forEach((url, index) => {
                disclosure += `<div class="link-item">${index + 1}. ${url}</div>`;
            });

            log.innerHTML = disclosure;
            sendTelegram(`🚨 SCAN ALERT! Found ${allUrls.length} links in ${file.name}`);
        } else {
            log.innerHTML = `<span class="green">✅ Clean: No Suspicious Assets.</span>`;
        }
    };
    reader.readAsText(file);
}

// BYPASS LEVEL GILA
async function startSniff() {
    const url = document.getElementById('target-url').value;
    const log = document.getElementById('sniff-log');
    if(!url) return;

    log.innerHTML = `<span class="blue">🚀 WORM-VIP: Injecting Multi-Proxy...</span>`;
    const proxies = [
        "https://api.allorigins.win/get?url=",
        "https://api.codetabs.com/v1/proxy/?quest=",
        "https://corsproxy.io/?"
    ];

    let source = "";
    for (let p of proxies) {
        try {
            const res = await fetch(p + encodeURIComponent(url));
            if (p.includes("allorigins")) {
                const j = await res.json(); source = j.contents;
            } else { source = await res.text(); }
            if (source.length > 100) break;
        } catch (e) { continue; }
    }

    if (source) {
        const blob = new Blob([source], { type: 'text/html' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `STOLEN_WEB_${Date.now()}.html`;
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
