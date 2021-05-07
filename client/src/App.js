import './App.css';
import React, { useState, useEffect, Component } from 'react'
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect, Link, history } from 'react-router-dom'
import Home from './Components/Home';
import Login from './Components/Log/Log'
import Register from './Components/Register/Register'
import PrivateRoute from './PrivateRoute'
import Header from './Header/Header.js'
import Comptes from './Components/Comptes'
import News from './Components/News';
import Scoreboard from './Components/Scoreboard';
import Challenges from './Components/Challenges';
import Profil from './Components/Profil';
import Log from './Components/Log/Log'

export default function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Register" component={Register} />
        </Switch>
      </Router>
    </div>
  );

}
