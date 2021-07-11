import './Challenge.css'
import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { flagCheck } from "../services/api.js"


export default function Challenge(props) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

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
        const t = "input" + e.target.id;
        const res = await flagCheck(e.target.id, input);
        if (res === true) {
            console.log(res)
        }
        else {
            console.log("no")

        }
    }

    return (
        <div id={props.id} className="Challenge" onClick={modal}>
            <h3>{props.title}</h3>
            <div style={{ display: open ? '' : 'none' }}>
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
                <a href={props.link} >{props.link}</a>
                <p>{props.desc}</p>
            </div>

        </div >
    );
}
