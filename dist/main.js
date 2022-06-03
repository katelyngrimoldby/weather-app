/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/api.js":
/*!*******************************!*\
  !*** ./src/components/api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _apiParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiParser */ "./src/components/apiParser.js");


const API = (() => {
  const getCityOptions = async (city) => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=6f84b948b64a49ec4618c61cb10bc7dc`, { mode: 'cors' });
    const data = await response.json();

    if (data.length < 1) {
      throw new Error(400);
    }
    return _apiParser__WEBPACK_IMPORTED_MODULE_0__["default"].parseCities(data);
  };

  const getCityCountryOptions = async (city, code) => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${code}&limit=5&appid=6f84b948b64a49ec4618c61cb10bc7dc`, { mode: 'cors' });
    const data = await response.json();

    if (data.length < 1) {
      throw new Error(400);
    }
    return _apiParser__WEBPACK_IMPORTED_MODULE_0__["default"].parseCities(data);
  };

  const getWeatherData = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=6f84b948b64a49ec4618c61cb10bc7dc`, { mode: 'cors' });
    const data = await response.json();
    return _apiParser__WEBPACK_IMPORTED_MODULE_0__["default"].parseWeather(data);
  };
  return { getCityOptions, getCityCountryOptions, getWeatherData };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (API);


/***/ }),

/***/ "./src/components/apiParser.js":
/*!*************************************!*\
  !*** ./src/components/apiParser.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (APIParser);


/***/ }),

/***/ "./src/components/ui.js":
/*!******************************!*\
  !*** ./src/components/ui.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/components/api.js");


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
        const response = await _api__WEBPACK_IMPORTED_MODULE_0__["default"].getWeatherData(e);
        clearContent();
        createWeatherCard(response);
      });
    });
  };
  return { clearContent, displayError, createCityCards };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UI);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/api */ "./src/components/api.js");
/* harmony import */ var _components_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/ui */ "./src/components/ui.js");



(() => {
  const input = document.getElementById('city');
  const submit = document.getElementById('submit');

  submit.addEventListener('click', async () => {
    const inputValue = input.value;
    let data;
    try {
      if (inputValue.includes(',')) {
        const arr = inputValue.split(',', 2);
        const city = arr[0].trim();
        const country = arr[1].trim();
        data = await _components_api__WEBPACK_IMPORTED_MODULE_0__["default"].getCityCountryOptions(city, country);
      } else {
        const city = inputValue.trim();
        data = await _components_api__WEBPACK_IMPORTED_MODULE_0__["default"].getCityOptions(city);
      }
      _components_ui__WEBPACK_IMPORTED_MODULE_1__["default"].clearContent();
      _components_ui__WEBPACK_IMPORTED_MODULE_1__["default"].createCityCards(data);
    } catch (e) {
      _components_ui__WEBPACK_IMPORTED_MODULE_1__["default"].displayError();
    }
    input.value = '';
  });
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBb0M7O0FBRXBDO0FBQ0E7QUFDQSxtRkFBbUYsS0FBSyxvREFBb0QsY0FBYztBQUMxSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLDhEQUFxQjtBQUNoQzs7QUFFQTtBQUNBLG1GQUFtRixLQUFLLEdBQUcsS0FBSyxvREFBb0QsY0FBYztBQUNsSzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLDhEQUFxQjtBQUNoQzs7QUFFQTtBQUNBLHdGQUF3RixTQUFTLE9BQU8sU0FBUyx5REFBeUQsY0FBYztBQUN4TDtBQUNBLFdBQVcsK0RBQXNCO0FBQ2pDO0FBQ0EsV0FBVztBQUNYLENBQUM7O0FBRUQsaUVBQWUsR0FBRyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMvQm5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxDQUFDOztBQUVELGlFQUFlLFNBQVMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDRDs7QUFFeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixjQUFjO0FBQzVDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRCQUE0QixXQUFXLElBQUksVUFBVTs7QUFFckQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQkFBK0IsMkRBQWtCO0FBQ2pEO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0EsV0FBVztBQUNYLENBQUM7O0FBRUQsaUVBQWUsRUFBRSxFQUFDOzs7Ozs7O1VDbkVsQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05tQztBQUNGOztBQUVqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw2RUFBeUI7QUFDOUMsUUFBUTtBQUNSO0FBQ0EscUJBQXFCLHNFQUFrQjtBQUN2QztBQUNBLE1BQU0sbUVBQWU7QUFDckIsTUFBTSxzRUFBa0I7QUFDeEIsTUFBTTtBQUNOLE1BQU0sbUVBQWU7QUFDckI7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29tcG9uZW50cy9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29tcG9uZW50cy9hcGlQYXJzZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29tcG9uZW50cy91aS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBUElQYXJzZXIgZnJvbSAnLi9hcGlQYXJzZXInO1xuXG5jb25zdCBBUEkgPSAoKCkgPT4ge1xuICBjb25zdCBnZXRDaXR5T3B0aW9ucyA9IGFzeW5jIChjaXR5KSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9kaXJlY3Q/cT0ke2NpdHl9JmxpbWl0PTUmYXBwaWQ9NmY4NGI5NDhiNjRhNDllYzQ2MThjNjFjYjEwYmM3ZGNgLCB7IG1vZGU6ICdjb3JzJyB9KTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgaWYgKGRhdGEubGVuZ3RoIDwgMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKDQwMCk7XG4gICAgfVxuICAgIHJldHVybiBBUElQYXJzZXIucGFyc2VDaXRpZXMoZGF0YSk7XG4gIH07XG5cbiAgY29uc3QgZ2V0Q2l0eUNvdW50cnlPcHRpb25zID0gYXN5bmMgKGNpdHksIGNvZGUpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL2RpcmVjdD9xPSR7Y2l0eX0sJHtjb2RlfSZsaW1pdD01JmFwcGlkPTZmODRiOTQ4YjY0YTQ5ZWM0NjE4YzYxY2IxMGJjN2RjYCwgeyBtb2RlOiAnY29ycycgfSk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIGlmIChkYXRhLmxlbmd0aCA8IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcig0MDApO1xuICAgIH1cbiAgICByZXR1cm4gQVBJUGFyc2VyLnBhcnNlQ2l0aWVzKGRhdGEpO1xuICB9O1xuXG4gIGNvbnN0IGdldFdlYXRoZXJEYXRhID0gYXN5bmMgKGNpdHkpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9sYXQ9JHtjaXR5LmxhdH0mbG9uPSR7Y2l0eS5sb259JnVuaXRzPW1ldHJpYyZhcHBpZD02Zjg0Yjk0OGI2NGE0OWVjNDYxOGM2MWNiMTBiYzdkY2AsIHsgbW9kZTogJ2NvcnMnIH0pO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIEFQSVBhcnNlci5wYXJzZVdlYXRoZXIoZGF0YSk7XG4gIH07XG4gIHJldHVybiB7IGdldENpdHlPcHRpb25zLCBnZXRDaXR5Q291bnRyeU9wdGlvbnMsIGdldFdlYXRoZXJEYXRhIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBBUEk7XG4iLCJjb25zdCBBUElQYXJzZXIgPSAoKCkgPT4ge1xuICBjb25zdCBwYXJzZUNpdGllcyA9IChkYXRhKSA9PiB7XG4gICAgY29uc3QgYXJyID0gW107XG4gICAgdHJ5IHtcbiAgICAgIGRhdGEuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICBhcnIucHVzaCh7XG4gICAgICAgICAgY2l0eU5hbWU6IGUubmFtZSxcbiAgICAgICAgICBjb3VudHJ5OiBlLmNvdW50cnksXG4gICAgICAgICAgbGF0OiBlLmxhdCxcbiAgICAgICAgICBsb246IGUubG9uLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcGFyc2VXZWF0aGVyID0gKGRhdGEpID0+IHtcbiAgICBjb25zdCBvYmogPSB7XG4gICAgICBjaXR5TmFtZTogZGF0YS5uYW1lLFxuICAgICAgZGVzY3JpcHRpb246IGRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgIHRlbXA6IGRhdGEubWFpbi50ZW1wLFxuICAgICAgaHVtaWRpdHk6IGRhdGEubWFpbi5odW1pZGl0eSxcbiAgICAgIHdpbmRTcGVlZDogZGF0YS53aW5kLnNwZWVkLFxuICAgICAgd2luZERlZzogZGF0YS53aW5kLmRlZyxcbiAgICB9O1xuICAgIHJldHVybiBvYmo7XG4gIH07XG4gIHJldHVybiB7IHBhcnNlQ2l0aWVzLCBwYXJzZVdlYXRoZXIgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEFQSVBhcnNlcjtcbiIsImltcG9ydCBBUEkgZnJvbSAnLi9hcGknO1xuXG5jb25zdCBVSSA9ICgoKSA9PiB7XG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpO1xuICBjb25zdCBjbGVhckNvbnRlbnQgPSAoKSA9PiB7XG4gICAgd2hpbGUgKGNvbnRlbnQuZmlyc3RDaGlsZCkge1xuICAgICAgY29udGVudC5yZW1vdmVDaGlsZChjb250ZW50Lmxhc3RDaGlsZCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlFcnJvciA9ICgpID0+IHtcbiAgICBjb25zdCBlcnIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgZXJyLnRleHRDb250ZW50ID0gJ0Vycm9yJztcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGVycik7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlV2VhdGhlckNhcmQgPSAoZGF0YSkgPT4ge1xuICAgIC8vIG1ha2UgY2FyZCBlbGVtZW50c1xuICAgIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBjb25zdCBkZXNjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICBjb25zdCB0ZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICBjb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCB3aW5kUyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgIC8vIGFkZCBjYXJkIGNvbnRlbnRzXG4gICAgY2FyZC5jbGFzc0xpc3QuYWRkKCd3ZWF0aGVyQ2FyZCcpO1xuICAgIG5hbWUudGV4dENvbnRlbnQgPSBkYXRhLmNpdHlOYW1lO1xuICAgIGRlc2MudGV4dENvbnRlbnQgPSBkYXRhLmRlc2NyaXB0aW9uO1xuICAgIHRlbXAudGV4dENvbnRlbnQgPSBkYXRhLnRlbXA7XG4gICAgaHVtaWRpdHkuY2xhc3NMaXN0LmFkZCgnaHVtaWRpdHknKTtcbiAgICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGAke2RhdGEuaHVtaWRpdHl9JSAgIGA7XG4gICAgd2luZFMuY2xhc3NMaXN0LmFkZCgnd2luZC1zcGVlZCcpO1xuICAgIGNvbnN0IHNwZWVkID0gKGRhdGEud2luZFNwZWVkICogMy42KS50b0ZpeGVkKDEpO1xuICAgIHdpbmRTLnRleHRDb250ZW50ID0gc3BlZWQ7XG5cbiAgICAvLyBhcHBlbmQgdG8gI2NvbnRlbnRcbiAgICBjYXJkLmFwcGVuZChuYW1lLCBkZXNjLCB0ZW1wLCBodW1pZGl0eSwgd2luZFMpO1xuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoY2FyZCk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlQ2l0eUNhcmRzID0gKGRhdGEpID0+IHtcbiAgICAvLyBpdGVyYXRlIHRocnUgZWFjaCBjaXR5XG4gICAgZGF0YS5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAvLyBtYWtlIGNhcmQgZWxlbWVudHNcbiAgICAgIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgIC8vIGFkZCBjb250ZW50IGZvciBjYXJkXG4gICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2NpdHlDYXJkJyk7XG4gICAgICBuYW1lLnRleHRDb250ZW50ID0gYCR7ZS5jaXR5TmFtZX0sICR7ZS5jb3VudHJ5fWA7XG5cbiAgICAgIC8vIGFwcGVuZCB0byAjY29udGVudFxuICAgICAgY2FyZC5hcHBlbmRDaGlsZChuYW1lKTtcbiAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoY2FyZCk7XG5cbiAgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lciBmb3IgY2FyZFxuICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBBUEkuZ2V0V2VhdGhlckRhdGEoZSk7XG4gICAgICAgIGNsZWFyQ29udGVudCgpO1xuICAgICAgICBjcmVhdGVXZWF0aGVyQ2FyZChyZXNwb25zZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbiAgcmV0dXJuIHsgY2xlYXJDb250ZW50LCBkaXNwbGF5RXJyb3IsIGNyZWF0ZUNpdHlDYXJkcyB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgVUk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBBUEkgZnJvbSAnLi9jb21wb25lbnRzL2FwaSc7XG5pbXBvcnQgVUkgZnJvbSAnLi9jb21wb25lbnRzL3VpJztcblxuKCgpID0+IHtcbiAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2l0eScpO1xuICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0Jyk7XG5cbiAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0VmFsdWUgPSBpbnB1dC52YWx1ZTtcbiAgICBsZXQgZGF0YTtcbiAgICB0cnkge1xuICAgICAgaWYgKGlucHV0VmFsdWUuaW5jbHVkZXMoJywnKSkge1xuICAgICAgICBjb25zdCBhcnIgPSBpbnB1dFZhbHVlLnNwbGl0KCcsJywgMik7XG4gICAgICAgIGNvbnN0IGNpdHkgPSBhcnJbMF0udHJpbSgpO1xuICAgICAgICBjb25zdCBjb3VudHJ5ID0gYXJyWzFdLnRyaW0oKTtcbiAgICAgICAgZGF0YSA9IGF3YWl0IEFQSS5nZXRDaXR5Q291bnRyeU9wdGlvbnMoY2l0eSwgY291bnRyeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjaXR5ID0gaW5wdXRWYWx1ZS50cmltKCk7XG4gICAgICAgIGRhdGEgPSBhd2FpdCBBUEkuZ2V0Q2l0eU9wdGlvbnMoY2l0eSk7XG4gICAgICB9XG4gICAgICBVSS5jbGVhckNvbnRlbnQoKTtcbiAgICAgIFVJLmNyZWF0ZUNpdHlDYXJkcyhkYXRhKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBVSS5kaXNwbGF5RXJyb3IoKTtcbiAgICB9XG4gICAgaW5wdXQudmFsdWUgPSAnJztcbiAgfSk7XG59KSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9