
function search(){
  
  var s = document.getElementById('search').value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  rows = (document.getElementsByTagName('tbody')[1]).getElementsByTagName('TR');
  for(var i=0;i<rows.length;i++){
    if(rows[i].textContent.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').indexOf(s)>0  || s.length==0 ) {
	  rows[i].style.display ='';
    } else {
      rows[i].style.display ='none';
    }
  }
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
