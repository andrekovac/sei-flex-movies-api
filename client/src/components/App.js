import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './Home.js'

import '../styles/style.scss'
import AllMovies from './AllMovies.js'
import Search from './Search.js'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/all" component={AllMovies} />
      <Route path="/search" component={Search} />
    </Switch>
  </BrowserRouter>
)

export default App
