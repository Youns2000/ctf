import React from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import * as legoData from "../animation.json";
import { browserHistory } from "react-router";
// import "bootstrap/dist/css/bootstrap.css";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: legoData.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
}

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            done: undefined
        };
    }

    componentDidMount() {
        setTimeout(() => {
            fetch("https://jsonplaceholder.typicode.com/posts")
                .then(response => response.json())
                .then(json => this.setState({ done: true }));
        }, 1200);
    }

    render() {
        return (
            <div>
                {!this.state.done ? (
                    <FadeIn>
                        <div class="d-flex justify-content-center align-items-center">
                            <h1>PWF</h1>
                            <Lottie options={defaultOptions} height={120} width={120} />
                        </div>
                    </FadeIn>
                ) : (
                        <h1>hello world</h1>
                    )}
            </div>
        );
    }
}