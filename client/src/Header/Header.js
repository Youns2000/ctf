import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Header.css';
import logo from '../logo.png'
import 'bootstrap/dist/css/bootstrap.css';
import { House, ListOl, Puzzle, Gear, BoxArrowRight, Person } from 'react-bootstrap-icons';
import { useHistory } from "react-router-dom";
import { adminCheck } from "../services/api.js"

export default function Header() {

    const color_inactive = "#777a82";
    const color_active = "#4A29C5";
    const [active, setActive] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const history = useHistory();



    useEffect(() => {

        async function setU() {
            const ad = await adminCheck();
            setIsAdmin(ad);
        }
        setU()
        return () => {
        }
    }, [isAdmin]);

    function logout() {
        localStorage.removeItem('token');
        // history.push("/");
        window.location.href = "https://ctf-algebra.azurewebsites.net/";
        window.location.reload();
    }


    // var color_active = { color: this.state.color_active };
    // var color_inactive = { color: this.state.color_inactive };
    const photo = {
        height: "90px",
        width: "150px"
    };
    return (
        <div className="Header">
            <Link to={process.env.PUBLIC_URL + '/'}>
                <img src={logo} style={photo} className="photo" alt="logo" />
            </Link>
            <div className="Header-Right">
                {isAdmin ?
                    <Link style={{ color: active === -1 ? color_active : color_inactive }} onClick={() => setActive(-1)} to={process.env.PUBLIC_URL + '/Admin'}>
                        <Person size={32} />
                    </Link> : null}
                {/* <Link style={{ color: active === 0 ? color_active : color_inactive }} onClick={() => setActive(0)} to={process.env.PUBLIC_URL + '/'}>
                    <House size={32} />
                </Link> */}
                <Link style={{ color: active === 1 ? color_active : color_inactive }} onClick={() => setActive(1)} to={process.env.PUBLIC_URL + '/Scoreboard'}>
                    <ListOl size={32} />
                    {/* Scoreboard */}
                </Link>
                <Link style={{ color: active === 0 ? color_active : color_inactive }} onClick={() => setActive(0)} to={process.env.PUBLIC_URL + '/'}>
                    <Puzzle size={32} />
                </Link>
                <Link style={{ color: active === 3 ? color_active : color_inactive }} onClick={() => setActive(3)} to={process.env.PUBLIC_URL + '/Profil'}>
                    <Gear size={32} />
                </Link>
                <Link to={process.env.PUBLIC_URL + '/Login'} onClick={logout}>
                    <BoxArrowRight size={32} />
                </Link>
                {/* <Link style={style} to={process.env.PUBLIC_URL + '/Log'}>
                            <IoOptionsOutline className="Icon" onClick={() => this.changeColor("#19b126")} size={27} />
                        </Link>
                        <Link style={style} to={process.env.PUBLIC_URL + '/Sign'}>
                            <IoOptionsOutline className="Icon" onClick={() => this.changeColor("#19b126")} size={27} />
                        </Link> */}
            </div>
        </div>
    )

}

// export default Header;