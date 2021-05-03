import './App.css';
import React, { useState, useEffect, Component } from 'react'
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect, Link, history } from 'react-router-dom'
import Home from './Components/Home';
import Login from './Components/Log/Log'
import Register from './Components/Register/Register'
import PrivateRoute from './PrivateRoute'
import Header from './Header/Header.js'

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
