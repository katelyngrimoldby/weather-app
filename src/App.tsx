import { useState, useEffect, useRef } from "react"
import axios from "axios"
import {weatherData, geoData, locationData} from '../types'
import MenuIcon from "./components/MenuIcon"
import CrossIcon from "./components/CrossIcon"
import LocationIcon from "./components/LocationIcon"
import Current from './components/Current'
import './styles/main.css'


async function get<T> (path: string): Promise<T> {
  const {data} = await axios.get(path);
  return data;
}

function App() {
  const geolocation = navigator.geolocation;
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState<undefined | {lat: number, lon: number}>();
  const [locationList, setLocationList] = useState<locationData[]>([]);
  const [input, setInput] = useState("");
  const [unit, setUnit] =useState<'metric' | 'imperial'>('metric')
  const [currentdata, setCurrentData] = useState<undefined | weatherData>()
  const [geoData, setGeoData] = useState<geoData[]>([])

  const isInitialMount = useRef(true);

  const setPosition = async (input: GeolocationPosition) => {
    setLocation({lat: input.coords.latitude, lon: input.coords.longitude}) 
  }

  //Update data when location or units change
  // useEffect(() => {
  //   const defaultData = async () => {
  //     setLocation({lat: 44.34, lon: 10.99})
  //   }
  //   const fetchData = async () => {
  //     if(location) {
  //       const data = await get<weatherData>(`https://api.openweathermap.org/data/2.5/weather?lat=${location?.lat}&lon=${location?.lon}&units=${unit}&appid=${import.meta.env.VITE_API_KEY}`);

  //     setCurrentData(data);
  //     }
      
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
        <button type="button" aria-label="Open Menu" onClick={() => {
          setOpen(true);
        }} className="iconBtn"><MenuIcon /></button>
        <span>Dark/Light</span>
        <nav className={open ? 'open' : undefined}>
          <button type="button" aria-label="Close Menu"onClick={() => {
            setOpen(false);
          }}className="iconBtn close"><CrossIcon /></button>
          <div className="navContent">
            <div className="searchBar">
              <input type="text" name="search" id="search" placeholder="Search for a city" value={input} onChange={(event) => {
                setInput(event.target.value);
              }} />
              <button type="button" aria-label="Use current location" onClick={() => {
                geolocation.getCurrentPosition(setPosition);
                setOpen(false);
              }} className="iconBtn"><LocationIcon /></button>
            </div>
            <div className="list">
              {geoData.length > 0 ? geoData.map((item, id) => {
                return(
                    <button type="button" key={id + Date.now()} className="searchItem" onClick={() => {
                      item.state ?
                      setLocationList([...locationList, {name: item.name, country: item.country,state: item.state, lat: item.lat, lon: item.lon}]) :
                      setLocationList([...locationList, {name: item.name, country: item.country, lat: item.lat, lon: item.lon}])
                      setLocation({lat: item.lat, lon: item.lon});
                      setOpen(false);
                      setInput('');
                    }}>{item.name}{item.state && `, ${item.state}`}, {item.country}</button>
                  )
              }) : locationList.map((item, id) => {
                return(
                  <div key={id + Date.now()} className="listItem">
                    <button type="button" onClick={() => {
                      setLocation({lat: item.lat, lon: item.lon});
                      setOpen(false);
                    }}>{item.name}{item.state && `, ${item.state}`}, {item.country}</button>
                    <button type="button" aria-label="Delete Location"onClick={() => {
                      const copy = [...locationList].filter(e => {
                        return (e.lat != item.lat && e.lon != item.lon)
                      });
                      setLocationList(copy);
                    }} className="iconBtn"><CrossIcon /></button>
                  </div>)
              })}
            </div>
            <div className="unitBtns">
              <button type="button" onClick={() => {
                setUnit('metric')
              }} className={unit == 'metric' ? 'active' : undefined}>°C</button>
              <button type="button" onClick={() => {
                setUnit('imperial')
              }} className={unit == 'imperial' ? 'active' : undefined}>°F</button>
            </div>
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
