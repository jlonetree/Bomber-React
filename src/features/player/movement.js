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
       tile.className = 'tile grass'
       let tileData = tile.getBoundingClientRect()
       let fullScreenMod = 280
       let tileUp = document.elementFromPoint(coordinates[0] + (fullScreenMod + 40), coordinates[1])
       let testTile = tileUp.nextElementSibling
       let tileDown = document.elementFromPoint(coordinates[0] + (fullScreenMod + 40), coordinates[1] + 80)
       let tileLeft = document.elementFromPoint(coordinates[0] + fullScreenMod, coordinates[1] + 40)
       let tileRight = document.elementFromPoint(coordinates[0] + (fullScreenMod + 80), coordinates[1] + 40)
       tileRight.className = 'tile explode'
       tileUp.className = 'tile explode'
       tileLeft.className = 'tile explode'
       tileDown.className = 'tile explode'
       const y = coordinates[1] / SPRITE_SIZE
       const x = (coordinates[0] / SPRITE_SIZE)
       const twoRightX = (coordinates[0] / SPRITE_SIZE) + 2
       const twoLeftX= (coordinates[0] / SPRITE_SIZE) - 2
       const twoUpY = (coordinates[1] / SPRITE_SIZE) - 2
       const twoDownY = (coordinates[1] / SPRITE_SIZE) + 2
       const oneRightX = (coordinates[0] / SPRITE_SIZE) + 1
       const oneLeftX= (coordinates[0] / SPRITE_SIZE) - 1
       const oneUpY = (coordinates[1] / SPRITE_SIZE) - 1
       const oneDownY = (coordinates[1] / SPRITE_SIZE) + 1
       tiles[y][twoRightX] = 0
       tiles[y][twoLeftX] = 0
       tiles[twoUpY][x] = 0
       tiles[twoDownY][x] = 0
       tiles[y][oneRightX] = 0
       tiles[y][oneLeftX] = 0
       tiles[oneUpY][x] = 0
       tiles[oneDownY][x] = 0
    // console.log('countdown complete', tile, tileUp, tileDown, tileLeft, tileRight, coordinates, x, y)
    console.log('')
    return setTimeout(resolveEsssplode, 700, tileUp, tileDown, tileLeft, tileRight)
    }

    function resolveEsssplode(up, down, left, right){
       up.className = 'tile grass'
       down.className = 'tile grass'
       left.className = 'tile grass'
       right.className = 'tile grass'
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