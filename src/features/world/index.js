import React from 'react'
import Player from '../player'
import Map from '../map'

import { tiles, tiles2 } from '../../data/maps/1'
import store from '../../config/store'

store.dispatch({ type: 'ADD_TILES', payload: {
    tiles
}})

class World extends React.Component{

     handleKeyPres = (e) => {
        if(e.charCode === 13){
            console.log('enter press here! ')
          }
    }
    render(){
    return(
        
        <div onKeyPress={(e) => this.handleKeyPress(e)}
        className = 'game-world'
        style = {{
            position: 'relative',
            width: '800px',
            height: '400px',
            margin: '20px auto'
        }}
        > 
            <Map/>
            <Player/>
        </div>
    )}
}

export default World