import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fonts/HackArgo/Hacker_Argot_Regular.ttf';
import './fonts/DejaVu/DejaVuSansMono.ttf';
import bg from "./fonts/wallpaper.jpg"

// document.body.style.backgroundImage = `url(${bg})`;
document.body.style.backgroundColor = "#2D3737";
document.body.style.color = "#F0FFFF";
document.body.style.overflowY = "scroll";

// .body {
//   /* background-image: url("../src/fonts/wallpaper.jpg"); */
//   background - color: black;
//   color: #fefefe;
//   overflow - y: scroll;
// }
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
