import axios from "axios";

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

export const authCheck = () => {
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
                    return true;
                } else if (err) {
                    const error = new Error(res.error);
                    console.log("miaouw")
                    throw error;
                } else {
                    console.log("miaouw false")
                    return false;
                }
            });
    }
    else {
        return false;
    }
}

export const getSecret = () => { };
