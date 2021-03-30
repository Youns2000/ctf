import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.css';
import logo from '../logo.png'
import { IoHomeOutline, IoListOutline, IoLayersOutline, IoOptionsOutline } from "react-icons/io5";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { color: "#282c34" };
    }

    changeColor = color => {
        this.setState({ color });
        console.log(this.state.color)
    };

    render() {
        var style = { color: this.state.color };
        // console.log("color:" + this.state.color);
        return (
            <div className="App" >
                <div className="Header">
                    <Link to={process.env.PUBLIC_URL + '/'}>
                        <img src={logo} className="App-logo" alt="logo" />
                    </Link>
                    <div className="Header-Right">
                        <Link to={process.env.PUBLIC_URL + '/'}>
                            <IoHomeOutline onClick={() => this.changeColor("#19b126")} className="Icon" size={27} />
                        </Link>
                        <Link style={style} to={process.env.PUBLIC_URL + '/Scoreboard'}>
                            <IoListOutline className="Icon" onClick={() => this.changeColor("#19b126")} size={27} />
                        </Link>
                        <Link style={style} to={process.env.PUBLIC_URL + '/Challenges'}>
                            <IoLayersOutline className="Icon" onClick={() => this.changeColor("#19b126")} size={27} />
                        </Link>
                        <Link style={style} to={process.env.PUBLIC_URL + '/Profil'}>
                            <IoOptionsOutline className="Icon" onClick={() => this.changeColor("#19b126")} size={27} />
                        </Link>
                        <Link style={style} to={process.env.PUBLIC_URL + '/Log'}>
                            <IoOptionsOutline className="Icon" onClick={() => this.changeColor("#19b126")} size={27} />
                        </Link>
                        <Link style={style} to={process.env.PUBLIC_URL + '/Sign'}>
                            <IoOptionsOutline className="Icon" onClick={() => this.changeColor("#19b126")} size={27} />
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;