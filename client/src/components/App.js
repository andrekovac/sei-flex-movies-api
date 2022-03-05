import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Home from './Home.js'

import '../styles/style.scss'
import AllMovies from './AllMovies.js'
import Search from './Search.js'

const App = () => (
  <BrowserRouter>
    <nav>
      <Link style={{ padding: 5 }} to="/">
        Home
      </Link>
      <Link style={{ padding: 5 }} to="/all">
        All Movies
      </Link>
      <Link style={{ padding: 5 }} to="/search">
        Search
      </Link>
    </nav>
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/all" component={AllMovies} />
        <Route path="/search" component={Search} />
      </Switch>
    </main>
  </BrowserRouter>
)

export default App
