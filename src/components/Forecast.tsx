import { forecastData } from "../../types"
import ForecastItem from "./ForecastItem"
import '../styles/Forecast.css'


const Forecast = ({data, unit}: {data: forecastData, unit: 'metric' | 'imperial'}) => {
  
  return(
    <section className="forecast">
      {data.list.map((item, id) => {
        return(
          <ForecastItem key={id + item.dt} data={item} unit={unit} />
        )
      })}
    </section>
  )
}

export default Forecast;