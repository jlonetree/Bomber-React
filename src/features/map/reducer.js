
const initialState = {
    tiles: [],
}

const levelReducer = (state=initialState, action) => {
    switch(action.type){
        case 'ADD_TILES':
            return{
                ...action.payload
            }
        default:
            return state
    }
}

export default levelReducer