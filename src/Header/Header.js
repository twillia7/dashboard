import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import NavLinks from './NavLinks'
import './Header.css'

export default function Header() {
  return (
    <header className='header'>
      <span />
      <nav className='main-navigation__header-nav'>
        <NavLinks />
      </nav>
    </header>
  )
}