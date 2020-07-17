import * as actionTypes from "./types"

// 
// User actions
// 

// Set user action
export const setUser = (user) => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user // user data passed
        }
    }
}

// Clear User
export const clearUser = () => {
    return {
        type: actionTypes.CLEAR_USER
    }
}


// 
// Channel Actions
// 

// SetCurrentChannel
export const setCurrentChannel = channel => {
    return {
        type: actionTypes.SET_CURRENT_CHANNEL,
        payload: {
            currentChannel: channel // Channel passed
        }
    }
}