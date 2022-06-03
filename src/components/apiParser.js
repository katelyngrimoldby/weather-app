const APIParser = (() => {
  const parseCities = (data) => {
    const arr = [];

    data.forEach((e) => {
      arr.push({
        cityName: e.name,
        country: e.country,
        lat: e.lat,
        lon: e.lon,
      });
    });
    return arr;
  };

  const parseWeather = (data) => {
    const obj = {
      cityName: data.name,
      description: data.weather.description,
      temp: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      windDeg: data.wind.deg,
    };
    return obj;
  };
  return { parseCities, parseWeather };
})();

export default APIParser;
