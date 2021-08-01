import React, { useState } from 'react';
import './App.css';

// api configuration
const api = {
  key: "8a0eebd96768bd93f57b849ef9f0fa13",
  base: "https://api.openweathermap.org/data/2.5/"
}

// Date function
const today = () => {

  // date and month lists
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  // Generates date
  const date = new Date()

  // Extracts info from date function
  const dayNo = date.getDay()
  const monthNo = date.getMonth()
  const yearNo = date.getFullYear()
  const dateNo = date.getDate()

  //Generates date
  const day = days[dayNo] + " " + dateNo  + " " + months[monthNo] + " " + yearNo

  return day;
}

function App() {

  // Variables for  queries
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  //Function to query API
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  return (
    //If weather is colder than 17, change display
    <div className={
    (typeof weather.main != "undefined")
    ? ((weather.main.temp < 17)
     ? 'App cold'
     : 'App')
    : 'App'}>
      <main>

        {/* Querying API with search bar */}
        <div className="search-bar">
          <input 
          type="text"
          className="input-bar" 
          placeholder="Please search...." 
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}>
          </input>
        </div>
        {/* If type of weather is not undefined, output results */}
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location">
            {weather.name}, {weather.sys.country}
          </div>

          <div className="temperature">
            {Math.round(weather.main.temp)}°c
          </div>

          <div className="weather">
            {weather.weather[0].main}
          </div>

          <div className="date">
            {today()}
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
