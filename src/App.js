import React from 'react'
import World from './features/world'
import Registration from './registration/index'

const url = 'http://localhost:3000/usernames/'

class App extends React.Component {

  createUser = (newUser) => {

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json)
      .then(data => console.log(data))
  }

  render() {
    return (
      <div>
        <Registration createUser={this.createUser}/>
        <World />
      </div>
    )
  }
}

export default App;
