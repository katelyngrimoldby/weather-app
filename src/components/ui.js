import API from './api';

const UI = (() => {
  const content = document.getElementById('content');
  const clearContent = () => {
    while (content.firstChild) {
      content.removeChild(content.lastChild);
    }
  };

  const displayError = () => {
    const err = document.createElement('span');
    err.textContent = 'Error';
    content.appendChild(err);
  };

  const createWeatherCard = (data) => {
    // make card elements
    const card = document.createElement('div');
    const name = document.createElement('h1');
    const desc = document.createElement('h2');
    const temp = document.createElement('h3');
    const humidity = document.createElement('span');
    const windS = document.createElement('span');

    // add card contents
    card.classList.add('weatherCard');
    name.textContent = data.cityName;
    desc.textContent = data.description;
    temp.textContent = data.temp;
    humidity.classList.add('humidity');
    humidity.textContent = `${data.humidity}%   `;
    windS.classList.add('wind-speed');
    const speed = (data.windSpeed * 3.6).toFixed(1);
    windS.textContent = speed;

    // append to #content
    card.append(name, desc, temp, humidity, windS);
    content.appendChild(card);
  };

  const createCityCards = (data) => {
    // iterate thru each city
    data.forEach((e) => {
      // make card elements
      const card = document.createElement('div');
      const name = document.createElement('span');

      // add content for card
      card.classList.add('cityCard');
      name.textContent = `${e.cityName}, ${e.country}`;

      // append to #content
      card.appendChild(name);
      content.appendChild(card);

      // add event listener for card
      card.addEventListener('click', async () => {
        const response = await API.getWeatherData(e);
        clearContent();
        createWeatherCard(response);
      });
    });
  };
  return { clearContent, displayError, createCityCards };
})();

export default UI;
