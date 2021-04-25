import axios from "axios";

const server = process.env.REACT_APP_API_SERVER;

export const login = (email, password) => {
    return axios.post(`/api/login`,
        JSON.stringify({
            email,
            password,
        }),
        {
            "Content-Type": "application/json",
        },
    ).then((res) => {
        if (res.status === 200) {
            return res.data.token;

        } else {
            const error = new Error(res.error);
            throw error;
        }
    });
};

export const getSecret = () => { };
