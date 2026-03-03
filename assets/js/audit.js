    let ownersData  = [];
    let globalNotes = {};  // Globálna premenná pre poznámky

    function formatFraction(shareStr) {
        if (shareStr === "Nemá") return '<div class="nema-val">Nemá</div>';
        const match = shareStr.match(/{(\d+)}{(\d+)}/);
        if (match) return `<div class="fraction"><span class="num">${match[1]}</span><span class="den">${match[2]}</span></div>`;
        return shareStr;
    }

    // Univerzálna funkcia pre nastavenie filtra
    function setFilter(value) {
        const searchInput = document.getElementById('search');
        searchInput.value = value;
        doSearch();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function generateOwnerId(name, dob) {
        return `${name}-${dob}`
            .toLowerCase()
            .normalize("NFD")                // Rozloží znaky (á -> a + ´)
            .replace(/[\u0300-\u036f]/g, "") // Odstráni diakritické znamienka
            .replace(/\s+/g, '-')            // Medzery nahradí pomlčkami
            .replace(/[^a-z0-9-]/g, '');     // Odstráni všetko ostatné okrem alfanumeriky a pomlčiek
    }

    function removeAccents(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }
   function render(data, notesInfo = {}) {
    const out = document.getElementById('results');
    let html = "";

    data.forEach(item => {
        // Generujeme ID (uisti sa, že tvoja funkcia generateOwnerId používa rovnaký XOR kľúč)
        const ownerId = generateOwnerId(item.name, item.dob);
        
        // Vo vnútri render(data, notesInfo) v cykle:
        const info = notesInfo[ownerId];
        const hasNotes = info && info.count > 0;

       html += `
                <div class="card" id="card-${ownerId}">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 8px;flex-wrap: wrap;">
                            <span class="owner-name">${item.name}</span>
                            
                            ${hasNotes ? `
                                <span class="note-badge" onclick="loadCommentsForOwner('${ownerId}', '${info.url}')" style="cursor:help" title="Kliknite pre zobrazenie/skrytie komentárov">
                                    ${info.count}
                                </span>
                            ` : ''}
            
                            ${item.maiden ?  `<span class="tag maiden-tag" onclick="setFilter('${item.maiden}')" title="Filtrovať rodné meno">r. ${item.maiden}</span>` : ''}
                            ${item.address ? `<span class="tag address-tag" title="Adresa">${item.address}</span>` : ''}
                        </div>
                        <div class="tag dob-tag" onclick="setFilter('${item.dob}')" title="Filtrovať dátum narodenia">
                            <span style="color: var(--text-muted)">Nar.:</span> ${item.dob}
                        </div>
                    </div>
            
                    <div class="mismatch-box">
                        ${item.details.map(d => {
                            const pMatch = d.share.match(/\(([\d\.]+)%\)/);
                            const percent = pMatch ? pMatch[1] : "";
                            return `
                                <div class="share-row">
                                    <div class="fraction-col">${formatFraction(d.share)}</div>
                                    <div class="percent-col">${percent ? percent + ' %' : ''}</div>
                                    <div class="lv-info">
                                        <span class="lv-arrow">↓</span>
                                        <span class="lv-label" style="color: var(--text-muted)">na listoch:</span>
                                        <span class="lv-numbers">${d.lvs.join(', ')}</span>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
            
                    <div id="notes-list-${ownerId}" class="dynamic-notes-container"></div>
            
                    <div id="edit-ctrl-${ownerId}" style="margin-top: 10px; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            ${hasNotes ? `
                                <button class="btn-show-notes" onclick="loadCommentsForOwner('${ownerId}', '${info.url}')">
                                     Zobraziť poznámky (${info.count})
                                </button>
                            ` : '<span></span>'}
                        </div>
                        <button class="btn-edit-note" onclick="activateUtterances('${ownerId}')">
                            ${hasNotes ? 'Upraviť' : '+ Pridať poznámku'}
                        </button>
                    </div>
                </div>
            `;
        }); 

        out.innerHTML = html;
    }

    function toggleInfoBox() {
        const box = document.getElementById('legal-info-box');
        if (box.style.display === 'none') {
            box.style.display = 'block';
            box.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            box.style.display = 'none';
        }
    }

    // 3. Funkcia, ktorá aktivuje plnohodnotné Utterances pri kliknutí na tlačidlo
    function activateUtterances(ownerId) {
        const container = document.getElementById(`edit-ctrl-${ownerId}`);
        container.innerHTML = '<p style="font-size:0.8rem; color:var(--text-muted)">Načítavam editor...</p>';
        
        const script = document.createElement('script');
        script.src = "https://utteranc.es/client.js";
        script.setAttribute('repo', 'maty535/urbarDulova'); // <--- SEM DOPLŇ SVOJE
        script.setAttribute('issue-term', ownerId);
        script.setAttribute('label', 'poznámka');
        script.setAttribute('theme', 'github-light');
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;
        
        container.appendChild(script);
    }

   async function fetchAllNotes() {
    const repo = "maty535/urbarDulova";
    const notesMap = {};
    const response = await fetch(`https://api.github.com/repos/${repo}/issues?state=all&labels=poznámka&per_page=20`);
    const issues = await response.json();

    for (const issue of issues) {
        let commentsList = [];
        
        // Stiahneme komentáre pre dané issue
        if (issue.comments > 0) {
            const commRes = await fetch(issue.comments_url);
            const comments = await commRes.json();
            
            commentsList = comments
                .filter(c => c.user.login !== 'utterances-bot') // Ignorujeme bota
                .map(c => ({
                    text: c.body,
                    date: new Date(c.created_at).toLocaleDateString('sk-SK', {
                        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })
                }));
        }
        
        notesMap[issue.title] = commentsList;
    }
        return notesMap;
    }

    async function loadCommentsForOwner(ownerId, url) {
            const target = document.getElementById(`notes-list-${ownerId}`);

            if (target.innerHTML.trim() !== "") {
                // Ak už jsou poznámky zobrazené, skryjeme je
                target.innerHTML = "";
                return;
            }

            target.innerHTML = `<div style="padding:10px; font-size:0.8rem; color: #666;">Načítavam záznamy...</div>`;
            
            try {
                const res = await fetch(url);
                const comments = await res.json();
                
                const html = comments
                    .filter(c => c.user.login !== 'utterances-bot')
                    .map(c => `
                        <div class="note-card">
                            <div class="note-body">
                                <span class="note-icon">📝</span>
                                <div class="markdown-text">${marked.parse(c.body)}</div>
                                <div class="note-date-footer">${new Date(c.created_at).toLocaleString('sk-SK', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                            </div>
                        </div>
                    `).join('');
        
                target.innerHTML = `
                    <div class="notes-wrapper">
                        ${html}
                        <div style="text-align:center">
                           <button class="btn-edit-note" style="text-decoration:none; color:#94a3b8" onclick="document.getElementById('notes-list-${ownerId}').innerHTML=''">[ skryť ]</button>
                        </div>
                    </div>`;
            } catch (e) {
                target.innerHTML = `<div style="color:red; font-size:0.8rem;">Nepodarilo sa načítať poznámky.</div>`;
            }
        }

    async function fetchNotesInfo() {
        const repo = "maty535/urbarDulova";
        const notesInfo = {}; // Objekt, kde kľúč bude ownerId a hodnota počet komentárov
        
        try {
            const response = await fetch(`https://api.github.com/repos/${repo}/issues?state=all&labels=poznámka&per_page=100`);
            const issues = await response.json();
    
            issues.forEach(issue => {
                notesInfo[issue.title] = {
                    count: issue.comments,
                    url: issue.comments_url // Odložíme si URL pre neskoršie načítanie
                };
            });
            return notesInfo;
        } catch (err) {
            console.error("Chyba pri zisťovaní poznámok:", err);
            return {};
        }
    }
    
   function doSearch() {
        const term = document.getElementById('search').value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        const filtered = ownersData.filter(i => {
            // 1. Textový filter (meno, dátum...)
            const searchString = (i.name + (i.maiden || "") + i.dob).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const matchesText = searchString.includes(term);
            
            // 2. Filter podľa poznámok
            const ownerId = generateOwnerId(i.name, i.dob);
            const hasNotes = globalNotes[ownerId] && globalNotes[ownerId].count > 0;
            
            let matchesNotes = true;
            if (currentNoteFilter === 'with') matchesNotes = hasNotes;
            if (currentNoteFilter === 'without') matchesNotes = !hasNotes;
            
            return matchesText && matchesNotes;
        });
        
        render(filtered, globalNotes);
    }

    let currentNoteFilter = 'all'; // Možnosti: 'all', 'with', 'without'

    function setNoteFilter(type) {
        currentNoteFilter = type;
        
        // Vizualizácia aktívneho tlačidla
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`filter-${type}`).classList.add('active');
        
        doSearch(); // Znovu prefiltrujeme dáta
    }

    // Funkcia na aktualizáciu počtov v tlačidlách
    function updateFilterCounts() {
        const total = ownersData.length;
        let withNotes = 0;
    
        ownersData.forEach(item => {
            const id = generateOwnerId(item.name, item.dob);
            if (globalNotes[id] && globalNotes[id].count > 0) {
                withNotes++;
            }
        });
    
        document.getElementById('count-all').innerText = `(${total})`;
        document.getElementById('count-with').innerText = `(${withNotes})`;
        document.getElementById('count-without').innerText = `(${total - withNotes})`;
    }

    async function refreshData() {
        const btn = document.getElementById('refresh-btn');
        btn.classList.add('loading'); // Pridá triedu loading, ktorá spustí rotáciu cez CSS
        btn.disabled = true;
    
        try {
            globalNotes = await fetchNotesInfo();
            updateFilterCounts();
            doSearch();
        } catch (err) {
            console.error("Refresh zlyhal:", err);
        } finally {
            // Počkáme chvíľu, aby animácia vyzerala prirodzene
            setTimeout(() => {
                btn.classList.remove('loading');
                btn.disabled = false;
            }, 500);
        }
    }
    
    async function initApp() {

        const statsElement = document.getElementById('stats');
        
        try {
            // 1. Načítanie dát
            const response = await fetch('rozdiely.json');
            ownersData = await response.json();

            // 2. Načítanie poznámok
            globalNotes = await fetchNotesInfo();
            updateFilterCounts(); 
            
            // 3. AKTUALIZÁCIA TEXTU (Namiesto "Načítavam dáta...")
            if (statsElement) {
                statsElement.innerHTML = `Nájdených <strong>${ownersData.length}</strong> vlastníkov s rozdielnymi podielmi naprieč LV.<i class="fa-solid fa-circle-question info-trigger" onclick="toggleInfoBox()" style="color: #64748b; font-size: 1.2rem; cursor: pointer;" title="Viac informácií o metodike"></i>`;
            }
    
            // 3. Kontrola URL parametra "search"
            const urlParams = new URLSearchParams(window.location.search);
            const initialSearch = urlParams.get('search');
    
            if (initialSearch) {
                // Vložíme text z URL do tvojho search inputu
                const searchInput = document.getElementById('search');
                if (searchInput) {
                    searchInput.value = initialSearch;
                    
                    // Spustíme tvoju existujúcu funkciu na vyhľadávanie
                    // (keďže ownersData a globalNotes sú už načítané, render prebehne správne)
                    doSearch(); 
                }
            } else {
                // Ak v URL nič nie je, vykreslíme všetko
                await render(ownersData, globalNotes);
            }
    
        } catch (err) {
            console.error("Chyba pri štarte aplikácie:", err);
        }
    }
    // Spustenie aplikácie
    initApp();
    
