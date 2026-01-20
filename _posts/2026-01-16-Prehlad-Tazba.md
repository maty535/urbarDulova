---
layout: post
title: "Prehľad vyťaženého dreva v januári 2026"
date: 2026-01-16
author: Výbor urbáru
categories: drevo tazba
tags: drevo les hospodarenie podielnici tazba
published: true
---

## Sumárna evidencia ťažby dreva: Urbár - Gulvas 2026/01

**Drevina:** Dub

**Celkový objem:** 202.15 m³

Pre výpočet kubikáže jednotlivého stromu sa priemer kmeňa znižuje o hrúbku kôry, čo je v prípade duba 4 cm / kmeň.

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
| **CELKOM** | | **{{ logs.size }}** | **{{ total_sum | round: 2 }} m³** |

---
<script src="/assets/js/tazbaSearch.js"></script>
<div>
  <input type="text" size="30" maxlength="1000" value="" id="search"                       onkeyup="delayedSearch();" />
  Priemer výrezu od: <input type="text" size="10" maxlength="10"   value=""   id="priemer" onkeyup="delayedSearch();" />
  Dĺžka výrezu od: <input type="text"   size="10" maxlength="10"   value=""   id="dlzka"   onkeyup="delayedSearch();" />
  <input type="button" value="Vyhľadať" onclick="search();"/><br/>
</div>

{% assign celkovy_objem = 0 %}
{% assign id = 0 %}

### Tabuľka: prehľad jednotlivýh kmeňov / výrezov

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Hárok</th>
        <th>Sklad</th>
        <th>Číslo kmeňa</th>
        <th>Dĺžka (l) [m]</th>
        <th>Priemer (d) [cm]</th>
        <th>Objem (v) [m³]</th>
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

<div id="totalInfo" style="margin-top: 30px; padding: 20px; border: 2px solid #000; font-size: 1.2em; font-weight: bold; text-align: center;">
  CELKOVÁ SUMA: {{ celkovy_objem | round: 2 }} m³ / ({{ id }} ks)
</div>

<style>
  table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
  th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
  th { background-color: #4CAF50; color: black; text-align: center; }
  tr:nth-child(even) { background-color: #f9f9f9; }
</style>

---


