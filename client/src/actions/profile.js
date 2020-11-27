import axios from 'axios'
import {setAlert} from './alert'

import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types'

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')
        console.log('res data', res.data)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusTest, status: error.response.status }
        })
        
    }
}