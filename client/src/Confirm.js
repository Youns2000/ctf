import axios from 'axios';
import React, { useState, useEffect } from "react";


export default function Confirm(props) {
    const [valid, setValid] = useState(false)

    useEffect(() => {

        // const token = JSON.parse(localStorage.getItem("token"))

        async function setU() {
            await axios.post(`/confirm`, {
                token: props.match.params.token
            })
                .then((res) => {
                    setValid(res.data)
                })
                .catch(err => {
                    if (err.status === 401) {
                        console.log("unauthorized")
                        return;
                    }
                })
        }
        setU();



        return () => {
        }
    }, [])

    if (valid === true) {
        return (
            <h1>Email activated</h1>
        )
    }
    else {
        return (
            <h1>Invalid Link</h1>
        )
    }

}