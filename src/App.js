import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import './App.css';

import Dashboard from './Dashboard/Dashboard'
import Header from './Header/Header'
import HomePage from './HomePage/HomePage'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main>
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/:uid/dashboard" exact>
              <Dashboard />
            </Route>
            <Route path="/notes/new" exact>
              <h2>New Note</h2>
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
