import store from '../../config/store'
import { MAP_HEIGHT, MAP_WIDTH, SPRITE_SIZE } from '../../config/constants'

export default function handleMovement(player){

    function getNewPosition(oldPos, direction) {
      
        
        switch (direction){
            case 'WEST':
                return [ oldPos[0]-SPRITE_SIZE, oldPos[1] ]
            case 'EAST':
                return [ oldPos[0]+SPRITE_SIZE, oldPos[1] ]
            case 'NORTH':
                return [ oldPos[0], oldPos[1]-SPRITE_SIZE ]
            case 'SOUTH':
                return [ oldPos[0], oldPos[1]+SPRITE_SIZE ]
        }
    }

    function observeBoundaries(oldPos, newPos) {
        return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) && 
                (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
                
    }

    function observeImpassable(oldPos,newPos) {
        const tiles = store.getState().map.tiles
        const y = newPos[1] / SPRITE_SIZE
        const x = newPos[0] / SPRITE_SIZE
        const nextTile = tiles[y][x]
        return nextTile < 5
    }

    function dispatchMove(newPos){
       
        store.dispatch({
            type: 'MOVE_PLAYER',
            payload: {
                position: newPos
            }
        })
    }

    function attemptMove(direction){
        let sprite = document.querySelector('.player_spritesheet')
        sprite.className = `player_spritesheet ${direction}`
        const oldPos = store.getState().player.position
        const newPos = getNewPosition(oldPos, direction)

        if(observeBoundaries(oldPos, newPos) && observeImpassable(oldPos, newPos))
        dispatchMove(newPos)
        
    }

    function handleKeyDown(e) {
        e.preventDefault()

        switch(e.keyCode) {
            case 37:
            case 65: 
                return attemptMove('WEST')

            case 38:
            case 87:
                return attemptMove('NORTH')

            case 39:
            case 68:
                return attemptMove('EAST')

            case 40:
            case 83:
                return attemptMove('SOUTH')

            default:
                console.log(e.keyCode)
        }
    }

    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })

    // window.addEventListener ('keyup', () => {
    //     let sprite = document.querySelector('.player_spritesheet')
    //     sprite.className = null
    // })
    return player
}