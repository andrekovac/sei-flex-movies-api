import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './Home.js'

import '../styles/style.scss'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
)

export default App
