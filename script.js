// --- 1. FIXED TAB NAVIGATION ---
function switchPage(page) {
    const pSniff = document.getElementById('page-sniff');
    const pEncrypt = document.getElementById('page-encrypt');
    const tSniff = document.getElementById('tab-sniff');
    const tEncrypt = document.getElementById('tab-encrypt');

    if (page === 'encrypt') {
        pSniff.classList.add('hidden');
        pEncrypt.classList.remove('hidden');
        tEncrypt.classList.add('active');
        tSniff.classList.remove('active');
    } else {
        pEncrypt.classList.add('hidden');
        pSniff.classList.remove('hidden');
        tSniff.classList.add('active');
        tEncrypt.classList.remove('active');
    }
}

// --- 2. ULTRA SNIFFER WITH BYPASS ---
async function ultraSniffer() {
    const target = document.getElementById('target-sniff').value;
    if(!target) return alert("Target Link Mana?");
    
    // Proxy List buat Bypass Protection
    const proxies = [
        `https://api.allorigins.win/get?url=`,
        `https://thingproxy.freeboard.io/fetch/`,
        `https://corsproxy.io/?`
    ];

    console.log("[OBLIVION] Attempting bypass...");
    
    for (let proxy of proxies) {
        try {
            const res = await fetch(proxy + encodeURIComponent(target));
            if (!res.ok) continue;

            const data = await res.json();
            const html = data.contents || await res.text();

            if (html) {
                const blob = new Blob([html], { type: 'text/html' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = "stolen_source.html";
                a.click();
                alert("BYPASS SUCCESS! HTML Captured.");
                return; // Berhenti kalau udah dapet
            }
        } catch (e) {
            console.log("Proxy failed, trying next...");
        }
    }
    alert("Bypass Failed! Website uses advanced Anti-Bot/WAF.");
}

// --- 3. FITUR GANAS: DOMAIN LOOKUP ---
async function lookupData() {
    const domain = document.getElementById('lookup-url').value;
    const resBox = document.getElementById('lookup-result');
    if(!domain) return;

    resBox.innerText = "FETCHING IP & WHOIS...";
    try {
        const res = await fetch(`https://rdap.org/domain/${domain}`);
        const data = await res.json();
        resBox.innerText = JSON.stringify(data.entities[0].vcardArray[1][1][3], null, 2);
    } catch (e) {
        resBox.innerText = "Error: Domain info hidden or not found.";
    }
}

// --- 4. ENCRYPT LOGIC (SIMPLE) ---
function encryptHTML() {
    const raw = document.getElementById('raw-html').value;
    if(!raw) return;
    const encrypted = btoa(unescape(encodeURIComponent(raw)));
    document.getElementById('raw-html').value = `<script>document.write(decodeURIComponent(escape(atob("${encrypted}"))))</script>`;
    alert("HTML Encrypted into Base64 Script!");
}
