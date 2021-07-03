import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Register.css";
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../logo.ico';
import axios from 'axios';

export default function Log() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0 && username.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        var user = {
            name: username,
            email: email,
            password: password
        }
        console.log(user)
        axios.post('/api/register', user)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.error(`Error`);
            })
    }

    const photo = {
        height: "300px",
        width: "360px"
    };

    return (
        <div className="Login">
            {/* <img
                src={logo}
                style={photo}
                alt="logo"
                className="logo-img"
            /> */}
            <Form onSubmit={handleSubmit}>
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

            </Form>

        </div>
    );
}