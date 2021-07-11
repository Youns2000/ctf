import React, { useEffect, useState, useLayoutEffect } from 'react'
import { Button, Card, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { getUser, changeUsername, changePwd } from '../services/api'
import { useHistory } from 'react-router-dom'
import { ReactComponent as Loading } from '../loading.svg';
import './Profil.css'

export default function Profil() {
    const [user, setUser] = useState({ name: "", email: "", admin: false, activated: true });
    const [displayUser, setDisplayUser] = useState(false)
    const [tmpUserName, setTmpUserName] = useState()
    const [tmpEmail, setTmpEmail] = useState()
    const [tmpCurrentPwd, setTmpCurrentPwd] = useState()
    const [tmpNewPwd, setTmpNewPwd] = useState()
    const [alert, setAlert] = useState("")
    const [showAlert, setShowAlert] = useState(false)

    const history = useHistory();


    const handleSubmit = async () => {
        if (tmpUserName) {
            const CU = await changeUsername(tmpUserName, user.email)
            setAlert(CU)
            setShowAlert(true)
        }
        if (tmpEmail) {
            // const CE = await changeE(tmpUserName, user.email)
        }
        if (tmpCurrentPwd && tmpNewPwd) {
            const CP = await changePwd(tmpCurrentPwd, tmpNewPwd, user.email)
            setAlert(CP)
            setShowAlert(true)
        }
    }

    useEffect(() => {
        // console.log("mounted profil")

        async function setU() {
            const newuser = await getUser()
            if (newuser) {
                user.name = newuser.name;
                user.email = newuser.email;
                // user.password = newuser.password;
                user.admin = newuser.admin;
                user.activated = newuser.activated;
                setDisplayUser(true)
            }
        }

        setU()

        return () => {
            // console.log('will unmount');
        }
    }, [user]);

    return (
        <div style={{ position: "relative", marginTop: "50px" }}>
            {/* <h1>Profil</h1> */}
            <div id="loader" style={{ display: displayUser ? 'none' : 'block' }}>
                <Loading />
            </div>
            <Alert className="alert" variant="success" show={showAlert} onClose={() => setShowAlert(false)} dismissible>
                {alert}
            </Alert>
            <div id="content" className="form" style={{ display: displayUser ? 'block' : 'none' }}>

                <Form>
                    <Form.Group controlId="formGroupUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={e => setTmpUserName(e.target.value)} defaultValue={user.name} />
                    </Form.Group>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={e => setTmpEmail(e.target.value)} defaultValue={user.email} />
                    </Form.Group>
                    <Form.Group controlId="formGroupCurrentPassword">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control type="password" placeholder="Current Password" onChange={e => setTmpCurrentPwd(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formGroupNewPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => setTmpNewPwd(e.target.value)} />
                    </Form.Group>
                </Form>
                <Button className="submitButton" variant="primary" type="submit" onClick={handleSubmit}> Submit </Button>
                {/* <Button className="btn" type="submit" onClick={logout}>Deconnexion</Button> */}
            </div>

        </div>
    )

}