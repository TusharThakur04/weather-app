const weather = async (location) => {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=68HVFNVTQZ3V9GVV3M3MSXUF4&contentType=json`,
    { mode: "cors" }
  );
  const data = await response.json();
  return data;
};

const weatherData = (data) => {
  const fc = {
    date: [],
    temperature: [],
    humidity: [],
    uvindex: [],
    desc: [],
    windspeed: [],
  };
  data.days.slice(0, 7).forEach((e) => {
    fc.date.push(e.datetime);
    fc.temperature.push(e.temp);
    fc.desc.push(e.description);
    fc.humidity.push(e.humidity);
    fc.uvindex.push(e.uvindex);
    fc.windspeed.push(e.windspeed);
  });

  // Update today's weather on the page
  document.getElementById("todayDate").textContent = fc.date[0];
  document.getElementById("todayTemp").textContent = fc.temperature[0];
  document.getElementById("todayHumidity").textContent = fc.humidity[0];
  document.getElementById("todayUV").textContent = fc.uvindex[0];
  document.getElementById("todayDesc").textContent = fc.desc[0];
  document.getElementById("todayWind").textContent = fc.windspeed[0];

  // Update weekly forecast on the page
  const weeklyForecast = document.getElementById("weeklyForecast");
  weeklyForecast.innerHTML = ""; // Clear any previous content

  // Start from 1 if you want to skip today's weather
  for (let i = 1; i < fc.date.length; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");

    dayDiv.innerHTML = `
      <p>Date: ${fc.date[i]}</p>
      <p>Temp: ${fc.temperature[i]}°C</p>
      <p>Humidity: ${fc.humidity[i]}%</p>
      <p>UV Index: ${fc.uvindex[i]}</p>
      <p>Description: ${fc.desc[i]}</p>
      <p>Wind Speed: ${fc.windspeed[i]} km/h</p>
    `;

    weeklyForecast.appendChild(dayDiv);
  }
  return fc;
};

const forecast = async (location) => {
  const data = await weather(location);
  weatherData(data);
};

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission
  const loc = document.querySelector("#locationInput").value;
  forecast(loc);
});
