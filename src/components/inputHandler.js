import API from './api';

const InputHandler = (() => {
  const input = document.getElementById('city');
  const submit = document.getElementById('submit');

  submit.addEventListener('click', async () => {
    const inputValue = input.value;
    let data;

    if (inputValue.includes(',')) {
      const arr = inputValue.split(',', 2);
      const city = arr[0].trim();
      const country = arr[1].trim();
      data = await API.getCityCountryOptions(city, country);
    } else {
      const city = inputValue.trim();
      data = await API.getCityOptions(city);
    }
    input.value = '';
    console.log(data);
  });
})();

export default InputHandler;
