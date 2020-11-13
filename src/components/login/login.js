import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import '../registration/registration.css';

const url = `http://localhost:3000/api/v1/profile`

class Login extends Component {

    state = {
        username: "",
        password_digest: ""
    }

    handleChange = (e) => {
        console.log(e.target.value, e.target.name)
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer <token>`
            }
        })
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        const { handleSubmit, handleChange } = this
        return (
            <div className="login">
                <div className="container">
                    <div className="page-title">
                        <h1>Log-In</h1>
                    </div>
                    <div className="game-title">
                        <h2>BomberReact</h2>
                    </div>
                </div>
                <div className="login">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="inline fields">
                            <h3>Player Log-In</h3>
                            <label for="username">Username: </label>
                            <input type="text" id="username" placeholder="username" name="username" onChange={handleChange} />
                            <br />
                            <label for="password_digest">Password: </label>
                            <input type="password" id="password" placeholder="password" name="password_digest" onChange={handleChange} />
                            <br />
                            <button type="submit" onClick={() => this.nextPath('/')}>Log-In</button>
                            <h5>First Time User?</h5>
                            <a href="/registration">Click Here</a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Login)