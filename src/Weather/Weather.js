import React from 'react'

import CurrentWeather from './CurrentWeather'
import WeatherForecast from './WeatherForecast'
import './Weather.css'

export default function Weather() { 
  return (
    <div className="Weather">
      <CurrentWeather />
      <WeatherForecast />
    </div>
  )
}