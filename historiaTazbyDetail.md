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

    
<div id="tazba-history-chart" style="width: 100%;height:1024px;"></div>

<script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>

<script type="text/javascript">

var chartDom = document.getElementById('tazba-history-chart');
var myChart = echarts.init(chartDom);
var option;

const colors = {
  vlaknina: '#8d6e63',
  gulatina: '#66bb6a',
  vyber: '#fbc02d',
  stats: { max: '#2e7d32', avg: '#455a64', min: '#d32f2f' }
};

option = {
  title: [
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
      textStyle: { fontSize: 18, fontWeight: 'bold' }
    },
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

  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    // TENTO FORMÁT NAHRADÍ ČIARKY MEDZERAMI A PRIDÁ JEDNOTKY
    formatter: function (params) {
      var res = params[0].name + '<br/>';
      params.forEach(function (item) {
        var value = item.value;
        // Formátovanie čísla na slovenské (medzery namiesto čiarok)
        var formattedValue = value.toLocaleString('sk-SK');

        // Rozhodnutie, či pridať € alebo m³ na základe názvu série
        var unit =
          item.seriesName.indexOf('€') !== -1 ||
          item.seriesName.indexOf('Tržba') !== -1
            ? ' €'
            : ' m³';

        res +=
          item.marker +
          ' ' +
          item.seriesName +
          ': <b>' +
          formattedValue +
          unit +
          '</b><br/>';
      });
      return res;
    }
  },

  grid: [
    { left: '7%', right: '55%', top: '15%', height: '18%' },
    { left: '7%', right: '55%', top: '45%', height: '18%' },
    { left: '7%', right: '55%', top: '75%', height: '18%' },
    { left: '60%', right: '5%', top: '12%', height: '81%' }
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
    { type: 'value', gridIndex: 3, name: 'm³' },
    {
      type: 'value',
      gridIndex: 3,
      position: 'right',
      name: '€',
      splitLine: false
    }
  ],
  series: [
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
        formatter: (p) => p.value.toLocaleString('sk-SK') + ' €'
      }
    },
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
        formatter: (p) => p.value.toLocaleString('sk-SK') + ' €'
      }
    },
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
        formatter: (p) => p.value.toLocaleString('sk-SK') + ' €'
      }
    },
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
        formatter: (p) =>
          p.value +
          ' m³\n\n' +
          ['183.47', '189.03', '260.00'][p.dataIndex] +
          ' € / m³'
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
        formatter: (p) => p.value.toLocaleString('sk-SK') + ' €'
      }
    }
  ]
};

option && myChart.setOption(option);

// Automatická zmena veľkosti pri zmene okna
window.addEventListener('resize', function() {
myChart.resize();
});

</script>
