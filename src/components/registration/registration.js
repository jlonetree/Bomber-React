import React, { Component } from 'react'

import { withRouter } from 'react-router-dom';
import './registration.css'

const url = `http://localhost:3001/api/v1/usernames/`

class Registration extends Component {

    constructor() {
        super()

        this.state = {
            email: "",
            name: "",
            password_digest: "",
            score: {
                amount: 0
            }
        }
    }

    handleChange = (e) => {
        console.log("Hi this is real", e.target.name, e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { email, name, password_digest } = this.state

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "name": name,
                "password_digest": password_digest,
                score: {
                    amount: 0
                }
            })

        })
            .then(res => res.json())
            .then(newUser => this.props.addUser(newUser))
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        const { handleSubmit, handleChange } = this
        return (
            <div className="registration">
                <div className="container">
                    <div className="page-title">
                        <h1>New Player</h1>
                    </div>
                    <div className="game-title">
                        <h2>BomberReact</h2>
                    </div>
                </div>
                <div className="register">
                    <form className="registration-form" onSubmit={handleSubmit}>
                        <div className="inline fields">
                            <h3>Registration Form</h3>
                            <label for="email">Email: </label>
                            <input type="text" id="email" placeholder="email" name="email" onChange={handleChange} />
                            <br />
                            <label for="name">Username: </label>
                            <input type="text" id="name" placeholder="username" name="name" onChange={handleChange} />
                            <br />
                            <label for="password">Password: </label>
                            <input type="password" id="password" placeholder="password" name="password_digest" onChange={handleChange} />
                            <br />
                            <button type="submit" onClick={() => this.nextPath('/')}>Create Player</button>
                            <h5>If you already have a Username</h5>
                            <a href="/login">Click Here</a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Registration)