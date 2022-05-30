import React, { useState } from "react";
import "./Sign.css";
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../logo.ico';
import Login from './Log/Log'
import Register from './Register/Register'

export default function Sign() {
    const [input, setInput] = useState(true);

    const photo = {
        height: "300px",
        width: "360px"
    };


    return (
        // <>
        <div className="all">
            <div className="left">
                <img
                    src={logo}
                    style={photo}
                    alt="logo"
                    className="logo-img"
                />
            </div>
            <div className="right">

                {/* <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                    <Tab eventKey="login" title="Sign In"> */}
                {input ? <Login /> : <Register />}
                <p style={{ cursor: "pointer" }} onClick={() => setInput(!input)} >  {input ? "You don't have an account ? register" : "You already have an account? login"}</p>
                {/* </Tab>
                    <Tab eventKey="register" title="Sign Up">
                        <Register />
                    </Tab>
                </Tabs> */}
            </div>

        </div>
        // </>
    );
}