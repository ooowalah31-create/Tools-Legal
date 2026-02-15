let config = {};
fetch('config.json').then(r => r.json()).then(d => {
    config = d;
    document.getElementById('dev-update').innerText = d.system.update_log;
});

function switchTab(t) {
    document.querySelectorAll('.content-tab').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.t-btn').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + t).classList.remove('hidden');
    event.currentTarget.classList.add('active');
}

async function extremeSniffer() {
    const url = document.getElementById('target-url').value;
    const log = document.getElementById('status-box');
    if(!url) return alert("Mana URL-nya?");

    log.innerText = "Level Max Bypass Initiated... Extracting HTML, JS, and CSS.";

    const proxy = "https://api.allorigins.win/get?url=";

    try {
        const response = await fetch(proxy + encodeURIComponent(url));
        const data = await response.json();
        const html = data.contents;

        if (html) {
            log.innerHTML = "<span class='green'>SUCCESS! HTML CAPTURED.</span>";
            // 1. Download HTML
            forceDownload(html, "stolen_index.html", "text/html");

            // 2. Scan & Capture CSS
            const cssLinks = html.match(/href="([^"]+\.css)"/g) || [];
            if(cssLinks.length > 0) {
                log.innerHTML += `<br>Detected ${cssLinks.length} CSS. Downloading list...`;
                forceDownload(cssLinks.join('\n'), "stolen_css_links.txt", "text/plain");
            }

            // 3. Scan & Capture JS
            const jsLinks = html.match(/src="([^"]+\.js)"/g) || [];
            if(jsLinks.length > 0) {
                log.innerHTML += `<br>Detected ${jsLinks.length} JS. Downloading list...`;
                forceDownload(jsLinks.join('\n'), "stolen_js_links.txt", "text/plain");
            }

            log.innerHTML += "<br><span class='green'>ALL ASSETS PROCESSED.</span>";
            sendTele(`[MAX LOG] Target Captured: ${url}`);
        }
    } catch (e) {
        log.innerText = "Error: Target is highly protected.";
    }
}

function forceDownload(content, filename, type) {
    const blob = new Blob([content], { type: type });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}

function sendTele(msg) {
    fetch(`https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chat_id}&text=${encodeURIComponent(msg)}`);
}

function encryptCode() {
    const raw = document.getElementById('code-input').value;
    if(!raw) return;
    const enc = btoa(unescape(encodeURIComponent(raw)));
    document.getElementById('code-input').value = `<script>document.write(decodeURIComponent(escape(atob("${enc}"))))</script>`;
    alert("Encrypted!");
}
