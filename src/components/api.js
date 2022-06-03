import APIParser from './apiParser';

const API = (() => {
  const getCityOptions = async (city) => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=6f84b948b64a49ec4618c61cb10bc7dc`, { mode: 'cors' });
    const data = await response.json();

    if (data.length < 1) {
      throw new Error(400);
    }
    return APIParser.parseCities(data);
  };

  const getCityCountryOptions = async (city, code) => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${code}&limit=5&appid=6f84b948b64a49ec4618c61cb10bc7dc`, { mode: 'cors' });
    const data = await response.json();

    if (data.length < 1) {
      throw new Error(400);
    }
    return APIParser.parseCities(data);
  };

  const getWeatherData = async (city) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=6f84b948b64a49ec4618c61cb10bc7dc`, { mode: 'cors' });
      const data = response.json();
      return APIParser.parseWeather(data);
    } catch (e) {
      return e;
    }
  };
  return { getCityOptions, getCityCountryOptions, getWeatherData };
})();

export default API;
