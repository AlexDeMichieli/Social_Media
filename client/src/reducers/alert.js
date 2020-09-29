import {SET_ALERT, REMOVE_ALERT} from './../actions/types'

const initialState = []

export default function (state = initialState, action){
    console.log('ACTION', action)
    const {type, payload} = action

    switch(type){
        case SET_ALERT:
            //you can also pass in [state] withtout 'remove alert', not too ideal
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload)
        default:
            return state
    }
}