import { weatherData } from "../../types";

const getDirection = (deg: number) => {
  switch (true) {
    case deg == 0 || deg == 360: 
      return 'N';
    case deg == 90:
      return 'E';
    case deg == 180:
      return 'S';
    case deg == 270: 
      return 'W';
    case deg > 0 && deg < 90:
      return 'NE';
    case deg > 90 && deg < 180:
      return 'SE';
    case deg > 180 && deg < 270:
      return 'SW';
    case deg > 270 && deg < 360:
      return 'NW';
    default:
      return '';
  }
}
const Current = ({data, unit}: {data: weatherData, unit: 'metric' | 'imperial'}) => {

  return (
    <section>
          <h1>{data.name}</h1>
          <div>
            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].main} />
            <div>
              <span>{data.main.temp}°</span>
              <span>{data.weather[0].description}</span>
            </div>
            <div>
              <span>Feels Like {data.main.feels_like}° | Humidity {data.main.humidity}%</span>
              <span>Wind {getDirection(data.wind.deg)} {data.wind.speed}{unit == 'metric' ? 'Km/h' : 'M/h'}</span>
            </div>
          </div>
        </section>
  )
}

export default Current;