
import { useEffect, useState } from 'react';
import './App.css';

const api = {
  key: "1ac8b2e127cff2fe38d2ebc34a24525d",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [city, setCity] = useState({})
  const [input, setInput] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    getCurrentCity()
  },[])

  useEffect(() => {
    getWeather(query)
  }, [query])

  const getCurrentCity = async () => {
    const response = await fetch(`https://ipinfo.io?token=80b750c90b559e`)
    const data = await response.json()
    console.log(data.city)
    getWeather(data.city)
  }

  const getWeather = async (currentCity) => {
    const response = await fetch(`${api.base}weather?q=${currentCity}&units=metric&APPID=${api.key}`)
    const data = await response.json()
    console.log(data)
    setCity(data)
  }

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setQuery(input)
    setInput('')
  }
  
  // Date
  const d = new Date()
  const date = d.getDate()
  const year = d.getFullYear()
  const month = d.toLocaleString("default", {month: 'long'})
  const day = d.toLocaleString("default", {weekday: 'long'})

  // Time
  let time = d.toLocaleString([],{
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  // let regionNames = new Intl.DisplayNames(['en'], {type: 'region'})

  return (
    <div className='app'>
      <main>
          <div className='input-box'>
            <input 
              type="text"
              className='input-search-bar'
              placeholder='Enter the city name'
              name="search"
              value={input}
              onChange={handleInput}
              required
            />
            <button className='search-btn' onClick={handleSubmit}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          {(typeof city != "undefined") ? (
            <div className='weather-info'>
              <div className='location-box'>
                <div className='location'>{city.name}, {(city?.sys?.country)}</div>
                <div className='date'>
                  {day}, {month} {date}, {year}
                </div>
              </div>
              <div className='weather-box'>
                <div className='temp'>{city?.main?.temp} &deg;C</div>  {/*Optional Chaining*/}
                <div>
                  <img className="img" src={`http://openweathermap.org/img/wn/${city.weather?.[0].icon}@2x.png`} alt=""/>
                  <div className="weather">{city.weather && city.weather[0].main}</div>   {/*Optional Chaining  -: city.weather?.[0].main*/}
                </div>   
              </div>
              <div className='footer'>
                <div className='feels'>
                  {city?.main ? <p className='bold'>{city?.main?.feels_like.toFixed()}°C</p> : null}
                  <p>Feels Like</p>
                </div>
                <div className='humidity'>
                  {city?.main ? <p className='bold'>{city?.main?.humidity}%</p> : null}
                  <p>Humidity</p>
                </div>
                <div className='wind'>
                  {city?.wind ? <p className='bold'>{city?.wind?.speed} MPH</p> : null}
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          ) : (
            "No data found"
          )}
      </main>
    </div>
  );
}

export default App;

