import React, { useEffect, useState } from 'react'
import { Table, Tab, ListGroup, Row, Col } from "react-bootstrap";
import "./Admin.css";
import { getChallenges } from '../services/api'
import { ReactComponent as Loading } from '../loading.svg';

export default function Admin() {
    const [challenges, setChallenges] = useState([{ title: "", categorie: "", link: "", flags: {} }]);
    const [key, setKey] = useState('challenges');
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function setU() {
            setLoading(true);
            const mapChallenges = await getChallenges();

            if (mapChallenges) {
                Object.keys(mapChallenges).forEach(key => {
                    challenges.push(mapChallenges[key])
                });
            }
            challenges.shift()
            setLoading(false);
        }
        setU()
        return () => {
        }
    }, [challenges]);

    function ShowChallenges() {
        var output = [];
        challenges.forEach(c => {
            output.push(<tr>
                <td>{c.title}</td>
                <td>{c.categorie}</td>
                <td>{c.flags[0]}</td>
                <td>{c.link}</td>
            </tr>)

        });
        return (output);
    }



    return (
        <div>
            {loading ? <Loading /> : <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Categorie</th>
                        <th>Flag</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {ShowChallenges()}
                </tbody>
            </Table>}
        </div>

    );

}