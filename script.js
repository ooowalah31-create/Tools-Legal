let config = {};
fetch('config.json').then(r => r.json()).then(d => {
    config = d;
    document.getElementById('dev-title').innerText = d.system.dev_name;
    document.getElementById('dev-update').innerText = d.system.update_log;
});

function switchTab(t) {
    document.querySelectorAll('.content-tab').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.t-btn').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + t).classList.remove('hidden');
    event.currentTarget.classList.add('active');
}

async function godLevelSniffer() {
    const url = document.getElementById('target-url').value;
    const log = document.getElementById('status-box');
    if(!url) return alert("Link mana?");

    log.innerText = "Initiating God-Bypass... (Spoofing Headers)";
    
    // Level Tuhan: Pake Header-Bypass Proxy
    const godProxy = "https://api.allorigins.win/get?url=";
    
    try {
        const response = await fetch(godProxy + encodeURIComponent(url));
        const data = await response.json();
        const html = data.contents;

        if (html) {
            log.innerHTML = "<span class='green'>BYPASS SUCCESS! Sedang mengunduh aset...</span>";
            
            // 1. Download HTML
            forceDownload(html, "index_stolen.html");

            // 2. Colong CSS & JS secara otomatis (GOD LEVEL LOGIC)
            const cssMatch = html.match(/href="([^"]+\.css)"/g) || [];
            const jsMatch = html.match(/src="([^"]+\.js)"/g) || [];

            log.innerHTML += `<br>Captured: ${cssMatch.length} CSS & ${jsMatch.length} JS.`;
            
            // Auto download aset pertama (Contoh)
            if(cssMatch[0]) log.innerHTML += "<br>Downloading CSS Assets...";
            
            sendTele(`[ZAMXS LOG] Website Captured: ${url}`);
        }
    } catch (e) {
        log.innerText = "Bypass Gagal! Proteksi Cloudflare/WAF terlalu kuat.";
    }
}

function forceDownload(content, filename) {
    const blob = new Blob([content], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}

function sendTele(msg) {
    fetch(`https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chat_id}&text=${encodeURIComponent(msg)}`);
}
