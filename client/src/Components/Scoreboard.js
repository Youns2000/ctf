import React, { useEffect, useState } from 'react'
import { Form, Alert, Button, Table } from "react-bootstrap";
import { getScoreboard } from '../services/api'
import { ReactComponent as Loading } from '../loading.svg';

export default function Scoreboard() {
    const [users, setUsers] = useState([{ name: "", score: 0 }]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function setU() {
            setLoading(true);
            const mapUsers = await getScoreboard();

            if (mapUsers) {
                Object.keys(mapUsers).forEach(key => {
                    users.push(mapUsers[key])
                });
            }
            users.shift()
            console.log(users)
            users.sort(function (a, b) {
                return b.score - a.score;
            });
            setLoading(false);
        }
        setU()
        return () => {
        }
    }, [users]);

    function showArray() {
        return users.map((user, index) => (
            <tr>
                <td>{(index + 1).toString()}</td>
                <td>{user.username}</td>
                <td>{user.score}</td>
            </tr>
        ));
    }

    return (
        <div>
            <h1 style={{ color: "white", paddingBottom: "20px" }}>Scoreboard</h1>
            {loading ?
                <div id="loader">
                    <Loading />
                </div>
                :
                <>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Place</th>
                                <th>Username</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showArray()}
                        </tbody>
                    </Table>
                </>
            }
        </div >
    )
}
