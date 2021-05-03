import './App.css';
import React, { useState, useEffect, Component } from 'react'
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect, Link, history } from 'react-router-dom'
import Header from './Header/Header.js'
import News from './Components/News';
import Scoreboard from './Components/Scoreboard';
import Challenges from './Components/Challenges';
import Profil from './Components/Profil';
import Login from './Components/Log/Log'
import Register from './Components/Register/Register'
import { authCheck } from "./services/api.js"

export default function App() {
  const [auth, setAuth] = useState("");

  useEffect(() => {
    const check = async () => {
      const checked = await authCheck()
      setAuth(checked)
      console.log(checked)
      console.log(auth)
    }
    check();
  }, [])

  if (auth) {
    return (
      <div className="App">
        <Router>
          <Header />
          <Route exact path="/" component={News} />
          <Route exact path="/News" component={News} />
          <Route path="/Challenges" component={Challenges} />
          <Route path="/Scoreboard" component={Scoreboard} />
          <Route path="/Profil" component={Profil} />
        </Router>
      </div>
    );
  }
  else {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/Login" component={Login} />
            <Route path="/Register" component={Register} />
          </Switch>
        </Router>
      </div>
    );
  }
}

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isAuthenticated: false
//     }

//   }

//   async componentDidMount() {
//     try {
//       const checked = await authCheck()
//       console.log(checked)
//     } catch (error) {
//       console.error(error);
//       alert("Error logging in please try again");
//     }
//   }
//   render() {
//     if (auth.isAuthenticated) {
//       return (
//         <div className="App">
//           <Router>
//             <Header />
//             <Route exact path="/" component={News} />
//             <Route exact path="/News" component={News} />
//             <Route path="/Challenges" component={Challenges} />
//             <Route path="/Scoreboard" component={Scoreboard} />
//             <Route path="/Profil" component={Profil} />
//           </Router>
//         </div>
//       );
//     }
//     else {
//       return (
//         <div>
//           <Router>
//             <Switch>
//               <Route exact path="/" component={Login} />
//               <Route exact path="/Login" component={Login} />
//               <Route path="/Register" component={Register} />
//             </Switch>
//           </Router>
//         </div>
//       );
//     }
//   }
// };

// export default App;
