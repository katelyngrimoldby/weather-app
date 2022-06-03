const APIParser = (() => {
  const parseCities = (data) => {
    const arr = [];
    try {
      data.forEach((e) => {
        arr.push({
          cityName: e.name,
          country: e.country,
          lat: e.lat,
          lon: e.lon,
        });
      });
      return arr;
    } catch (e) {
      return e;
    }
  };

  const parseWeather = (data) => {
    const obj = {
      cityName: data.name,
      description: data.weather[0].description,
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
