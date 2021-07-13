import Challenge from "./Challenge"
import "./Challenges.css"
import React, { useEffect, useState } from 'react'
import { Form, Alert, Button, Table } from "react-bootstrap";
import { getChallenges, getUser } from '../services/api'
import { ReactComponent as Loading } from '../loading.svg';
// import challenge from "../../../models/challenge";

export default function Challenges() {
    const [challenges, setChallenges] = useState([{ title: "", categorie: "", link: "" }]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(0);
    const [user, setUser] = useState();

    useEffect(() => {

        async function setU() {
            setLoading(true);
            setUser(await getUser())
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

    function showArray() {
        var output = [];
        var boot = [];
        var crypto = [];
        var cracking = [];

        if (user) {

            challenges.forEach(c => {

                const solved = c.solved.includes(user.email)
                switch (c.categorie) {
                    case "Boot2Root":
                        boot.push(<Challenge id={c.id} title={c.title} link={c.link} desc={c.desc} solved={solved}></Challenge>)
                        break;
                    case "Crypto":
                        crypto.push(<Challenge id={c.id} title={c.title} link={c.link} desc={c.desc} solved={solved}></Challenge>)
                        break;
                    case "Cracking":
                        cracking.push(<Challenge id={c.id} title={c.title} link={c.link} desc={c.desc} solved={solved}></Challenge>)
                        break;
                    default:
                        break;
                }
            });
            output = output.concat(<h3>Boot2Root:</h3>);
            output = output.concat(boot);
            output = output.concat(<h3>Crypto:</h3>);
            output = output.concat(crypto);
            output = output.concat(<h3>Craking:</h3>);
            output = output.concat(cracking);

            return output;
        }
    }

    return (
        <div className="Challenges">
            {loading ? <Loading /> : showArray()}
        </div>
    );
}