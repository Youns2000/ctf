import React, { useEffect, useState, useLayoutEffect } from 'react'
import { Button, Card } from 'react-bootstrap';
import axios from 'axios'
import { getUser } from '../services/api'
import { useHistory } from 'react-router-dom'
import { ReactComponent as Loading } from '../loading.svg';
import './Profil.css'

export default function Profil() {
    const [user, setUser] = useState({ name: "", email: "", password: "", admin: false, activated: true });
    const [displayUser, setDisplayUser] = useState(false)

    const history = useHistory();

    function logout() {
        localStorage.removeItem('token');
        history.push("/");
        window.location.reload();
    }

    async function showUser() {
        const user = await getUser()
        console.log(user)
        return user;
    }

    useEffect(() => {
        console.log("mounted profil")

        async function setU() {
            const newuser = await getUser()
            user.name = newuser.name;
            user.email = newuser.email;
            user.password = newuser.password;
            user.admin = newuser.admin;
            user.activated = newuser.activated;
            setDisplayUser(true)
            console.log(user)
        }

        setU()

        return () => {
            console.log('will unmount');
        }
    }, [user]);

    return (
        <div>
            <h1>Profil</h1>
            <div id="loader" style={{ display: displayUser ? 'none' : 'block' }}>
                <Loading />
            </div>
            <div id="content" style={{ display: displayUser ? 'block' : 'none' }}>
                <h2>{user.name}</h2>
                <h2>{user.email}</h2>
                <h2>{user.admin}</h2>
            </div>
            <Button className="btn" type="submit" onClick={logout}>Deconnexion</Button>
            <Button className="btn" type="submit" onClick={showUser}>getUser</Button>
        </div>
    )

}