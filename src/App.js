import React from 'react'
import World from './features/world'
import Registration from './components/registration/registration'
import Login from './components/login/login'
import Update from './components/update/Update'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import BombCount from './features/bombCount'

const url = `http://localhost:3001/api/v1/usernames/`

class App extends React.Component {

  state = {
    users: [],
    currentUser: ""
  }

  componentDidMount() {
    fetch(url)
      .then(res => res.json())
      .then(users => this.setState({ users: users }))
  }

  addUser = newUser => {
    console.log(newUser)
    this.setState({ users: [...this.state.users, newUser] })
  }

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li className="game">
              <Link to="/" >Game</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/registration">Registration</Link>
            </li>
            <li>
              <Link to="/update">Update User</Link>
            </li>
          </ul>

          <Switch>
            <Route exact path="/update">
              <Update />
            </Route>
            <Route exact path="/registration">
              <Registration addUser={this.addUser} />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <World />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
