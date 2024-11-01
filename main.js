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

  console.log(fc);

  return fc;
};

const forecast = async () => {
  const data = await weather();
  weatherData(data);
};

// forecast();
// const loc =

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault;
});
