
function search(){
  
  var s = document.getElementById('search').value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  var priemer = document.getElementById('priemer').value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  var dlzka  = document.getElementById('dlzka').value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if( priemer == '' ){
	 priemer = 0.0;
  }
  if( dlzka == '' ){
	 dlzka = 0.0;
  }
	 

  priemer = parseFloat(priemer);
  dlzka = parseFloat(dlzka);
	
  rows = (document.getElementsByTagName('tbody')[1]).getElementsByTagName('TR');

  var pocet = 0;
  var objem = 0.0;
	
  for(var i=0; i < rows.length; i++){
    curPriemer = rows[i].cells[5].textContent;
	curDlzka   = rows[i].cells[4].textContent;
	if( priemer > 0){

		if(curPriemer >= priemer ){
			pocet++;
			rows[i].style.display ='';
			// Index 1 je 7 stĺpec (objem vyrezu)
		    var cellVal =  rows[i].cells[6].textContent;
	        objem += parseFloat(cellVal);
			continue;
		}
		else{
			rows[i].style.display ='none';
			continue;
		}
	}
	if( dlzka > 0 ){
		if (curDlzka >= dlzka){ 
			pocet++;
			rows[i].style.display ='';
			// Index 1 je 7 stĺpec (objem vyrezu)
		    var cellVal =  rows[i].cells[6].textContent;
	        objem += parseFloat(cellVal);
			continue;
		}
		else{
			rows[i].style.display ='none';
			continue;
		}
	}
	  
    if(rows[i].textContent.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').indexOf(s) > 0  || s.length==0 ) {
	  rows[i].style.display ='';
	  pocet++;
	   // Index 1 je 7 stĺpec (objem vyrezu)
	  var cellVal =  rows[i].cells[6].textContent;
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
