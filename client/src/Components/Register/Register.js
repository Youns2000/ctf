import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./Register.css";
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../logo.ico';
import axios from 'axios';
import { ReactComponent as Loading } from '../../loading.svg';


export default function Log() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [contentAlert, setContentAlert] = useState("");
    const [styleAlert, setStyleAlert] = useState("");



    function validateForm() {
        return email.length > 0 && password.length > 0 && username.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        var user = {
            name: username,
            email: email,
            password: password
        }
        axios.post('/api/register', user)
            .then((res) => {
                // console.log(res.data)
                if (res.data === "Username Already Exist!") setStyleAlert("warning");
                else if (res.data === "User was registered successfully! Please check your email") setStyleAlert("success");
                else setStyleAlert("danger");

                setContentAlert(res.data)
                // console.log(res.data);
                setShow(true);
            })
            .catch((err) => {
                console.error(`Error`);
            })
        setLoading(false);
    }

    return (
        <div>
            {
                loading ?
                    <div id="loader">
                        <Loading />
                    </div>
                    :
                    <div>
                        <div style={{ zIndex: "999" }}>
                            <Alert className="alert" variant={styleAlert} show={show} onClose={() => setShow(false)} dismissible>
                                {contentAlert}
                            </Alert>
                        </div>
                        <div className="Login">
                            < Form onSubmit={handleSubmit} >
                                <Form.Group size="lg" controlId="email">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        // type="email"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group size="lg" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group size="lg" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Button block size="lg" type="submit" disabled={!validateForm()}>
                                    Register
                                </Button>

                            </Form >

                        </div >
                    </div>
            }
        </div>
    );
}