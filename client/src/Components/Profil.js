import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap';
import axios from 'axios'
import { logout } from '../services/api'

// import 'bootstrap/dist/css/bootstrap.min.css';

export default class Profil extends Component {
    constructor() {
        super();
        this.state = {
            users: new Array(),
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
                users: response.data.tmp
            })
            // console.log(response.data.tmp)
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
                <h1>Profil</h1>
                <h2>{this.state.clients}</h2>
                <Button className="btn" type="submit" onClick={logout()}>Deconnexion</Button>

            </div>
        )
    }
}