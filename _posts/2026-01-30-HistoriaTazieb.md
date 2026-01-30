---
layout: post
title: "Historický prehľad vyťaženého dreva v aktálnom LHP"
date: 2026-01-30
author: Ing. Matúš Ivanecký
categories: drevo tazba 
tags: drevo les hospodarenie podielnici tazba
published: true
---

* Týmto Vás chceme infromovať o histórii ťažobných činností v urbáre počas jednotlivých rokov :
* Budeme sa snažiť priniesť Vám celú históriu ťažobných činnosti aj v porovnaní s ich ekonomickým výnosom
  
 <div id="tazba-chart" style="width: 100%; height: 450px;"></div>

<script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>

<script type="text/javascript">
  var chartDom = document.getElementById('tazba-chart');
  var myChart = echarts.init(chartDom);
  
  // 3. Vytiahnutie a zoradenie dát zo site.data.historiaTazby
  {% assign zoradene_data = site.data.historiaTazby | sort: "rok" %}
  var rawData = {{ zoradene_data | jsonify }};
  
  // Príprava polí pre ECharts
  var roky = rawData.map(item => item.rok);
  var listnate = rawData.map(item => item.listnate);
  var ihlicnate = rawData.map(item => item.ihlicnate);
  var holiny = rawData.map(item => item.holiny);

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
        itemStyle: { color: '#27ae60' }
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
