---
layout: page
title: História
description: Základne míľniky urbárskeho spoločenstva
permalink: /historia/
---

Vyhľadávanie: <!-- Search Input --> <input type="text" id="search-input" placeholder="Vyhľadávať v histórii...">

<!-- Results Display -->
<ul id="search-results"></ul>

<!-- Initialization Script -->
<script>
  SimpleJekyllSearch({
	limit: 25, // Nastavte na ľubovoľné číslo alebo 1000 pre "všetky"
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('search-results'),
    json: '/search.json',
    searchResultTemplate: '<li>{datum} <a href="{url}" title="{title}">{title}</a></li>',
    noResultsText: 'Nenašiel sa žiadny príspevok'
  });
</script>

{%- for post in site.posts -%}
  {%- capture current_year -%}{{ post.date | date: "%Y" }}{%- endcapture -%}
  {%- unless current_year == previous_year -%}
    <h2>{{ current_year }}</h2>
	
    {%- assign previous_year = current_year -%}
  {%- endunless -%}
     <article class="post-item">
	 	- {{post.date | date: "%d. %m. %Y" }}  <a href="{{ post.url }}">{{ post.title | escape }}</a>
	  </article>
{%- endfor -%}



## 2020
Zmena spôsobu doručovania listín od orgánov verejnej moci na elektronickú podľa zákona o [305/2013 Z.z. o elektronickej podobe výkonu pôsobnosti orgánov verejnej moci a o zmene a doplnení niektorých zákonov, zákon o e-Governmente, § 60b odsek 3](https://www.slov-lex.sk/ezbierky-fe/pravne-predpisy/SK/ZZ/2013/305/20241001#paragraf-60b.odsek-3)
  
## 2014

Zmena právnej subjektivity ( na právnickú osobu) podľa zákona [97/2013 z.z. o pozemkových spoločenstvách](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2013/97/) a pridelenie IČO.

- [Zmluva o pozemkovom spoločenstve vlastníkov podielov spoločnej nehnuteľnosti](https://urbar.dulovaves.sk/docs/2014-01-14-ZZ-anon.pdf)

## 1995
	
Bola prijatá zákonna úprava vzťahov pozemkových spoločenstiev [181/1995 z.z. O pozemkových spoločenstvách](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/1995/181/vyhlasene_znenie.html)
    
## 1992

Obnovenie pozemkového spoločenstva ako občianskeho združenia vlastníkov spoločných nehnuteľností. Fungovanie sa pohybuje vrámci zákona: [293/1992 z.z. 
O úprave niektorých vlastníckych vzťahov k nehnuteľnostiam](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/1992/293/)

- [Stanovy občianskeho združenia vlastníkov spoločných nehnuteľností](https://urbar.dulovaves.sk/docs/1992-09-20-ZZ.pdf)
    

## 1948

V období rokov 1945 – 1989 nastáva v samotnom pozemkovom práve,  hlavne v súkromnom obhospodarovaní vlastníkmi úpadok, a úlohu obhospodarovateľa na seba preberá štát. Zákonný článok X/1913 bol zrušený zákonom SNR č. 81/1949 Zb. o úprave pomerov pasienkového majetku a zmenu v obhospodarovaní lesov priniesol zákon SNR č. 2/1958 Zb. o úprave pomerov spoločne obhospodarovaných lesov. Prijatím oboch zákonov došlo k zrušeniu pasienkových a lesných spoločenstiev a ich obhospodarovanie prešlo pod spoločnosť - štát. Vlastníctvo pasienkov k spoločným pasienkom prešlo do vlastníctva družstiev a spoluvlastníci sa ex lege stali členmi družstva, zatiaľ čo spoločné lesné pozemky boli odovzdané do obhospodarovania krajským správam lesov.

Prechodom spoločných lesov a pasienkov pod správu štátu zanikli pasienkové a lesné spoločenstvá a v spoločnosti nastal všeobecný nezáujem o vlastníctvo.


## 1913

zákonný článok X/1913 o nedeliteľných spoločných pasienkoch upravoval spravovanie prostredníctvom pasienkovej spoločnosti -  pasienková spoločnosť, ako právnická osoba, figurovala aj ako vlastník zapísaný do pozemkovej knihy (z tohto dôvodu sa s jej zápisom na LV môžem stretnúť aj dnes) a  v pozemkovej knihe zapísaní jednotliví spoluvlastníci spolu s veľkosťou ich podielov (spoluvlastníci vytvorili pasienkovú spoločnosť z dôvodu jednoduchšieho obhospodarovania.


## 1853

[Urbársky patent z 2. marca 1853](https://alex.onb.ac.at/cgi-content/alex?aid=rgb&datum=1853&page=301&size=45) definitívne potvrdil zrušenie urbárskeho pomeru a právo poddaných na vlastníctvo pôdy zapísanej v urbároch.


## 1848
Poddanstvo zrušené a urbárnici sa vyslobodili z urbárskeho pomeru z osobnoprávneho a majetkoprávneho hľadiska.
   

## 1757 

Tereziánsky urbár, pri ktorom ešte nemožno hovoriť o urbáre ako spoločenstve vlastníkov lesov a pasienkov, keďže boli stále vo vlastníctve zemepánov a vo vzťahu k poddanému išlo o užívateľský vzťah, ale vytvorili sa tzv. komposesoráty – zemianske vlastníctvo lesov a pasienkov.


## 16 st.
    
Rozšírenie urbárov u nás však môžeme registrovať už v polovici 16. storočia. Samotné slovo urbár je nemeckého pôvodu (odvodené od latinského urbs - mesto), vyjadrovalo výťažok, alebo dôchodok, najčastejšie sa používalo v baníctve. <br>

Urbár bol súpis pozemkového majetku, povinností a práv, ktoré mali poddaní voči svojmu zemepánovi. Je to v podstate hospodárska kniha alebo register.

Medzi hlavné body, ktoré urbár obsahoval, patrili:
* Rozsah pôdy, ktorú poddaný obhospodaroval.
* Peňažné dávky (činz), ktoré musel platiť.
* Naturálne dávky (odovzdávanie časti úrody, dobytka, vajec a pod.).
* Robotné povinnosti (koľko dní v roku musel poddaný bezplatne pracovať na panskom – tzv. roboty).
        
V období feudalizmu (stredoveku) sa prostredníctvom tzv. urbárov reguloval pomer medzi zemepánom a poddaným. Pôda spolu s poddaným, ktorý na nej sídlil, prešla do rúk zemepánov a v súvislosti s tým, došlo  k jej rozdeleniu na dominikál (pánsku pôdu) a rustikál (poddanskú, urbársku pôdu). Urbárska aj pánska pôda bola vo vlastníctve zemepána, avšak poddanskú pôdu zemepán prenechal poddaným do užívania. Podľa spôsobu užívania majetku, sa zaviedlo aj jeho delenie na poddanský, želiarský a domkársky. Zároveň sa pôda rozdelila na intravilán – domy, záhrady a extravilán – pasienky, lesy, oráčiny. Vo vzťahu k týmto pozemkom sa neskôr vytvorili tzv. urbárske formy spoluvlastníctva.
