import React from 'react'
import { useParams } from 'react-router-dom'

import Weather from '../Weather/Weather'
import Notes from '../Notes/Notes'
import './Dashboard.css'

export default function Dashboard() {
  const userId = useParams().uid
  console.log("UID: ", userId)
  return (
    <div className="Dashboard">
      <Weather />
      <Notes />
    </div>
  )
}