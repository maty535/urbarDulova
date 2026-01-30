
var chartDom = document.getElementById('tazba-history-chart');
var myChart = echarts.init(chartDom);
var option;

const colors = {
  vlaknina: '#8d6e63',
  gulatina: '#66bb6a',
  vyber: '#fbc02d',
  nezname: '#90a4ae',
  tržba: '#d32f2f'
};

const detailData = {
  '2022': { 
    vlaknina: { p: '24,2', eur: '34' }, 
    gulatina: { p: '52,2', eur: '200' }, 
    vyber: { p: '23,6', eur: '300' } 
  },
  '2023': { 
    vlaknina: { p: '31,6', eur: '56' }, 
    gulatina: { p: '52,5', eur: '205' }, 
    vyber: { p: '15,9', eur: '400' } 
  }
};

const getYearData = (name) => {
  const map = {
    '2022': { objem: '236,06', cena: '183,47' },
    '2023': { objem: '240,67', cena: '189,03' },
    '2026': { objem: '202,15', cena: '260,00' }
  };
  return map[name] || { objem: '0', cena: '0' };
};

var option = {
  title: {
    text: 'Analýza ťažby a výnosov (2022 - 2026)',
    left: 'center',
    top: '5%',
    textStyle: { fontSize: 26, fontWeight: 'bold' }
  },
  legend: {
    data: ['Vláknina', 'Guľatina', 'Výber', 'Celková ťažba (nešpecifikovaná)', 'Celková Tržba'],
    bottom: '5%'
  },
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
        var unit = item.seriesName.indexOf('€') !== -1 ||
                     item.seriesName.indexOf('Tržba') !== -1 ? ' €' : ' m³';

        res += item.marker + ' ' + item.seriesName + ': <b>' + formattedValue + unit + '</b><br/>';
      });
      return res;
    }
  },
  grid: { left: '8%', right: '10%', top: '15%', bottom: '10%', containLabel: true },
  xAxis: {
    type: 'category',
    data: ['2022', '2023', '2026'],
  },
  yAxis: [
    { 
      type: 'value', 
      name: 'Objem (m³)', 
      max: 350,
      splitNumber: 10,
      splitLine: { show: true, lineStyle: { type: 'dashed' } }
    },
    { 
      type: 'value', 
      name: 'Tržba (€)', 
      position: 'right', 
      min: 0, 
      max: 60000,
      splitLine: { show: false },
      axisLabel: { formatter: (value) => value >= 0 ? value.toLocaleString('sk-SK') + ' €' : '' }
    }
  ],
  series: [
    {
      name: 'Vláknina',
      type: 'bar',
      stack: 'tazba',
      itemStyle: { color: colors.vlaknina },
      data: [57.09, 76.02, 0],
      label: { 
        show: true, position: 'inside', color: '#fff', fontSize: 10,
        formatter: (p) => (p.value > 0 && detailData[p.name]) ? `${p.value} m³ (${detailData[p.name].vlaknina.p}%)\n${detailData[p.name].vlaknina.eur} €/m³` : '' 
      }
    },
    {
      name: 'Guľatina',
      type: 'bar',
      stack: 'tazba',
      itemStyle: { color: colors.gulatina },
      data: [123.21, 126.32, 0],
      label: { 
        show: true, position: 'inside', color: '#fff', fontSize: 10,
        formatter: (p) => (p.value > 0 && detailData[p.name]) ? `${p.value} m³ (${detailData[p.name].gulatina.p}%)\n${detailData[p.name].gulatina.eur} €/m³` : '' 
      }
    },
    {
      name: 'Výber',
      type: 'bar',
      stack: 'tazba',
      itemStyle: { color: colors.vyber },
      data: [55.76, 38.33, 0],
      label: { 
        show: true, position: 'inside', color: '#000', fontSize: 10,
        formatter: (p) => (p.value > 0 && detailData[p.name]) ? `${p.value} m³ (${detailData[p.name].vyber.p}%)\n${detailData[p.name].vyber.eur} €/m³` : '' 
      }
    },
    {
      name: 'Celková ťažba (nešpecifikovaná)',
      type: 'bar',
      stack: 'tazba',
      itemStyle: { color: colors.nezname },
      data: [0,0, 202.15],
      label: { 
        show: true, position: 'inside', color: '#fff', fontSize: 10,
        formatter: (p) => p.value > 0 ? `${p.value} m³ (100%)\n260,00 €/m³` : '' 
      }
    },
    {
      name: 'Celková Tržba',
      type: 'line',
      yAxisIndex: 1,
      symbolSize: 20,
      z: 0,
      lineStyle: { width: 6, color: colors.tržba },
      itemStyle: { color: colors.tržba },
      data: [43311, 45492, 52559],
      label: { 
        show: true, position: 'top', fontWeight: 'bold', backgroundColor: '#fff', 
        padding: [10, 10], borderRadius: 8, borderWidth: 2, borderColor: colors.tržba,
        shadowBlur: 12, shadowColor: 'rgba(0,0,0,0.15)', color: '#000', align: 'center',
        formatter: (p) => {
          const d = getYearData(p.name);
          return '{val|' + p.value.toLocaleString('sk-SK') + ' €}\n{sub|' + d.objem + ' m³}\n{price|Ø ' + d.cena + ' €/m³}';
        },
        rich: {
          val: { fontSize: 22, fontWeight: 'bold', lineHeight: 22 },
          sub: { fontSize: 16, color: '#555', lineHeight: 18 },
          price: { fontSize: 14, color: colors.tržba, fontWeight: 'bold', lineHeight: 18 }
        }
      }
    }
  ]
};

option && myChart.setOption(option);

// Automatická zmena veľkosti pri zmene okna
window.addEventListener('resize', function() {
myChart.resize();
});
