import React from 'react'

import './WeatherForecastItem.css'

function getImgSrc(weatherCode, timeOfDay) {
  if (weatherCode.includes('clear') || weatherCode.includes('partly')) {
    return `/weatherIcons/${weatherCode}_${timeOfDay}.svg`
  }
  return `/weatherIcons/${weatherCode}.svg`
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

export default function WeatherForecastItem({ weatherForecastItem, dayOfWeek }) {
  const timeOfDay = getTimeOfDay(new Date(weatherForecastItem?.sunrise?.value), new Date(weatherForecastItem?.sunset?.value))
  const imgSrc = weatherForecastItem ? getImgSrc(weatherForecastItem.weather_code.value, timeOfDay) : ''

  return (
    <div className="item">
      <div className='day-of-week'>
        {dayOfWeek}
      </div>
      <img
        className='forecast-item-icon'
        src={imgSrc}
        alt={weatherForecastItem.weather_code.value}
      />
      <div className='forecast-temps'>
        <div className='forecast-max'>
          {Math.round(weatherForecastItem.temp[1].max.value)}
        </div>
        <div className='forecast-min'>
          {Math.round(weatherForecastItem.temp[0].min.value)}  
        </div>
      </div>
    </div>
  )
}