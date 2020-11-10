import React, { Component } from 'react'

class Registration extends Component {

    state={
        email: "",
        username: "",
        password: "",
        score: {
            amount: 0
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
      }

    render() {
        return (
            <div>
                <form className="registration-form" onSubmit={this.handleSubmit}>
                    <input className="email" placeholder="email">Email</input>
                    <input className="username" placeholder="username">Username</input>
                    <input className="password" placeholder="password">Password</input>
                </form>
            </div>
        )
    }
}

export default Registration