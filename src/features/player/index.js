import React from 'react'

// import React, {useState} from 'react';

import { connect } from 'react-redux'
import walkSprite from'./MainGuySpriteSheet.png'
import handleMovement from './movement'

import './styles.css'

// function handleKeyPress (e) {
 
// }

class Player extends React.Component {
    // const [bombs, setBombs] = useState({
    //     bombs: 3
    // })
   
    // handleKeyPress = (e) => {
    //     e.preventDefault()
    //     console.log("keypress")
    // }

render(){
    return(
        <div
        // onKeyPress = {(e) => this.handleKeyPress(e)}
        className = 'player'
        style={{
            position: 'absolute',
            top: this.props.position[1],
            left: this.props.position[0],
           
            backgroundPosition: '0, 0',
            width: '20px',
            height: '20px'
         
        }}
        > 
        <img className = 'player_spritesheet' src = {walkSprite}  />
        </div>
    )
    }
}

function mapStateToProps(state) {
    return {
        ...state.player,
    }
    
}

export default connect(mapStateToProps)(handleMovement(Player))