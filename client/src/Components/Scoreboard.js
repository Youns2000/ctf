import React, { Component } from 'react'

export default class Scoreboard extends Component {
    constructor() {
        super();
        this.state = {
            clients: new Array(),
            clientName: ""
        }
    }

    render() {
        return (
            <div>
                <h1>Scoreboard</h1>
            </div>
        )
    }
}
