import './Challenge.css'

export default function challenge(props) {

    function modal() {
        console.log(props.id)
        document.getElementById(props.id).className = "ChallengeOpenned";
        // document.getElementById(props.id).classList.add("blur");
        console.log("miaou")
    }

    return (
        <div id={props.id} className="Challenge" onClick={modal}>
            <h3>challenge</h3>
        </div >
    );
}
