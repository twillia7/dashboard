import React from 'react'

import Weather from '../Weather/Weather'
import Notes from '../Notes/Notes'
import './Dashboard.css'

export default function Dashboard() {
  return (
    <div className="Dashboard">
      <Weather />
      <Notes />
    </div>
  )
}