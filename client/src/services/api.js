import axios from "axios";
import { useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

const server = process.env.REACT_APP_API_SERVER;

// export default class Services extends React.Component {

export function login(email, password) {
    return axios.post(`/api/login`,
        {
            email,
            password,
        },
        {
            "Content-Type": "application/json",
        },
    ).then((res) => {
        if (res.status === 200) {
            return res.data;
        } else {
            const error = new Error(res.error);
            throw error;
        }
    });
};

export function authCheck() {
    const token = JSON.parse(localStorage.getItem("token"))
    if (token !== null && token !== "") {
        return axios.get(`/api/auth`, {
            headers: {
                Authorization: `Bearer ` + token
            }
        })
            .then((res, err) => {
                if (res.status === 200) {
                    return true;
                }
                else {
                    return false;
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    console.log("unauthorized")
                    return false;
                }
            })
    }
    else {
        return false;
    }
}

export function logout() {
    // let history = useHistory();
    localStorage.removeItem('token');
    // props.history.push("/");
    // history.push('/')
}


export async function getUser() {
    const token = JSON.parse(localStorage.getItem("token"))

    return await axios.get(`/api/auth`, {
        headers: {
            Authorization: `Bearer ` + token
        }
    })
        .then((res) => {
            return res.data;
        })
        .catch(err => {
            if (err.status === 401) {
                console.log("unauthorized")
                return;
            }
        })
}

export async function changeUsername(newUsername, email) {
    const token = JSON.parse(localStorage.getItem("token"))
    // console.log("hello")
    return await axios.post(`/api/changeUsername`, {
        newUsername,
        email,
    },
        {

            headers: {
                Authorization: `Bearer ` + token
            }
        })
        .then((res) => {
            return res.data;
        })
        .catch(err => {
            console.log("error du debut")
            if (err.status === 401) {
                console.log("unauthorized")
                return;
            }
        })
}
