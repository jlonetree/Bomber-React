import React, { useRef } from "react";
import ReactDOM from "react-dom";

const url = `http://localhost:3000/api/v1/profile`

export default class Update extends React.Component {
    
    handleChange = (e) => {
        console.log(e.target.value, e.target.name)
        this.setState({ [e.target.name]: e.target.value })
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { name, password_digest } = this.state

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",

            },
            body: JSON.stringify({
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

    render() {
        const {handleChange, handleSubmit, nextPath} = this
        return (
            <div>
            <div className="container">
                    <div className="page-title">
                        <h1>Update Player</h1>
                    </div>
                    <div className="game-title">
                        <h2>BomberReact</h2>
                    </div>
                </div>
                <div className="login">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="inline fields">
                            <h3>Update Player Info</h3>
                            <label for="username">Username: </label>
                            <input type="text" id="username" placeholder="username" name="username" onChange={handleChange} />
                            <br />
                            <label for="password_digest">Password: </label>
                            <input type="password" id="password" placeholder="password" name="password_digest" onChange={handleChange} />
                            <br />
                            <button type="submit" onClick={() => nextPath('/')}>Log-In</button>
                            <h5>Change Your Mind?</h5>
                            <a href="/world">Click Here</a>
                            <h5>Delete Player (This is Irriversable)</h5>
                            <button>Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}