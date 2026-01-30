---
layout: home
title: "Historický prehľad vyťaženého dreva v aktuálnom LHP"
date: 2026-01-30
author: Ing. Matúš Ivanecký
categories: drevo tazba 
tags: drevo les hospodarenie podielnici tazba
published: true
---

* Týmto Vás chceme infromovať o histórii ťažobných činností v urbáre počas jednotlivých rokov v aktuálnom lesnom hospodárskom pláne.
* Budeme sa snažiť priniesť Vám celú históriu ťažobných činnosti aj v porovnaní s ich ekonomickým výnosom za jednotlivé roky, pričom efektivita výnosu závisí aj od trhových cien dreva, na ktoré samotné hospodárenie urbáru nemá reálny vplyv

    
<div id="tazba-chart" style="width: 100%; height: 450px;"></div>
<hr/>
<div id="tazba-history-chart" style="width: 100%;"></div>

<script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>

<script type="text/javascript">
  var chartDom = document.getElementById('tazba-chart');
  var myChart  = echarts.init(chartDom);
  
  // 3. Vytiahnutie a zoradenie dát zo site.data.historiaTazby
  {% assign zoradene_data = site.data.historiaTazby | sort: "rok" %}
  var rawData = {{ zoradene_data | jsonify }};
  
  // Príprava polí pre ECharts
  var roky      = rawData.map(item => item.rok);
  var listnate  = rawData.map(item => item.listnate);
  var ihlicnate = rawData.map(item => item.ihlicnate);
  var holiny    = rawData.map(item => item.holiny);

  var option = {
    title: {
      text: 'História ťažby a stav holín',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {
      data: ['Listnaté', 'Ihličnaté', 'Holiny'],
      top: '10%'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: roky
    },
    yAxis: [
      {
        type: 'value',
        name: 'Objem (m³)',
        position: 'left'
      },
      {
        type: 'value',
        name: 'Plocha holín (ha)',
        position: 'right',
        splitLine: { show: false } // Skryjeme mriežku pre druhú os, aby to nebolo neprehľadné
      }
    ],
    series: [
      {
        name: 'Listnaté',
        type: 'bar',
        stack: 'tazba', // Stĺpce budú nad sebou
        emphasis: { focus: 'series' },
        data: listnate,
        itemStyle: { color: '#27ae60' },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      },
      {
        name: 'Ihličnaté',
        type: 'bar',
        stack: 'tazba',
        emphasis: { focus: 'series' },
        data: ihlicnate,
        itemStyle: { color: '#2980b9' }
      },
      {
        name: 'Holiny',
        type: 'line',
        yAxisIndex: 1, // Použije pravú os
        smooth: true,
        symbolSize: 8,
        data: holiny,
        itemStyle: { color: '#e67e22' },
        lineStyle: { width: 3 }
      }
    ]
  };

  myChart.setOption(option);

  // Automatická zmena veľkosti pri zmene okna
  window.addEventListener('resize', function() {
    myChart.resize();
  });
</script>


<script>

var chartDom1 = document.getElementById('tazba-history-chart');
var myChart1 = echarts.init(chartDom1);
var option;

const colors = {
  vlaknina: '#8d6e63',
  gulatina: '#66bb6a',
  vyber: '#fbc02d',
  stats: { max: '#2e7d32', avg: '#455a64', min: '#d32f2f' }
};

// Funkcia na formátovanie tisícok medzerou
const formatEuro = (val) =>
  val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' €';

option = {
  title: [
    // Hlavné nadpisy stĺpcov
    {
      text: 'ANALÝZA PODĽA TYPOV DREVIN',
      left: '25%',
      top: '1%',
      textAlign: 'center',
      textStyle: { fontSize: 16, fontWeight: 'bold' }
    },
    {
      text: 'CELKOVÝ SUMÁR ŤAŽBY',
      left: '75%',
      top: '1%',
      textAlign: 'center',
      textStyle: { fontSize: 18, fontWeight: 'bold', color: '#333' }
    },

    // Vycentrované názvy nad jednotlivými grafmi vľavo (stred je na 25% šírky obrazovky)
    {
      text: 'VÝBER',
      left: '25%',
      top: '10%',
      textAlign: 'center',
      textStyle: { color: colors.vyber, fontSize: 13, fontWeight: 'bold' }
    },
    {
      text: 'GUĽATINA',
      left: '25%',
      top: '40%',
      textAlign: 'center',
      textStyle: { color: colors.gulatina, fontSize: 13, fontWeight: 'bold' }
    },
    {
      text: 'VLÁKNINA',
      left: '25%',
      top: '70%',
      textAlign: 'center',
      textStyle: { color: colors.vlaknina, fontSize: 13, fontWeight: 'bold' }
    }
  ],
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  grid: [
    { left: '7%', right: '55%', top: '15%', height: '18%' }, // Výber
    { left: '7%', right: '55%', top: '45%', height: '18%' }, // Guľatina
    { left: '7%', right: '55%', top: '75%', height: '18%' }, // Vláknina
    { left: '60%', right: '5%', top: '12%', height: '81%' } // Sumár
  ],
  xAxis: [
    { type: 'category', data: ['2022', '2023'], gridIndex: 0 },
    { type: 'category', data: ['2022', '2023'], gridIndex: 1 },
    { type: 'category', data: ['2022', '2023'], gridIndex: 2 },
    { type: 'category', data: ['2022', '2023', '2026'], gridIndex: 3 }
  ],
  yAxis: [
    { type: 'value', gridIndex: 0, name: 'm³' },
    {
      type: 'value',
      gridIndex: 0,
      position: 'right',
      name: '€',
      splitLine: false
    },
    { type: 'value', gridIndex: 1, name: 'm³' },
    {
      type: 'value',
      gridIndex: 1,
      position: 'right',
      name: '€',
      splitLine: false
    },
    { type: 'value', gridIndex: 2, name: 'm³' },
    {
      type: 'value',
      gridIndex: 2,
      position: 'right',
      name: '€',
      splitLine: false
    },
    { type: 'value', gridIndex: 3, name: 'Celkový Objem (m³)' },
    {
      type: 'value',
      gridIndex: 3,
      position: 'right',
      name: 'Celková Suma (€)',
      splitLine: false
    }
  ],
  series: [
    // --- 1. VÝBER ---
    {
      name: 'Výber (m³)',
      type: 'bar',
      xAxisIndex: 0,
      yAxisIndex: 0,
      data: [55.76, 38.33],
      itemStyle: { color: colors.vyber },
      barWidth: '45%',
      label: {
        show: true,
        position: 'inside',
        color: '#000',
        fontWeight: 'bold',
        fontSize: 9,
        formatter: (p) =>
          p.value + ' m³\n' + (p.dataIndex === 0 ? '300' : '400') + ' € / m³'
      }
    },
    {
      name: 'Výber (€)',
      type: 'line',
      xAxisIndex: 0,
      yAxisIndex: 1,
      data: [16728, 15332],
      itemStyle: { color: '#333' },
      label: {
        show: true,
        position: 'top',
        fontSize: 10,
        formatter: (p) => formatEuro(p.value)
      }
    },

    // --- 2. GUĽATINA ---
    {
      name: 'Guľatina (m³)',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 2,
      data: [123.21, 126.32],
      itemStyle: { color: colors.gulatina },
      barWidth: '45%',
      label: {
        show: true,
        position: 'inside',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 9,
        formatter: (p) =>
          p.value + ' m³\n' + (p.dataIndex === 0 ? '200' : '205') + ' € / m³'
      }
    },
    {
      name: 'Guľatina (€)',
      type: 'line',
      xAxisIndex: 1,
      yAxisIndex: 3,
      data: [24642, 25895],
      itemStyle: { color: '#333' },
      label: {
        show: true,
        position: 'top',
        fontSize: 10,
        formatter: (p) => formatEuro(p.value)
      }
    },

    // --- 3. VLÁKNINA ---
    {
      name: 'Vláknina (m³)',
      type: 'bar',
      xAxisIndex: 2,
      yAxisIndex: 4,
      data: [57.09, 76.02],
      itemStyle: { color: colors.vlaknina },
      barWidth: '45%',
      label: {
        show: true,
        position: 'inside',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 9,
        formatter: (p) =>
          p.value + ' m³\n' + (p.dataIndex === 0 ? '34' : '56') + ' € / m³'
      }
    },
    {
      name: 'Vláknina (€)',
      type: 'line',
      xAxisIndex: 2,
      yAxisIndex: 5,
      data: [1941, 4265],
      itemStyle: { color: '#333' },
      label: {
        show: true,
        position: 'top',
        fontSize: 10,
        formatter: (p) => formatEuro(p.value)
      }
    },

    // --- SUMÁRNY GRAF ---
    {
      name: 'Celkový Objem (m³)',
      type: 'bar',
      xAxisIndex: 3,
      yAxisIndex: 6,
      data: [236.06, 240.67, 202.15],
      itemStyle: { color: '#90a4ae' },
      barWidth: '50%',
      label: {
        show: true,
        position: 'inside',
        color: '#fff',
        fontWeight: 'bold',
        formatter: (p) => {
          const unitPrices = ['183.47', '189.03', '260.00'];
          return p.value + ' m³\n\n' + unitPrices[p.dataIndex] + ' € / m³';
        }
      },
      markLine: {
        symbol: 'none',
        data: [
          {
            type: 'max',
            name: 'Max',
            lineStyle: { color: colors.stats.max, type: 'dotted' },
            label: { formatter: 'MAX: {c} m³' }
          },
          {
            type: 'average',
            name: 'Avg',
            lineStyle: { color: colors.stats.avg, type: 'dashed' },
            label: { formatter: 'PRIEMER: {c} m³', position: 'start' }
          },
          {
            type: 'min',
            name: 'Min',
            lineStyle: { color: colors.stats.min, type: 'dotted' },
            label: { formatter: 'MIN: {c} m³' }
          }
        ]
      }
    },
    {
      name: 'Celková Tržba (€)',
      type: 'line',
      xAxisIndex: 3,
      yAxisIndex: 7,
      data: [43311, 45492, 52559],
      itemStyle: { color: '#d32f2f' },
      lineStyle: { width: 4 },
      symbolSize: 10,
      label: {
        show: true,
        position: 'top',
        backgroundColor: '#fff',
        padding: 4,
        borderRadius: 4,
        fontWeight: 'bold',
        formatter: (p) => formatEuro(p.value)
      }
    }
  ]
};

option && myChart1.setOption(option);

// Automatická zmena veľkosti pri zmene okna
window.addEventListener('resize', function() {
myChart1.resize();
});

</script>
