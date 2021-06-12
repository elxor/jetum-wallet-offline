import { ADD_TOKEN, REMOVE_TOKEN } from '../actions/actionTypes';

const initialState = {
    tokenList: []
}

export const tokensReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOKEN:
            return {
                ...state,
                tokenList: [
                    ...state.tokenList,
                    action.payload
                ],
                tokenError: false
            }
        case REMOVE_TOKEN:
            return {
                ...state,
                tokenList: [
                    ...action.payload
                ]
            }
        default: return state;
    }
}