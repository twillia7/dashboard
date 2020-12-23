import React, { useEffect, useState } from 'react'


import './WeatherForecast.css'
import WeatherForecastItem from './WeatherForecastItem'

function fetchWeatherForecat(setWeatherForecast, lat, lon) {
  fetch(`http://localhost:5000/weather/forecast/${lat}/${lon}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    setWeatherForecast(data)
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function getDates(startDate, daysToAdd) {
  var aryDates = [];

  for (var i = 1; i <= daysToAdd; i++) {
      var currentDate = new Date()
      currentDate.setDate(startDate.getDate() + i)
      aryDates.push(dayAsString(currentDate.getDay()))
  }

  return aryDates;
}

function dayAsString(dayIndex) {
  var weekdays = new Array(7)
  weekdays[0] = "Sunday"
  weekdays[1] = "Monday"
  weekdays[2] = "Tuesday"
  weekdays[3] = "Wednesday"
  weekdays[4] = "Thursday"
  weekdays[5] = "Friday"
  weekdays[6] = "Saturday"

  return weekdays[dayIndex]
}


export default function WeatherForecast() {
  const [weatherForecast, setWeatherForecast] = useState(null)

  useEffect(() => {
    console.log("WF: ", weatherForecast)
  }, [weatherForecast])

  useEffect(() => {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        fetchWeatherForecat(setWeatherForecast, position.coords.latitude, position.coords.longitude)
      });
    } else {
      console.error("Geolocation Not Available")
    }
  }, [])

  var startDate = new Date();
  var dates = getDates(startDate, 7);

  return (
    <>
      {weatherForecast && (
        <div className="forecast-container">
          {weatherForecast.slice(1, 8).map((item, index) => {
            return <WeatherForecastItem weatherForecastItem={item} dayOfWeek={dates[index]} />
          })}
        </div>
      )}
    </>
  )
}