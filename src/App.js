import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import './App.css';

import Dashboard from './Dashboard/Dashboard'
import Header from './Header/Header'
import HomePage from './HomePage/HomePage'
import Auth from './Authentication/Auth'
import { AuthContext } from './Authentication/auth-context'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState()

  const login = useCallback((uid) => {
    setIsLoggedIn(true)
    setUserId(uid)
  })
  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setUserId(null)
  })

  let routes
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/:uid/dashboard" exact>
          <Dashboard />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    )
  } 
  
  return (
    <AuthContext.Provider  value={{isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout}}>
      <div className="App">
        <Router>
          <Header />
          <main>
            {routes}
          </main>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
