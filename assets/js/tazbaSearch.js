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
    // 1. Získanie hodnôt z filtrov
    const s = document.getElementById('search')?.value.toLowerCase() || "";
    const cKmena = document.getElementById('cislo_kmena')?.value.toLowerCase().trim() || "";
    
    // Funkcia vráti null, ak je pole prázdne, inak vráti číslo
    const getNum = (id) => {
        const val = document.getElementById(id).value;
        return val === "" ? null : parseFloat(val.replace(',', '.'));
    };

    const pOd = getNum('priemer_od');
    const pDo = getNum('priemer_do');
    const dOd = getNum('dlzka_od');
    const dDo = getNum('dlzka_do');

    rows = (document.getElementsByTagName('tbody')[1]).getElementsByTagName('TR');
    if (rows.length === 0) return;

    let pocet = 0;
    let celkovyObjem = 0;

    // 3. Hlavný cyklus filtrovania (Logika ALEBO)
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].cells;
        if (cells.length < 6) continue;

        const rowHarokSklad = (cells[1].textContent + " " + cells[2].textContent).toLowerCase();
        const rowCislo = cells[3].textContent.toLowerCase();
        const rowDlzka = parseFloat(cells[4].textContent.replace(',', '.')) || 0;
        const rowPriemer = parseFloat(cells[5].textContent.replace(',', '.')) || 0;
        const rowObjem = parseFloat(cells[6].textContent.replace(',', '.')) || 0;

        // Definujeme jednotlivé zhody (len ak nie je pole prázdne)
        const matchSklad = (s !== "" && rowHarokSklad.includes(s));
        const matchCislo = (cKmena !== "" && rowCislo.includes(cKmena));
        const matchPriemer = (
            (pOd !== null && rowPriemer >= pOd) || 
            (pDo !== null && rowPriemer <= pDo)
        );
        const matchDlzka = (
            (dOd !== null && rowDlzka >= dOd) || 
            (dDo !== null && rowDlzka <= dDo)
        );

        // RIADOK SA ZOBRAZÍ, AK:
        // Nie je zadaný žiadny filter ALEBO sa splní aspoň jedna podmienka
        const noFilter = (s === "" && cKmena === "" && pOd === null && pDo === null && dOd === null && dDo === null);
        
        if (noFilter || matchSklad || matchCislo || matchPriemer || matchDlzka) {
            rows[i].style.display = '';
            pocet++;
            celkovyObjem += rowObjem;
        } else {
            rows[i].style.display = 'none';
        }
    }

    // 4. Aktualizácia sumáru
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
