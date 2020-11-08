import React from 'react'
import { connect } from 'react-redux'
import walkSprite from'./MainGuySpriteSheet.png'
import handleMovement from './movement'

import './styles.css'

function Player(props){

    // handleClassDirection = (e) =>{
    //     e.preventDefault()

    //     switch(e.keyCode) {
    //         case 37: 
    //             return 'WEST'

    //         case 38:
    //             return 'NORTH'

    //         case 39:
    //             return 'EAST'

    //         case 40:
    //             return 'SOUTH'

    //         default:
    //             console.log(e.keyCode)
    //     }
    // }

    return(
        <div
        className = 'player'
        style={{
            position: 'absolute',
            top: props.position[1],
            left: props.position[0],
            // backgroundImage: `url('${walkSprite}')`,
            // backgroundColor: 'pink',
            backgroundPosition: '0, 0',
            width: '20px',
            height: '20px'
         
        }}
        > 
        <img className = 'player_spritesheet' src = {walkSprite}  />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        ...state.player,
    }
    
}

export default connect(mapStateToProps)(handleMovement(Player))