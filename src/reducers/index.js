import { combineReducers } from "redux"
import * as actionTypes from "../actions/types"

const initialUserState = {
    currentUser: null,
    isLoading: true
}

// reduces all the user related data
const user_reducer = (state = initialUserState, action) => {
    // Updates state depending on the type of action coming in
    switch(action.type) {
        case actionTypes.SET_USER: 
            return {
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        case actionTypes.CLEAR_USER:
            return {
                ...initialUserState,
                isLoading: false
            }
        default: 
            return state
    }   
}

const rootReducer = combineReducers({
    user: user_reducer
})

export default rootReducer