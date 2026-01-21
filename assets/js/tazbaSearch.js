function sortTable(columnIndex) {
  const table = document.getElementsByTagName('table')[1]; // Alebo použi ID tabuľky
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.rows);

  // Zistíme, či už je stĺpec zoradený vzostupne
  const isAscending = table.dataset.sortDir === "asc";
  const direction = isAscending ? -1 : 1;

  // Samotné sortovanie
  rows.sort((a, b) => {
    const aText = a.cells[columnIndex].textContent.trim();
    const bText = b.cells[columnIndex].textContent.trim();

    // Skúsime, či ide o čísla, aby sme ich nezoraďovali ako text
    const aNum = parseFloat(aText.replace(',', '.'));
    const bNum = parseFloat(bText.replace(',', '.'));

    if (!isNaN(aNum) && !isNaN(bNum)) {
      return (aNum - bNum) * direction;
    }

    return aText.localeCompare(bText, 'sk') * direction;
  });

  // Uložíme smer zoradenia pre ďalšie kliknutie
  table.dataset.sortDir = isAscending ? "desc" : "asc";

  // Vložíme zoradené riadky späť do tabuľky
  tbody.append(...rows);
}


function resetFilter() {
    // Nájdeme všetky inputy okrem tlačidiel a všetky selecty
    const inputs = document.querySelectorAll('input:not([type="button"]), select');
    
    inputs.forEach(el => {
        el.value = ''; // Vymažeme hodnotu
    });

    // Po vymazaní hneď spustíme search(), aby sa tabuľka opäť zobrazila celá
    search();
}


function search() {
    // 1. Získanie hodnôt z filtrov
    const s = document.getElementById('search')?.value.toLowerCase() || null;
    const cKmena = document.getElementById('cislo_kmena')?.value.toLowerCase().trim() || null;
    
    const getNum = (id) => {
        const el = document.getElementById(id);
        return (!el || el.value === "") ? null : parseFloat(el.value.replace(',', '.'));
    };

    const pOd = getNum('priemer_od');
    const pDo = getNum('priemer_do');
    const dOd = getNum('dlzka_od');
    const dDo = getNum('dlzka_do');

    // 2. Získanie riadkov presne podľa tvojho postupu
    const tbody = document.getElementsByTagName('tbody')[1];
    if (!tbody) return;
    const rows = tbody.getElementsByTagName('TR');

    let pocet = 0;
    let celkovyObjem = 0;

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].cells;
        if (cells.length < 7) continue;

        const rowHarokSklad = (cells[1].textContent + " " + cells[2].textContent).toLowerCase();
        const rowCislo = cells[3].textContent.toLowerCase();
        const rowDlzka = parseFloat(cells[4].textContent.replace(',', '.')) || 0;
        const rowPriemer = parseFloat(cells[5].textContent.replace(',', '.')) || 0;
        const rowObjem = parseFloat(cells[6].textContent.replace(',', '.')) || 0;

        // LOGIKA FILTROVANIA:
        
        // Sklad a Číslo kmeňa (klasické ALEBO)
        let matchKmen = false;
        if( s !== "" && cKmena !== ""){
           matchKmen = (rowHarokSklad.includes(s) && rowCislo.includes(cKmena));
        } else if (s !== null) {
            matchKmen = rowHarokSklad.includes(s);
        } else if (cKmena !== null) {
            matchKmen = rowCislo.includes(cKmena);
        }
      
        const matchSklad = (s !== "" && rowHarokSklad.includes(s));
        const matchCislo = (cKmena !== "" && rowCislo.includes(cKmena));

        // Priemer (Ak sú obe, musí byť v rozsahu. Ak je jedna, stačí tá jedna.)
        let matchPriemer = false;
        if (pOd !== null && pDo !== null) {
            matchPriemer = (rowPriemer >= pOd && rowPriemer <= pDo);
        } else if (pOd !== null) {
            matchPriemer = (rowPriemer >= pOd);
        } else if (pDo !== null) {
            matchPriemer = (rowPriemer <= pDo);
        }

        // Dĺžka (Rovnaká logika rozsahu)
        let matchDlzka = false;
        if (dOd !== null && dDo !== null) {
            matchDlzka = (rowDlzka >= dOd && rowDlzka <= dDo);
        } else if (dOd !== null) {
            matchDlzka = (rowDlzka >= dOd);
        } else if (dDo !== null) {
            matchDlzka = (rowDlzka <= dDo);
        }

        // Kontrola prázdneho filtra
        const noFilter = (s === "" && cKmena === "" && pOd === null && pDo === null && dOd === null && dDo === null);

        // Zobrazenie riadku (Logika ALEBO medzi kategóriami)
        if (noFilter || matchKmen || matchPriemer || matchDlzka) {
            rows[i].style.display = '';
            pocet++;
            celkovyObjem += rowObjem;
        } else {
            rows[i].style.display = 'none';
        }
    }

    const summary = document.getElementById('summaryInfo');
    if (summary) {
        summary.textContent = celkovyObjem.toFixed(2) + " m³ / (" + pocet + " ks)";
    }
}

var timer;
function delayedSearch() {
    clearTimeout(timer);
    timer = setTimeout(search, 300);
}
