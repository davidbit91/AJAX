let url = 'https://restcountries.eu/rest/v2/all';
let url2 = 'https://api.geodatasource.com/neighbouring-countries?key=5YOYI2UHVODPGMJT7HWM3CE89YUKDKWY&country_code=';
let select = document.getElementById("select");
let textArea = document.getElementById("textArea");

let response = fetch(url);

response.then(value =>
  value.json()
).then(elemts => {
  for (let elem of elemts) {
    select.innerHTML += `<option value="${elem.alpha2Code}">${elem.name}</obtion>`;
  }
});


window.onload = function () {

  document.body.appendChild(select);
  select.addEventListener('change', function () {
    textArea.innerHTML = "";
    let response2 = fetch(url2 + select.value);

    response2.then(val =>
      val.json()
    ).then(elemts => {
      for (let elm of elemts) {
        textArea.innerHTML += `${elm.country_name}\n`;
      }
    });
  });
}


