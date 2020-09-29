import {REGISTER_SUCCESS, REGISTER_FAIL} from '../actions/types'

const initialstate = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function(state = initialstate, action) {

    const {type, payload} = action
å
    switch(type){
        case REGISTER_SUCCESS:
            //setting the token
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: falls,
                loading: false
            }
        default:
            return state
    }
}

}