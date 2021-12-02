import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ROUTE_HOME } from '@constants/routes'
import Home from '@pages/Home'
import './i18n'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path={ROUTE_HOME}>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}
