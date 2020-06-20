import {
    SET_ERRORS,
    CLEAR_ERRORS
} from '../actionTypes'

export default (state = {
    errors: []
}, action) => {
    switch (action.type) {

        case SET_ERRORS:
            return { ...state, errors: action.payload }

        case CLEAR_ERRORS:
            return { ...state, errors: [] }

        default:
            return state
    }
}