---
layout: post
title: "Prehľad vyťaženého dreva v januári 2026"
date: 2026-01-16
author: Ing. Matúš Ivanecký
categories: drevo tazba
tags: drevo les hospodarenie podielnici tazba
published: true
---

## Sumárna evidencia ťažby dreva: Urbár - Guľvas 2026/01

Drevina: **Dub**

Celkový objem ťažby: **202.15 m³**

Pre výpočet kubikáže jednotlivého stromu sa priemer kmeňa znižuje o hrúbku kôry, čo je v prípade duba **4 cm**/výrez, pričom priemer výrezu **(d)** je udávaný v cm.

$ V = \frac{\pi}{4} \cdot \left( \frac{d - 4}{100} \right)^2 \cdot l $

---
{% assign logs = site.data.tazba %}
{% comment %} Inicializácia s 0.0 zabezpečí, že Liquid bude počítať s desatinnými miestami {% endcomment %}
{% assign e_sum = 0.0 %}{% assign e_count = 0 %}
{% assign s_sum = 0.0 %}{% assign s_count = 0 %}
{% assign t_sum = 0.0 %}{% assign t_count = 0 %}

{% for item in logs %}
  {% if item.d >= 60 %}
    {% assign e_sum = e_sum | plus: item.v %}
    {% assign e_count = e_count | plus: 1 %}
  {% elsif item.d >= 30 %}
    {% assign s_sum = s_sum | plus: item.v %}
    {% assign s_count = s_count | plus: 1 %}
  {% else %}
    {% assign t_sum = t_sum | plus: item.v %}
    {% assign t_count = t_count | plus: 1 %}
  {% endif %}
{% endfor %}

{% assign total_sum = e_sum | plus: s_sum | plus: t_sum %}

### Rekapitulácia podľa hrúbkových tried

| Trieda | Rozsah | Počet | Objem celkom |
| :--- | :--- | :---: | :--- |
| **Extra silné** | nad 60 cm | {{ e_count }} ks | {{ e_sum | round: 2 }} m³ |
| **Stredná guľatina** | 30 - 59 cm | {{ s_count }} ks | {{ s_sum | round: 2 }} m³ |
| **Tenká guľatina** | pod 30 cm | {{ t_count }} ks | {{ t_sum | round: 2 }} m³ |
| **CELKOM** | | **{{ logs.size }} ks** | **{{ total_sum | round: 2 }} m³** |

---
<script src="/assets/js/tazbaSearch.js"></script>
<fieldset style="display: flex; flex-wrap: wrap; gap: 15px; align-items: flex-end; border: 1px solid #ccc; border-radius: 8px; padding: 15px; font-family: sans-serif; background: white;">
  <legend style="font-weight: bold;">Filter</legend>

  <label style="flex: 1; min-width: 140px; display: flex; flex-direction: column; gap: 4px; font-size: 13px;">
    Hárok/Sklad:
    <select id="search" onchange="delayedSearch();" style="padding: 6px; border: 1px solid #ccc; border-radius: 4px; background: white; cursor: pointer;">
      <option value="">-- Vyberte --</option>
      <option value="S1">S1 - Sklad 1</option>
      <option value="S2">S2 - Sklad 2</option>
      <option value="h1">h1 - Hárok 1</option>
      <option value="h2">h2 - Hárok 2</option>
      <option value="h3">h3 - Hárok 3</option>      
    </select>
  </label>


  <label style="flex: 1; min-width: 100px; display: flex; flex-direction: column; gap: 4px; font-size: 13px;">
    Priemer od:
    <input type="text" id="priemer" onkeyup="delayedSearch();" style="padding: 6px; border: 1px solid #ccc; border-radius: 4px;">
  </label>

  <label style="flex: 1; min-width: 100px; display: flex; flex-direction: column; gap: 4px; font-size: 13px;">
    Dĺžka od:
    <input type="text" id="dlzka" onkeyup="delayedSearch();" style="padding: 6px; border: 1px solid #ccc; border-radius: 4px;">
  </label>

  <input type="button" value="Vyhľadať" onclick="search();" 
         style="margin-left: auto; background: #28a745; color: white; border: none; padding: 8px 20px; border-radius: 4px; font-weight: bold; cursor: pointer;">
</fieldset>

{% assign celkovy_objem = 0 %}
{% assign id = 0 %}

### Tabuľka: prehľad jednotlivýh kmeňov / výrezov

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
        <td colspan="2" id="summaryInfo">{{ celkovy_objem | round: 2 }} m³ / ({{ id }} ks)</td>
      </tr>
    </tfoot>
  </table>

<div id="totalInfo" style="margin-top: 30px; padding: 20px; background: #fff9e6; border-left: 6px solid #ffc107; border-radius: 8px; font-family: sans-serif; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
  
  <div style="font-size: 1.5em; font-weight: bold; margin-bottom: 10px;">
    CELKOVÝ OBJEM: <span style="color: #856404;">{{ celkovy_objem | round: 2 }} m³</span>
  </div>

  <div style="display: flex; flex-wrap: wrap; gap: 15px; font-size: 0.95em; color: #444;">
    <div>Drevina: <strong>Dub</strong></div>
    <div>Počet: <strong>{{ id }} ks</strong></div>
    <div>
      Max. výťažnosť: <strong>4.72 m³</strong> 
      <small style="color: #856404; background: #ffeeba; padding: 2px 6px; border-radius: 4px; margin-left: 5px;">
        (kmeň č.69, Sklad 1, Hárok 2)
      </small>
    </div>
  </div>

</div>


<style>
  table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
  th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
  th { background-color: #4CAF50; color: black; text-align: center; }
  tr:nth-child(even) { background-color: #f9f9f9; }
</style>

---


