const API_KEY = "fa3e87a610e30d0403d2c95118c35652";

const forecastTitle = document.querySelector("#results__forecast__title");

forecastTitle.innerText = "Enter a city to get the weather forecast";

function handleSubmit(event) {
  event.preventDefault();

  const city = document.querySelector(".cityInput").value;

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      const lat = data[0].lat;
      const lon = data[0].lon;

      fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          const city = data.city;
          const cityName = city.name;
          const countryName = city.country;

          const resultsElement = document.querySelector(".results");

          const resultsHeaderElement =
            document.querySelector(".results__header");
          if (resultsHeaderElement) {
            resultsHeaderElement.remove();
          }

          const currentWeather = data.list[0];

          resultsElement.insertAdjacentHTML(
            "afterbegin",
            `
          <div class="results__header">
            <h2>${cityName}, ${countryName} (Latest)</h2>
            <p>Temp: <br><span>${currentWeather.main.temp}&deg;C</span></p>
            <p>Wind: <br><span>${currentWeather.wind.speed}KPH</span></p>
            <p>Humidity: <br><span>${currentWeather.main.humidity}%</span></p>
          </div>
          `
          );

          const forecastElement = document.querySelector(
            ".results__forecast__cards"
          );

          forecastElement.innerHTML = "";

          const forecastTitle = document.querySelector(
            "#results__forecast__title"
          );

          forecastTitle.innerText = "5-Day Forecast:";

          for (const day of data.list) {
            if (day.dt_txt.includes("12:00:00")) {
              const date = moment.unix(day.dt).format("DD/MM/YYYY");

              forecastElement.insertAdjacentHTML(
                "beforeend",
                `
              <div class="results__forecast__cards__card">
                <h4>${date}</h4>
                <p>Temp: <br><span>${day.main.temp}&deg;C</span></p>
                <p>Wind: <br><span>${day.wind.speed}KPH</span></p>
                <p>Humidity: <br><span>${day.main.humidity}%</span></p>
              </div>
          `
              );
            }
          }
        });
    });
}
