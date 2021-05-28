import axios from "axios";
import { useHistory } from 'react-router-dom'

const server = process.env.REACT_APP_API_SERVER;

export const login = (email, password) => {
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
    // console.log(JSON.parse(localStorage.getItem("token")))
    const token = JSON.parse(localStorage.getItem("token"))
    if (token !== null && token !== "") {
        return axios.get(`/api/auth`, {
            headers: {
                Authorization: `Bearer ` + token
            }
        })
            .then((res, err) => {
                if (res.status === 200) {
                    console.log("yeah men")
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
        console.log("lila mega false")
        return false;
    }
}

export const logout = () => {
    localStorage.removeItem('token');
}

export const getSecret = () => { };
