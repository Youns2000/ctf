import Challenge from "./Challenge"
import "./Challenges.css"

export default function Challenges() {
    return (
        <div className="Challenges">
            <h3>Boot2Root:</h3>
            <Challenge id="1"></Challenge>
            <Challenge id="2"></Challenge>
            <Challenge id="3"></Challenge>
            <h3>Cryto:</h3>
            <Challenge id="4"></Challenge>
            <Challenge id="5"></Challenge>
            <Challenge id="6"></Challenge>
            <Challenge id="7"></Challenge>
            <h3>Craking:</h3>
            <Challenge id="8"></Challenge>
            <Challenge id="9"></Challenge>
            <Challenge id="10"></Challenge>
        </div>
    );
}