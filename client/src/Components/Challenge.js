import './Challenge.css'
import React, { useState } from "react";
import { InputGroup, FormControl, Button, Alert } from "react-bootstrap";
import { flagCheck } from "../services/api.js"
import { Link } from 'react-router-dom';
import { ExternalLink } from 'react-external-link';
import { Check2 } from 'react-bootstrap-icons';
import { localsName } from 'ejs';



export default function Challenge(props) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();
    const [show, setShow] = useState(false);
    const [contentAlert, setContentAlert] = useState("");

    function modal(e) {
        e.preventDefault();
        // document.getElementById(props.id).className = (open ? "Challenge" : "ChallengeOpenned");
        if (e.target === e.currentTarget) {
            e.target.className = (open ? "Challenge" : "ChallengeOpenned")
            setOpen(!open)
        }
    }

    async function sendFlag(e) {
        e.preventDefault();
        // const t = "input" + e.target.id;
        const res = await flagCheck(e.target.id, input);
        if (res === true) {
            // console.log(res)
            window.location.reload();
        }
        else {
            // console.log("no")
            setShow(true)
            setContentAlert("Wrong Flag!")
        }
    }

    return (
        // <div>

        <div id={props.id} className="Challenge" onClick={modal}>
            <div style={{ zIndex: "999" }}>
                <Alert className="alert" variant="danger" show={show} onClose={() => setShow(false)} dismissible>
                    {contentAlert}
                </Alert>
            </div>
            <h3>{props.title}</h3>
            <div style={{ display: (!open && props.solved === true) ? '' : 'none' }}><Check2 size={35} /></div>
            <div style={{ display: open ? '' : 'none' }}>
                <div style={{ display: !props.solved ? '' : 'none' }}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Flag</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            id={"input" + props.id}
                            placeholder="Flag"
                            aria-label="Flag"
                            aria-describedby="basic-addon1"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                        />
                        <InputGroup.Append>
                            <Button id={props.id} variant="outline-secondary" onClick={sendFlag}>OK</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
                <a href={props.link} onClick={() => window.open(props.link)} >Click on this LINK</a>

                <p>{props.desc}</p>
                <p>Points: 100</p>
            </div>
        </div >
        // </div>
    );
}
