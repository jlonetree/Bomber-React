import React from 'react'
import World from './features/world'
import BombCount from './features/bombCount'

class App extends React.Component {

  render(){
    return (
    <div>
      <World/>
      <BombCount/>
    </div>
    )
  }
}

export default App;
