import React, { useState, useEffect } from 'react'
import './CurrentWeather.css'


/**
 * fetchCurrentWeather - Fetches the current weather
 * @param {Function} setCurrentWeather 
 * @param {string} lat 
 * @param {string} lon 
 */
function fetchCurrentWeather(setCurrentWeather, lat, lon) {
  fetch(`http://localhost:5000/weather/current/${lat}/${lon}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    setCurrentWeather(data)
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


/**
 * getTimeOfDay - Returns the css depending on the time of day
 * @param {Date} sunrise 
 * @param {Date} sunset 
 */
function getTimeOfDay(sunrise, sunset) {
  const current = new Date()
  return (current < sunset && current > sunrise) ? 'day-background' : 'night-background'
}


/****
 * Current Weather - COMPONENT
 */
export default function CurrentWeather() {
  const [currentWeather, setCurrentWeather] = useState(null)

  useEffect(() => {
    console.log("currentWeather: ", currentWeather)
  }, [currentWeather])

  useEffect(() => {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        fetchCurrentWeather(setCurrentWeather, position.coords.latitude, position.coords.longitude)
      });
    } else {
      console.error("Geolocation Not Available")
    }
  }, [])

  const timeOfDayCss = currentWeather ? getTimeOfDay(new Date(currentWeather?.sunrise?.value), new Date(currentWeather?.sunset?.value)) : ''

  const currentTemp = currentWeather?.temp?.value
  return (
    <div className={`current-weather ${timeOfDayCss}`}>
      {currentTemp && (
        <div className="current-temp">
          {Math.round(currentTemp)}&deg;
        </div>
      )}
    </div>
  )
}