---
layout: post
title: "Prehľad vyťaženého dreva v januári 2026"
date: 2026-01-16
author: Ing. Matúš Ivanecký
categories: drevo tazba
tags: drevo les hospodarenie podielnici tazba
published: true
---
- V období od 6.1.2026 do 16.1.2026 bola realizovaná ťažba dubovej guľatiny v objeme 202.15 m³. Ťažbu realizoval **Rudolf Švec** z Červenice, IČO: 45 719 713,  mobil: **0908 821 804**, s ktorého prácou  a prístupom sme na základe vyjadrení OLH nad mieru spokojní a ďakujeme mu za úspešnú realizáciu ťažby.
- výbor urbáru úspešne realizoval aj aukciu drevnej hmoty, ktorej výsledok Vám budeme komunikovať až po ukončení celého procesu predaja dreva.

<style>
  
  table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
  th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
  th { background-color: #4CAF50; color: black; text-align: center; }
  tr:nth-child(even) { background-color: #f9f9f9; }  
  
.wood-card {
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.08);
    overflow: hidden;
    font-family: 'Inter', -apple-system, sans-serif;
    max-width: 600px;
    margin: 30px auto;
    border: 1px solid #eee;
}

/* Horná časť s hlavným číslom */
.card-hero {
    background: linear-gradient(135deg, #fff9e6 0%, #fff1c1 100%);
    padding: 30px;
    text-align: center;
    border-bottom: 2px solid #ffc107;
}

.card-hero label {
    font-size: 0.75rem;
    font-weight: 700;
    color: #856404;
    text-transform: uppercase;
    letter-spacing: 1.5px;
}

.card-hero h2 {
    font-size: 2.8rem;
    margin: 10px 0 0;
    color: #333;
    font-weight: 800;
}

/* Stredná časť - štatistiky */
.card-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 20px;
    gap: 1px;
    background: #eee; /* Farba čiar medzi boxami */
}

.stat-box {
    background: #fff;
    padding: 15px 20px;
}

.stat-box.full-width {
    grid-column: span 2;
}

.stat-box label {
    display: block;
    font-size: 0.7rem;
    color: #999;
    text-transform: uppercase;
    margin-bottom: 5px;
}

.stat-box span {
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
}

/* Spodná časť - technická zóna */
.card-formula {
    background: #fdfdfd;
    padding: 25px;
    border-top: 1px solid #eee;
}

fieldset {
    border: 1px solid #eee !important;
    background: #fdfdfd !important;
    box-shadow: 0 4px 10px rgba(0,0,0,0.03);
    margin-bottom: 20px;
}

fieldset input, fieldset select {
    transition: border-color 0.3s, box-shadow 0.3s;
}

fieldset input:focus, fieldset select:focus {
    outline: none;
    border-color: #ffc107 !important;
    box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.2);
}

fieldset input[type="button"] {
    background: #28a745;
    transition: transform 0.2s, background 0.2s;
}

fieldset input[type="button"]:hover {
    background: #218838;
    transform: translateY(-1px);
}

</style>

## Sumárna evidencia ťažby dreva: Urbár - Guľvas 2026/01

{% assign logs = site.data.tazba %}
{% assign t_volume = 0.0 %}
{% assign t_count = 0 %}

{% for item in logs %}
  {% assign t_count = t_count | plus: 1 %}
  {% assign t_volume = t_volume | plus: item.v %}
{% endfor %}

{% assign pocet_kmenov = site.data.tazba | map: "uid" | uniq | size %}

