import { useState, useEffect, useMemo } from "react"
import axios from "axios"
import {weatherData} from '../types'
import menuBtn from './assets/menu.svg'
import closeBtn from './assets/close.svg'
import locationBtn from './assets/location.svg';
import Current from './components/Current'


async function get<T> (path: string): Promise<T> {
  const {data} = await axios.get(path);

  return data;
}



function App() {
  const geolocation = navigator.geolocation;
  const [location, setLocation] = useState({lat: 44.34, lon: 10.99});
  const [input, setInput] = useState("");
  const [unit, setUnit] =useState<'metric' | 'imperial'>('metric')
  const [data, setData] = useState<undefined | weatherData>()

  const setPosition = async (input: GeolocationPosition) => {
    setLocation({lat: input.coords.latitude, lon: input.coords.longitude})
    console.log(input.coords.latitude);
    const data = await get<weatherData>(`https://api.openweathermap.org/data/2.5/weather?lat=${input.coords.latitude}&lon=${input.coords.longitude}&units=${unit}&appid=${import.meta.env.VITE_API_KEY}`)

    setData(data);
  }

  const defaultData = async () => {
    const data = await get<weatherData>(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&units=${unit}&appid=${import.meta.env.VITE_API_KEY}`)
      setData(data);
  }

  // Initial data population
  useMemo(async() => {
    geolocation.getCurrentPosition(setPosition, defaultData);
  }, [])

  //Update data when location or units change
  useEffect(() => {
    const fetchData = async () => {
      const data = await get<weatherData>(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=${unit}&appid=${import.meta.env.VITE_API_KEY}`);

      setData(data);
    }

    fetchData().catch(console.error);
  }, [location, unit])

  

  return (
    <>
      <header>
        <button type="button" aria-label="Open Menu"><img src={menuBtn} alt="Menu" width="24" height="24" /></button>
        <span>Dark/Light</span>
        <nav>
        <button type="button" aria-label="Close Menu"><img src={closeBtn} alt="Close" width="24" height="24" /></button>
        <div>
          <input type="search" name="search" id="search" placeholder="Search for a city"/>
          <button type="button" aria-label="Use current location"><img src={locationBtn} alt="Location" width="24" height="24" /></button>
        </div>
        <div>
          {/*Location lists will go here*/}
        </div>
        <div>
          <div><button type="button" onClick={() => {
            setUnit('metric')
          }}>°C</button><button type="button" onClick={() => {
            setUnit('imperial')
          }}>°F</button></div>
          <span>Light / Dark</span>
        </div>
        </nav>
      </header>
      <main>
      {data && <Current data={data} unit={unit} />}
      </main>
    </>
  )
}

export default App
