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


function search() {
    // 1. Načítanie hodnôt z filtrov
    const s = document.getElementById('search').value.toLowerCase();
    const cKmena = document.getElementById('cislo_kmena').value.toLowerCase().trim();
    
    // Pomocná funkcia pre čísla: ak je pole prázdne, vráti default (0 pre 'od', 999 pre 'do')
    const getNum = (id, def) => {
        const val = document.getElementById(id).value.replace(',', '.');
        return val === "" ? def : parseFloat(val);
    };

    const pOd = getNum('priemer_od', 0);
    const pDo = getNum('priemer_do', 9999);
    const dOd = getNum('dlzka_od', 0);
    const dDo = getNum('dlzka_do', 9999);

    // 2. Výber riadkov tabuľky (predpokladáme druhú tabuľku na stránke, index 1)
    const table = document.getElementsByTagName('table')[1];
    if (!table) return;
    const rows = table.tBodies[0].rows;

    let pocet = 0;
    let celkovyObjem = 0;

    // 3. Cyklus cez všetky riadky
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].cells;
        
        // Načítanie dát z buniek (indexy podľa tvojej HTML tabuľky)
        const rowHarok = cells[1].textContent.toLowerCase();
        const rowSklad = cells[2].textContent.toLowerCase();
        const rowCislo = cells[3].textContent.toLowerCase().trim();
        const rowDlzka = parseFloat(cells[4].textContent.replace(',', '.'));
        const rowPriemer = parseFloat(cells[5].textContent.replace(',', '.'));
        const rowObjem = parseFloat(cells[6].textContent.replace(',', '.'));

        // Logika filtra (musia byť splnené všetky podmienky naraz)
        const matchSklad = (s === "" || rowHarok.includes(s) || rowSklad.includes(s));
        const matchCislo = (cKmena === "" || rowCislo.includes(cKmena));
        const matchPriemer = (rowPriemer >= pOd && rowPriemer <= pDo);
        const matchDlzka = (rowDlzka >= dOd && rowDlzka <= dDo);

        if (matchSklad && matchCislo && matchPriemer && matchDlzka) {
            rows[i].style.display = '';
            pocet++;
            celkovyObjem += rowObjem;
        } else {
            rows[i].style.display = 'none';
        }
    }

    // 4. Aktualizácia sumárnych údajov v pätičke
    const summaryElement = document.getElementById('summaryInfo');
    if (summaryElement) {
        summaryElement.textContent = celkovyObjem.toFixed(2) + " m³ / (" + pocet + " ks)";
    }
}

// Funkcia pre oneskorené vyhľadávanie (aby to nesekalo pri písaní)
var timer;
function delayedSearch() {
    clearTimeout(timer);
    timer = setTimeout(function () {
        search();
    }, 400); // 400ms pauza po dopísaní
}
