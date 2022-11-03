import { weatherData } from "../../types";
import '../styles/Current.css'

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
    <section className="currentWeather">
          <h1 className="locationName">{data.name}</h1>
          <div className="main">
            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].main} width="100" height="100" />
            <div className="text">
              <span className="temp">{data.main.temp}°</span>
              <span className="status">{data.weather[0].description}</span>
            </div>
          </div>
          <div className="extra">
            <span>Feels Like {data.main.feels_like}° | Humidity {data.main.humidity}%</span>
            <span>Wind {getDirection(data.wind.deg)} {data.wind.speed}{unit == 'metric' ? 'Km/h' : 'M/h'}</span>
          </div>
        </section>
  )
}

export default Current;