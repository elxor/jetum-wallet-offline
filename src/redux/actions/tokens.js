import { ADD_TOKEN, REMOVE_TOKEN } from './actionTypes';


export function addToken(contractAddress, decimals, symbol) {
    return dispatch => {
      
        const value = {
            symbol: symbol,
            balance: '',
            decimals: decimals,
            contract: contractAddress
        }

        dispatch({ type: ADD_TOKEN, payload: value });
    }
}


export function removeToken(index) {
    return (dispatch, getState) => {
        const list = getState().tokens.tokenList;
        
        const filtredList = list.filter((item, i) => {
            if (i !== index) {
                return item;
            }
            return false;
        });

        dispatch({ type: REMOVE_TOKEN, payload: filtredList });
    }
}