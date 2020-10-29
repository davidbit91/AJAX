let url = 'https://restcountries.eu/rest/v2/all';
let url2 = 'https://api.geodatasource.com/neighbouring-countries?key=5YOYI2UHVODPGMJT7HWM3CE89YUKDKWY&country_code=';
let select = document.getElementById("select");
let textArea = document.getElementById("textArea");
let latLon = [41.6081, 2.2879];

var mymap = L.map('mapid').setView(latLon, 5);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);

let response = fetch(url);

response.then(value =>
  value.json()
).then(elemts => {
  for (let elem of elemts) {
    select.innerHTML += `<option value="${elem.alpha2Code}" lat=${elem.latlng}>${elem.name}</obtion>`;
  }
});


window.onload = function () {

  select.addEventListener('change', function () {
    textArea.innerHTML = "";
    let response2 = fetch(url2 + select.value);

    response2.then(val =>
      val.json()
    ).then(elemts => {
      latLon = [select.selectedOptions[0].getAttribute("lat")];
      for (let elm of elemts) {
       
        textArea.innerHTML += `${elm.country_name}\n`;        
      }
      let ins = latLon[0].split(",");      
      let l = [];
      for(let i = 0 ; i<ins.length;i++){
        l[i]=parseFloat(ins[i]);
      }
      
      var popup = L.popup()
        .setLatLng(l,100)
        .setContent(select.selectedOptions[0].innerHTML)
        .openOn(mymap);
    });
  });
}


