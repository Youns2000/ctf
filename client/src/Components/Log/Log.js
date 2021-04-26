import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Log.css";
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../logo.ico';
import { useHistory } from "react-router-dom";
import { login } from "../../services/api.js"

export default function Log() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = await login(email, password)
            localStorage.setItem('token', token);
            history.push("/");
        } catch (error) {
            console.error(error);
            alert("Error logging in please try again");
        }

    };

    return (
        <div className="Login">
            <img
                src={logo}
                alt="logo"
                className="logo-img"
            />
            <Form onSubmit={handleSubmit}>
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
                    Login
                </Button>
                <a href="/Register" >Register</a>
            </Form>

        </div>
    );
}