import './Challenge.css'
import React, { useState } from "react";

export default function Challenge(props) {
    const [open, setOpen] = useState(false);

    function modal() {
        document.getElementById(props.id).className = (open ? "Challenge" : "ChallengeOpenned");
        setOpen(!open)
    }

    return (
        <div id={props.id} className="Challenge" onClick={modal}>
            <h3>challenge</h3>
            <a href="Challenges" style={{ display: open ? '' : 'none' }}>link</a>
            <p>test</p>
        </div >
    );
}