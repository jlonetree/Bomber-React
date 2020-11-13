import React from 'react';
import store from '../config/store.js'
import { connect } from 'react-redux'

class BombCount extends React.Component{
    constructor(props,context){
        super(props, context)
    }
   

    render(){
        let count = store.getState().bomb
        return(
            <div> Non functional Bombs: {count} </div>
        )
    }
}

export default connect()(BombCount)