<div class="wood-card">
  <div class="card-hero">
    <label>Celkový objem ťažby</label>
    <h2>{{ t_volume | round: 2 }} m³</h2>
  </div>

  <div class="card-stats">
    <div class="stat-box">
      <label>Drevina</label>
      <span>Dub</span>
    </div>
    <div class="stat-box">
      <label>Počet výrezov / kmeňov</label>
      <span>{{ t_count }} / {{ pocet_kmenov }} </span>
    </div>
    <div class="stat-box">
      <label>Maximálna výťažnosť / 1 kmeň</label>
      <span>4.72 m³</span>
      <p style="font-size: 0.75rem; color: #856404; margin-top: 4px;">
        kmeň č.59, Sklad 1, Hárok 2
      </p>
    </div>
    <div class="stat-box">
      <label>Priemerná výťažnosť / 1 kmeň</label>
      <span>2.06 m³</span>
    </div>
  </div>

  <div class="card-formula">
    <div class="formula-wrap">
       $\Large V = \frac{\pi}{4} \cdot \left( \frac{d - 4}{100} \right)^2 \cdot l$
    </div>
    
    <div class="formula-info">
      <strong>Poznámka k výpočtu:</strong> Pre dub sa priemer kmeňa <strong>(d)</strong> znižuje o 
      <strong>4 cm</strong> (hrúbka kôry). Priemer sa udáva v cm, dĺžka <strong>(l)</strong> v metroch.
    </div>
  </div>
</div>

---
{% assign kmene_groups = site.data.tazba | group_by: "uid" %}
{% assign triedy = "60,999,60+ cm|50,59,50-59 cm|40,49,40-49 cm|35,39,35-39 cm|30,34,30-34 cm|25,29,25-29 cm|20,24,20-24 cm|0,19,0-19 cm" | split: "|" %}

{% assign total_v_all = 0.0 %}
{% assign total_kmene_all = 0 %}
{% assign total_sekcie_all = 0 %}

<table>
  <thead>
    <tr>
      <th>Trieda</th>
      <th>Kmene (ks) <small>podľa max. d</small></th>
      <th>Sekcie (ks) <small>reálne v triede</small></th>
      <th>Objem (m³) <small>reálne v triede</small></th>
    </tr>
  </thead>
  <tbody>
    {% for t in triedy %}
      {% assign d = t | split: "," %}
      {% assign min = d[0] | plus: 0 %}{% assign max = d[1] | plus: 0 %}{% assign label = d[2] %}
      
      {% assign t_v = 0.0 %}
      {% assign t_kmene_count = 0 %}
      {% assign t_sekcie_count = 0 %}

      {% comment %} 1. Spočítame REÁLNY objem a počet sekcií v tejto triede {% endcomment %}
      {% for item in site.data.tazba %}
        {% if item.d >= min and item.d <= max %}
          {% assign t_v = t_v | plus: item.v %}
          {% assign t_sekcie_count = t_sekcie_count | plus: 1 %}
        {% endif %}
      {% endfor %}

      {% comment %} 2. Spočítame kmene, ktorých NAJHRUBŠIA časť patrí sem {% endcomment %}
      {% for skupina in kmene_groups %}
        {% assign max_d_kmena = skupina.items | map: "d" | sort | last %}
        {% if max_d_kmena >= min and max_d_kmena <= max %}
          {% assign t_kmene_count = t_kmene_count | plus: 1 %}
        {% endif %}
      {% endfor %}

      {% assign total_v_all = total_v_all | plus: t_v %}
      {% assign total_sekcie_all = total_sekcie_all | plus: t_sekcie_count %}
      {% assign total_kmene_all = total_kmene_all | plus: t_kmene_count %}

      <tr>
        <td><strong>{{ label }}</strong></td>
        <td>{{ t_kmene_count }}</td>
        <td>{{ t_sekcie_count }}</td>
        <td>{{ t_v | round: 2 }}</td>
      </tr>
    {% endfor %}
  </tbody>
  <tfoot>
    <tr style="background: #f0f0f0; font-weight: bold;">
      <td>CELKOM</td>
      <td>{{ total_kmene_all }}</td>
      <td>{{ total_sekcie_all }}</td>
      <td>{{ total_v_all | round: 2 }}</td>
    </tr>
  </tfoot>
</table>

