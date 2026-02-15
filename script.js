// LOAD DATA DARI CONFIG
let config = {};
fetch('config.json').then(r => r.json()).then(d => {
    config = d;
    document.getElementById('dev-update').innerText = d.system.update_log;
}).catch(e => console.log("Config not found, check your file!"));

// FIX NAVIGASI TAB
function switchTab(t) {
    // Sembunyikan semua tab
    document.querySelectorAll('.content-tab').forEach(el => {
        el.classList.add('hidden');
    });
    // Hapus class active di tombol
    document.querySelectorAll('.t-btn').forEach(el => {
        el.classList.remove('active');
    });
    // Tampilkan tab yang dipilih
    document.getElementById('tab-' + t).classList.remove('hidden');
    // Kasih efek active ke tombol yang diklik
    event.currentTarget.classList.add('active');
}

// GOD LEVEL SNIFFER
async function godLevelSniffer() {
    const url = document.getElementById('target-url').value;
    const log = document.getElementById('status-box');
    if(!url) return alert("Link Target Mana Jing?");

    log.innerText = "Initiating God-Bypass... (Rotating Proxies)";
    
    // Bypass Engine v6 (Triple Layer)
    const proxies = [
        "https://api.allorigins.win/get?url=",
        "https://corsproxy.io/?",
        "https://thingproxy.freeboard.io/fetch/"
    ];

    let success = false;
    for (let p of proxies) {
        try {
            log.innerText = "Attempting Bypass with Layer: " + p.split('/')[2];
            const res = await fetch(p + encodeURIComponent(url));
            const data = await res.json();
            const html = data.contents || await res.text();

            if (html && html.length > 200) {
                log.innerHTML = "<span class='green'>BYPASS SUCCESS! Downloading Assets...</span>";
                
                // FORCE DOWNLOAD SEMUA ASET
                forceDownload(html, "index_captured.html");
                
                // Deteksi JS & CSS (Simulasi pencarian link aset)
                const cssMatch = html.match(/href="([^"]+\.css)"/g) || [];
                const jsMatch = html.match(/src="([^"]+\.js)"/g) || [];
                log.innerHTML += `<br>Detected: ${cssMatch.length} CSS, ${jsMatch.length} JS.`;
                
                // Kirim notif Telegram
                notifyTele(`[GOD LOG] Target Captured: ${url}`);
                success = true;
                break;
            }
        } catch (e) { continue; }
    }
    if(!success) log.innerText = "Gagal! Website target menggunakan WAF/Cloudflare level tinggi.";
}

function forceDownload(content, filename) {
    const blob = new Blob([content], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}

function notifyTele(msg) {
    if(!config.telegram) return;
    fetch(`https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chat_id}&text=${encodeURIComponent(msg)}`);
}

function encryptCode() {
    const raw = document.getElementById('code-input').value;
    if(!raw) return;
    const enc = btoa(raw);
    document.getElementById('code-input').value = `<script>document.write(atob("${enc}"))</script>`;
    alert("HTML Encrypted!");
}
