import React, { useEffect, useState } from 'react'

import './WeatherForecastItem.css'

export default function WeatherForecastItem({ weatherForecastItem, dayOfWeek }) {
  return (
    <div className="item">
      <div className='day-of-week'>
        {dayOfWeek}
      </div>
      <div>
        {weatherForecastItem.weather_code.value}
      </div>
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