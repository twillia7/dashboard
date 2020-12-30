import React from 'react'
import { NavLink } from 'react-router-dom'

import './NavLinks.css'

export default function NavLinks() {
  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/' exact>Home</NavLink>
      </li>
      <li>
        <NavLink to='/u1/dashboard' exact>Dashboard</NavLink>
      </li>
      <li>
        <NavLink to='/auth' exact>Authenticate</NavLink>
      </li>
    </ul>
  )
}