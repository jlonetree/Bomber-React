import store from '../../config/store'
import { MAP_HEIGHT, MAP_WIDTH, SPRITE_SIZE } from '../../config/constants'
import { current } from '@reduxjs/toolkit'

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

    function deployBomb() {
        console.log('boom')
        const oldPos = store.getState().player.position
        const tiles = store.getState().map.tiles
        const y = oldPos[1] / SPRITE_SIZE
        const x = oldPos[0] / SPRITE_SIZE
        let currentTile = tiles[y][x]
        let fullScreenXMod = 320
        let bombsTile = document.elementFromPoint(oldPos[0] + 320, oldPos[1] + 40)
        bombsTile.className = 'tile bomb' 
         return setTimeout(esssplode, 3000, bombsTile, oldPos)
        
    }

    function esssplode(tile, coordinates) {
        const tiles = store.getState().map.tiles
        tile.className = 'tile explode'

       let currentTileId = parseInt(tile.id)
        // if(currentTileId - ){

        // }else{
       let tileUp = document.getElementById(`${currentTileId - 80}`)
       let tileDown = document.getElementById(`${currentTileId + 80}`)
       let tileLeft = document.getElementById(`${currentTileId - 2}`)
       let tileRight = document.getElementById(`${currentTileId + 2}`)
       tileRight.className = 'tile explode'
       tileUp.className = 'tile explode'
       tileLeft.className = 'tile explode'
       tileDown.className = 'tile explode'

       let twoTileUp = document.getElementById(`${currentTileId - 160}`)
       let twoTileDown = document.getElementById(`${currentTileId + 160}`)
       let twoTileLeft = document.getElementById(`${currentTileId - 4}`)
       let twoTileRight = document.getElementById(`${currentTileId + 4}`)
       twoTileUp.className = 'tile explode'
       twoTileDown.className = 'tile explode'
       twoTileLeft.className = 'tile explode'
       twoTileRight.className = 'tile explode'

       const y = coordinates[1] / SPRITE_SIZE
       const x = (coordinates[0] / SPRITE_SIZE)
 
       tiles[y][x + 2] = 0
       tiles[y][x - 2] = 0
       tiles[y - 2][x] = 0
       tiles[y + 2][x] = 0
       tiles[y][x + 1] = 0
       tiles[y][x - 1] = 0
       tiles[y - 1][x] = 0
       tiles[y + 1][x] = 0
       
    return setTimeout(resolveEsssplode, 700, tileUp, tileDown, tileLeft, tileRight, tile,
        twoTileUp, twoTileDown, twoTileLeft, twoTileRight)
    // }
    }

    function resolveEsssplode(up, down, left, right, tile, twoUp, twoDown, twoLeft, twoRight){
       up.className = 'tile grass'
       down.className = 'tile grass'
       left.className = 'tile grass'
       right.className = 'tile grass'
       tile.className = 'tile grass'
       twoUp.className = 'tile grass'
       twoDown.className = 'tile grass'
       twoLeft.className = 'tile grass'
       twoRight.className = 'tile grass'
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
            case 32:
                return deployBomb()

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