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
  return (current < sunset && current > sunrise) ? 'day' : 'night'
}

function getImgSrc(weatherCode, timeOfDay) {
  if (weatherCode.includes('clear') || weatherCode.includes('partly')) {
    return `/weatherIcons/${weatherCode}_${timeOfDay}.svg`
  }
  return `/weatherIcons/${weatherCode}.svg`
}


/****
 * Current Weather - COMPONENT
 */
export default function CurrentWeather() {
  const [currentWeather, setCurrentWeather] = useState(null)

  useEffect(() => {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchCurrentWeather(setCurrentWeather, position.coords.latitude, position.coords.longitude)
      });
    } else {
      console.error("Geolocation Not Available")
    }
  }, [])

  const timeOfDay = currentWeather ? getTimeOfDay(new Date(currentWeather?.sunrise?.value), new Date(currentWeather?.sunset?.value)) : ''

  const currentTemp = currentWeather?.temp?.value

  const imgSrc = currentWeather ? getImgSrc(currentWeather.weather_code.value, timeOfDay) : ''

  return (
    <div className={`current-weather ${timeOfDay}-background`}>
      {currentTemp && (
        <>
          <img
            className='current-weather-icon'
            src={imgSrc}
            alt={currentWeather.weather_code.value}
          />
          <div className="current-temp">
            {Math.round(currentTemp)}&deg;
          </div>
        </>
      )}
    </div>
  )
}