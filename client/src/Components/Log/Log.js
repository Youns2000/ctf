import React, { useState } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import "./Log.css";
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../logo.ico';
import { useHistory } from "react-router-dom";
import { login } from "../../services/api.js"
import { ReactComponent as Loading } from '../../loading.svg';

export default function Log() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [contentAlert, setContentAlert] = useState("");

    const history = useHistory();


    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        try {
            const token = await login(email, password)
            setLoading(false)
            if (token === "Wrong email or password" || token === "Your account is not activated") {
                setShow(true)
                setContentAlert(token)
            }
            else {
                localStorage.setItem('token', JSON.stringify(token.token));
                history.push("/");
            }
        } catch (error) {
            console.error(error);
            alert("Error logging in please try again");
        }

    };

    const photo = {
        height: "300px",
        width: "360px"
    };



    return (
        <div>
            {loading ?
                <div id="loader">
                    <Loading />
                </div>
                :
                <div>
                    <div style={{ zIndex: "999" }}>
                        <Alert className="alert" variant="danger" show={show} onClose={() => setShow(false)} dismissible>
                            {contentAlert}
                        </Alert>
                    </div>
                    <div className="Login">
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
                            {/* <a href="/Register" >Register</a> */}
                        </Form>

                    </div>
                </div>
            }

        </div>
    );
}