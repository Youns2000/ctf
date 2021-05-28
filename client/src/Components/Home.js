import React, { useState, useEffect, Component } from 'react'
import { Button, Card } from 'react-bootstrap';
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect, Link } from 'react-router-dom'
import Header from '../Header/Header.js'
import Comptes from './Comptes'
import News from './News';
import Scoreboard from './Scoreboard';
import Challenges from './Challenges';
import Profil from './Profil';
import Log from './Log/Log'
import PrivateRoute from '../PrivateRoute'

export default function Home() {


    return (
        <div>
            <Router>
                <Header />
                <Route exact path="/" component={News} />
                <Route exact path="/News" component={News} />
                <Route path="/Challenges" component={Challenges} />
                <Route path="/Scoreboard" component={Scoreboard} />
                <Route path="/Profil" component={Profil} />
            </Router>
        </div>
    )
}
