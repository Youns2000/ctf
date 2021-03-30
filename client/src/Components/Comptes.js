import React, { Component } from 'react'
import axios from 'axios'

export default class Comptes extends Component {
    constructor(){
        super();
        this.state = {
            compte: "Vide"
        };
    }

    handleButtonClick = () => {
        axios.get("/comptes").then(response =>{
            this.setState({
                compte: response.data.test
            })
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.handleButtonClick} >Actualiser</button>
                <h1>Comptes disponibles: {this.state.compte} </h1>
            </div>
        );
    }
}
