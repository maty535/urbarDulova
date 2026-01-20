
function search(){
  
  var s = document.getElementById('search').value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  rows = (document.getElementsByTagName('tbody')[1]).getElementsByTagName('TR');

  var pocet = 0;
  var objem = 0.0;
	
  for(var i=0; i < rows.length; i++){
	  
    if(rows[i].textContent.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').indexOf(s) > 0  || s.length==0 ) {
	  rows[i].style.display ='';
	  pocet++;
	   // Index 1 je 7 stĺpec (objem vyrezu)
	  var cellVal =  rows[i].cells[6].textContent
      objem += parseFloat(cellVal);
      
		  
    } else {
      rows[i].style.display ='none';
    }
  }

  // Zapíšeme výsledok do bunky v tfoot
  document.getElementById('summaryInfo').textContent = objem.toFixed(2) + " m³ / (" + pocet + "ks )";
}


var timer;
function delayedSearch() {
	clearTimeout(timer);
	console.log('delay-ing')
    timer = setTimeout(function () {
		console.log('delay-running')
		search();
    }, 500);
  }