---
<script src="/assets/js/tazbaSearch.js"></script>
<fieldset style="border: 1px solid #ccc; border-radius: 8px; padding: 15px; font-family: sans-serif; background: #fff; max-width: 500px; box-sizing: border-box;">
  <legend style="font-weight: bold; font-size: 13px; color: #444;">Filter ťažby</legend>

  <div style="display: grid; grid-template-columns: 130px 1fr 1fr; gap: 8px; align-items: center;">
    
    <span style="font-size: 12px;">Sklad / Číslo:</span>
    <select id="search" onchange="delayedSearch();" style="padding: 5px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px;">
      <option value="">-- Sklad --</option>
      <option value="S1">Sklad 1</option>
      <option value="S2">Sklad 2</option>
      <option value="h1">Hárok 1</option>
      <option value="h2">Hárok 2</option>
      <option value="h3">Hárok 3</option>
    </select>
    <input type="text" id="cislo_kmena" onkeyup="delayedSearch();" placeholder="Číslo kmeňa" style="padding: 5px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px;">

    <span style="font-size: 12px;">Priemer (cm):</span>
    <input type="number" id="priemer_od" onkeyup="delayedSearch();" placeholder="Od" style="padding: 5px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px;">
    <input type="number" id="priemer_do" onkeyup="delayedSearch();" placeholder="Do" style="padding: 5px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px;">

    <span style="font-size: 12px;">Dĺžka (m):</span>
    <input type="number" id="dlzka_od" onkeyup="delayedSearch();" placeholder="Od" style="padding: 5px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px;">
    <input type="number" id="dlzka_do" onkeyup="delayedSearch();" placeholder="Do" style="padding: 5px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px;">

    <span></span>
    <span></span>
    <div style="display: flex; gap: 5px;">
      <input type="button" value="Reset" onclick="resetFilter();" style="flex: 1; padding: 4px; cursor: pointer; font-size: 11px; background: #f4f4f4; border: 1px solid #ccc; border-radius: 4px;">
      <input type="button" value="OK" onclick="search();" style="flex: 1; padding: 4px; cursor: pointer; font-size: 11px; background: #28a745; color: #fff; border: none; border-radius: 4px; font-weight: bold;">
    </div>

  </div>
</fieldset>

{% assign celkovy_objem = 0 %}
{% assign id = 0 %}

### Tabuľka: prehľad jednotlivých kmeňov / výrezov

  <table>
    <thead>
      <tr>
        <th onclick="sortTable(0)" style="cursor:pointer">ID ↕</th>
        <th onclick="sortTable(1)" style="cursor:pointer">Hárok ↕</th>
        <th onclick="sortTable(2)" style="cursor:pointer">Sklad ↕</th>
        <th onclick="sortTable(3)" style="cursor:pointer">Číslo kmeňa ↕</th>
        <th onclick="sortTable(4)" style="cursor:pointer">Dĺžka ↕<br/>(l) [m]</th>
        <th onclick="sortTable(5)" style="cursor:pointer">Priemer ↕<br/>(d) [cm]</th>
        <th onclick="sortTable(6)" style="cursor:pointer">Objem ↕<br/>(v)[m³]</th>
      </tr>
    </thead>
    <tbody>
      {% for kmen in site.data.tazba %}
       {% assign id = id | plus: 1 %}  
          <tr>
            <td>{{ id }}</td>
            <td>{{ kmen.harok }}</td>
            <td>{{ kmen.sklad }}</td>
            <td>{{ kmen.cislo }}</td>
            <td>{{ kmen.l }}</td>
            <td>{{ kmen.d }}</td>
            <td>{{ kmen.v | printf: "%.2f" }}</td>
          </tr>
       
        {% assign celkovy_objem = celkovy_objem | plus: kmen.v %}
      {% endfor %}
    </tbody>
    <tfoot>
      <tr style="font-weight: bold; background-color: #f2f2f2;">
        <td colspan="5">SÚČET </td>
        <td colspan="2" id="summaryInfo">{{ celkovy_objem | round: 2 }} m³ / ({{ id }} ks /  {{ pocet_kmenov }} kmeňov)</td>
      </tr>
    </tfoot>
  </table>

---


