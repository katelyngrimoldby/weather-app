import { useState, useEffect, useMemo, useRef } from "react"
import axios from "axios"
import {weatherData, geoData} from '../types'
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
  const [locationList, setLocationList] = useState([]);
  const [input, setInput] = useState("");
  const [unit, setUnit] =useState<'metric' | 'imperial'>('metric')
  const [currentdata, setCurrentData] = useState<undefined | weatherData>()
  const [geoData, setGeoData] = useState<geoData[]>([])

  const isInitialMount = useRef(true);

  //Update data when location or units change
  // useEffect(() => {
  //   const setPosition = async (input: GeolocationPosition) => {
  //     setLocation({lat: input.coords.latitude, lon: input.coords.longitude})

  //     // const data = await get<weatherData>(`https://api.openweathermap.org/data/2.5/weather?lat=${input.coords.latitude}&lon=${input.coords.longitude}&units=${unit}&appid=${import.meta.env.VITE_API_KEY}`);

  //     // setCurrentData(data);
  //   }

  //   const defaultData = async () => {
  //     const data = await get<weatherData>(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&units=${unit}&appid=${import.meta.env.VITE_API_KEY}`)
  //       setCurrentData(data);
  //   }
  //   const fetchData = async () => {
  //     const data = await get<weatherData>(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=${unit}&appid=${import.meta.env.VITE_API_KEY}`);

  //     setCurrentData(data);
  //   }

  //   if(isInitialMount.current) {
  //     geolocation.getCurrentPosition(setPosition, defaultData)
  //     isInitialMount.current = false;
  //   } else {
  //     fetchData().catch(console.error);
  //   }

    
  // }, [location, unit])

  // handle API call for search function
  useEffect(() => {
    const fetchData = async () => {
      const data = await get<geoData[]>(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${import.meta.env.VITE_API_KEY}`)
      setGeoData(data);
    }
    if(input.length > 0) {
      fetchData().catch(console.error);
    } else {
      setGeoData([]);
    }
  }, [input])
 
  return (
    <>
      <header>
        <button type="button" aria-label="Open Menu"><img src={menuBtn} alt="Menu" width="24" height="24" /></button>
        <span>Dark/Light</span>
        <nav>
        <button type="button" aria-label="Close Menu"><img src={closeBtn} alt="Close" width="24" height="24" /></button>
        <div>
          <input type="search" name="search" id="search" placeholder="Search for a city" value={input} onChange={(event) => {
            setInput(event.target.value)
          }} />
          <button type="button" aria-label="Use current location"><img src={locationBtn} alt="Location" width="24" height="24" /></button>
        </div>
        <div>
          {geoData.length > 0 && geoData.map((item, id) => {
            return <div key={id + Date.now()}>{item.name}</div>
          })}
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
      {currentdata && <Current data={currentdata} unit={unit} />}
      </main>
    </>
  )
}

export default App
