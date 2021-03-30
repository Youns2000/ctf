import React, { Component } from 'react'
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
// import 'bootstrap/dist/css/bootstrap.min.css';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            clients: new Array(),
            // clientName: "YOUYOU"
        }
    }

    handleClick = () => {
        axios.post("/api/login").then(response => {
            console.log(response.data)
        })
    };

    componentDidMount() {
        axios.get("/api/user/register").then(response => {
            this.setState({
                clients: response.data.tmp
            })
            console.log(response.data.tmp)
        })
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleButtonClick = () => {
        const { clientName } = this.state;
        const client = {
            clientName
        }
        console.log(client)
        axios.post('/api/create', client)
            .then(() => console.log('Client Added'))
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return (
            <div>
                <p>Home</p>
            </div>
        )
    }
}
