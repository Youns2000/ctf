import React, { Component } from 'react'
import Challenge from "./Challenge"
import "./Challenges.css"

export default function Challenges() {
    return (
        <div className="Challenges">
            <h3>Jeopardy:</h3>
            <Challenge id="1"></Challenge>
            <Challenge id="2"></Challenge>
            <Challenge id="3"></Challenge>
            <h3>Crypto:</h3>
            <Challenge id="4"></Challenge>
            <Challenge id="5"></Challenge>
            <Challenge id="6"></Challenge>
            <Challenge id="5"></Challenge>
            <h3>VMs:</h3>
            <Challenge></Challenge>
            <Challenge></Challenge>
            <Challenge></Challenge>
        </div>
    );
}