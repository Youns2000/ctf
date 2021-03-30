import './App.css';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect, Link } from 'react-router-dom'
import Header from './Header/Header.js'
import Comptes from './Components/Comptes'
import News from './Components/News';
import Scoreboard from './Components/Scoreboard';
import Challenges from './Components/Challenges';
import Profil from './Components/Profil';
import Log from './Components/Log'

const auth = {
  isAuthenticated: true,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100) // fake async
  }
}

// const auth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true
//     setTimeout(cb, 100) // fake async
//   },
//   signout(cb) {
//     this.isAuthenticated = false
//     setTimeout(cb, 100) // fake async
//   }
// }



function App() {
  if (auth.isAuthenticated) {
    return (
      <div className="App">
        <Router>
          <Header></Header>
          <Route path="/News" component={News} />
          <Route path="/Challenges" component={Challenges} />
          <Route path="/Scoreboard" component={Scoreboard} />
          <Route path="/Profil" component={Profil} />
        </Router>
      </div>
    );
  }
  else {
    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>positronX.io</Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route exact path='/' component={Log} />
                <Route path="/sign-in" component={Log} />
                {/* <Route path="/sign-up" component={SignUp} /> */}
              </Switch>
            </div>
          </div>
        </div></Router>
    );
  }
}

export default App;
