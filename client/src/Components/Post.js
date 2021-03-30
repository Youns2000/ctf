import React, { Component } from 'react'
import './Post.css'

export default class Post extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Post">
                <div>
                    <a href={"Profil/" + this.props.name}>
                        <img className=""
                            src={this.props.logoUrl}
                            alt={this.props.name}
                        />
                    </a>
                    <h5>{this.props.name}</h5>
                </div>
            </div >
        )
    }
}
