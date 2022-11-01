import { useState, useEffect, useMemo } from "react"
import axios from "axios"

interface weatherData {
  coord: {
    lon: number,
    lat: number,
  },
  weather: {
    id: number,
    main: string,
    description: string,
    icon: string,
  }[],
  base: string,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level: number,
    grnd_level: number,
  },
  visibility: number,
  wind: {
    speed: number,
    deg: number,
    gust: number,
  },
  rain: {
    '1h': number,
    '3h': number,
  },
  snow: {
    '1h': number,
    '3h': number,
  }
  clouds: {
    all: number
  },
  sys: {
    type: number, 
    id: number, 
    country: string,
    sunrise: number,
    sunset: number,
  }
  timezone: number,
  id: number,
  name: string,
  cod: number,
}


async function get<T> (path: string): Promise<T> {
  const {data} = await axios.get(path);

  return data;
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

function App() {
  const geolocation = navigator.geolocation;
  const [location, setLocation] = useState({lat: 44.34, lon: 10.99});
  const [input, setInput] = useState("");
  const [unit, setUnit] =useState<'metric' | 'imperial'>('metric')
  const [data, setData] = useState<undefined | weatherData>()

  const setPosition = (input: GeolocationPosition) => {
    setLocation({lat: input.coords.latitude, lon: input.coords.longitude})
  }

  useMemo(async() => {
    const data = await get<weatherData>(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&units=${unit}&appid=${import.meta.env.VITE_API_KEY}`)

    setData(data);
  }, [])

  // Only run on mount
  // useEffect(() => {
  //   console.log('run location');
  //   geolocation.getCurrentPosition(usePosition);
  //   //console.log(get(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${import.meta.env.VITE_API_KEY}`))
  // }, [])

  //Update data when location changes
  // useEffect(() => {
  //   console.log('run');
  //   setData(get<weatherData>(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${import.meta.env.VITE_API_KEY}`))
  // }, [])

  

  return (
    <>
      
    </>
  )
}

export default App
