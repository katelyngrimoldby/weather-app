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

interface geoData {
  name: string,
  local_names: {
    [key: string]: string,
  },
  lat: number,
  lon: number,
  country: string,
  state?: string,
}

interface locationData {
  name: string,
  state?: string,
  country: string,
  lat: number,
  lon: number,
}

interface forecastData {
  cod: string,
  message: number,
  cnt: number;
  list: forecastEntry[],
  city: {
    id: number,
    name: string,
    coord: {
      lat: number,
      lon: number,
    }
    country: string,
    timezone: number,
    sunrise: number,
    sunset: number,
  }
}

interface forecastEntry {
  dt: number,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    sea_level: number,
    grnd_level: number,
    humidity: number,
    temp_kf: number,
  },
  weather: {
    id: number,
    main: string,
    description: string,
    icon: string,
  }[],
  clouds: {
    all: number,
  },
  wind: {
    speed: number,
    deg: number,
    gust: number,
  },
  visibility: number,
  pop: number,
  rain: {
    '3h': number,
  },
  snow: {
    '3h': number,
  },
  sys: {
    pod: string,
  },
  dt_txt: string,
}

export type {weatherData, geoData, locationData, forecastData, forecastEntry};