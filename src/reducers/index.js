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
                ...state,
                isLoading: false
            }
        default: 
            return state
    }   
}



// Initial Channel State
const initialChannelState = {
    currentChannel: null
}

// reduces all the channel related data
const channel_reducer = (state = initialChannelState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CHANNEL:
            return {
                ...state,
                currentChannel: action.payload.currentChannel
            }
    
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user: user_reducer,
    channel: channel_reducer
})

export default rootReducer