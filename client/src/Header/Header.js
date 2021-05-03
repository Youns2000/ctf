import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.css';
import logo from '../logo.png'
import 'bootstrap/dist/css/bootstrap.css';
import { House, ListOl, Puzzle, Gear } from 'react-bootstrap-icons';
import { IoHomeOutline, IoListOutline, IoLayersOutline, IoOptionsOutline } from "react-icons/io5";

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = { color_inactive: "#777a82", color_active: "#007bff", active: 0 };
    }

    changeColor = color => () => {
        this.setState({ active: color })
        console.log(color);
    };


    render() {
        var color_active = { color: this.state.color_active };
        var color_inactive = { color: this.state.color_inactive };
        return (
            <div className="App" >
                <div className="Header">
                    <Link to={process.env.PUBLIC_URL + '/'}>
                        <img src={logo} className="App-logo" alt="logo" />
                    </Link>
                    <div className="Header-Right">
                        <Link style={this.state.active === 0 ? color_active : color_inactive} onClick={this.changeColor(0)} to={process.env.PUBLIC_URL + '/'}>
                            <House size={32} />
                        </Link>
                        <Link style={this.state.active === 1 ? color_active : color_inactive} onClick={this.changeColor(1)} to={process.env.PUBLIC_URL + '/Scoreboard'}>
                            <ListOl size={32} />
                            {/* Scoreboard */}
                        </Link>
                        <Link style={this.state.active === 2 ? color_active : color_inactive} onClick={this.changeColor(2)} to={process.env.PUBLIC_URL + '/Challenges'}>
                            <Puzzle size={32} />
                        </Link>
                        <Link style={this.state.active === 3 ? color_active : color_inactive} onClick={this.changeColor(3)} to={process.env.PUBLIC_URL + '/Profil'}>
                            <Gear size={32} />
                        </Link>
                        {/* <Link style={style} to={process.env.PUBLIC_URL + '/Log'}>
                            <IoOptionsOutline className="Icon" onClick={() => this.changeColor("#19b126")} size={27} />
                        </Link>
                        <Link style={style} to={process.env.PUBLIC_URL + '/Sign'}>
                            <IoOptionsOutline className="Icon" onClick={() => this.changeColor("#19b126")} size={27} />
                        </Link> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;