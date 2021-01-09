import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '../Authentication/auth-context'
import './NavLinks.css'

export default function NavLinks() {
  const auth = useContext(AuthContext)

  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/' exact>Home</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to='/u1/dashboard' exact>Dashboard</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to='/auth' exact>Authenticate</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  )
}