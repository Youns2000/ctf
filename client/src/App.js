import './App.css';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect, Link } from 'react-router-dom'
import Header from './Header/Header.js'
import Comptes from './Components/Comptes'
import News from './Components/News';
import Scoreboard from './Components/Scoreboard';
import Challenges from './Components/Challenges';
import Profil from './Components/Profil';
import Login from './Components/Log/Log'
import Register from './Components/Register/Sign'

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
          <Route path="/Log" component={Login} />
          <Route path="/Register" component={Register} />
        </Router>
      </div>
    );
  }
  else {
    return (
      <p>TEST</p>
    );
  }
}

export default App;
