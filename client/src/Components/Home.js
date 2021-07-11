import React, { useState, useEffect, Component } from 'react'
import { Button, Card } from 'react-bootstrap';
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect, Link, BrowserRouter } from 'react-router-dom'
import Header from '../Header/Header.js'
import Comptes from './Comptes'
import News from './News';
import Scoreboard from './Scoreboard';
import Challenges from './Challenges';
import Profil from './Profil';
import Admin from './Admin';
import Log from './Log/Log'
import PrivateRoute from '../PrivateRoute'
import { adminCheck } from "../services/api.js"

export default function Home() {
    const [isadmin, setIsadmin] = useState(false);

    useEffect(() => {

        async function setU() {
            const ad = await adminCheck();
            setIsadmin(ad);
        }
        setU()
        return () => {
        }
    }, [isadmin]);

    return (
        <div>
            <Router>
                <Header />
                <Route exact path="/" component={Challenges} />
                {isadmin ? <Route exact path="/Admin" component={Admin} /> : null}
                {/* <Route exact path="/News" component={News} /> */}
                <Route path="/Challenges" component={Challenges} />
                <Route path="/Scoreboard" component={Scoreboard} />
                <Route path="/Profil" component={Profil} />
            </Router>
        </div>
    )
}
