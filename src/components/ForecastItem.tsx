import { useState } from "react";
import { forecastEntry } from "../../types";

const getTime = (stamp: string) => {
  switch (true) {
    case stamp.includes('00:00:00'):
      return '12AM';
    case stamp.includes('03:00:00'):
      return '3AM';
    case stamp.includes('06:00:00'):
      return '6AM';
    case stamp.includes('09:00:00'):
      return '9AM';
    case stamp.includes('12:00:00'):
      return '12PM';
    case stamp.includes('15:00:00'):
      return '3PM';
    case stamp.includes('18:00:00'):
      return '6PM';
    case stamp.includes('21:00:00'):
      return '9PM';
    default:
      return '';
  }
}

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

const ForecastItem = ({data, unit}: {data: forecastEntry, unit: 'metric' | 'imperial'}) => {
  const [open, setOpen] = useState(false)

  return(
    <div className="data">
            <div className="top">
              <div className="left">
                <span>{getTime(data.dt_txt)}</span>
                  <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].main} width="100" height="100" />
              </div>
              <span>{Math.round(data.main.temp)}°</span>
              <button type="button" onClick={() => {
                setOpen(!open);
              }}>{open ? '-' : '+'}</button>
            </div>
            <div className={open ? "bottom open" : "bottom"}>
            <span>{data.weather[0].description}</span>
              <div className="right">
                <span>{getDirection(data.wind.deg)} {data.wind.speed}{unit == 'metric' ? 'Km/h' : 'M/h'}</span>
                <span>{Math.round(data.pop)}%</span>
              </div>
            </div>
          </div>
  )
}

export default ForecastItem;