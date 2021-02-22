let weather = {
  apiKey: "d24f2403095df6c3c84511b9de888bac",
  fetchWeather: function(city) {
    var e = document.getElementById("validationCustom04");
    var nombre = document.querySelector(".namegetter").value;
    var usuario = e.options[e.selectedIndex].value;

    if (nombre != "" && usuario != "") {
      fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey).then((response) =>{
        if (!response.ok) {
          Swal.fire({
            icon: 'error',
            title: 'La ciudad no existe',
            text: 'Escribe una ciudad existente',
            confirmButtonText: '- OK -'
          })
        }
        return response.json();
      }).then((data) =>this.displayWeather(data, city));
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Faltan Datos',
        text: 'Rellena todos los campos',
        confirmButtonText: '- OK -'
      })
    }
  },
  displayWeather: function(data, city) {
    const {
      nombre
    } = data;
    const {
      icon,
      description
    } = data.weather[0];
    const {
      temp,
      temp_max,
      temp_min
    } = data.main;
    document.querySelector(".city").innerText = "El Tiempo en: " + city;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".temp_min").innerText = "Min:  " + temp_min + "°C";
    document.querySelector(".temp_max").innerText = "Max:  " + temp_max + "°C";
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
  },
  search: function() {
    this.fetchWeather(document.querySelector(".search-bar").value);
  }
};

function search() {
  var value = document.querySelector(".search_button");

  if (value != null) {
    value.addEventListener("click", weather.search());
  }
  var value2 = document.querySelector(".search-bar");

  if (value2 != null) {
    value2.addEventListener("keyup",
    function(event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  }
}