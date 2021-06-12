import { combineReducers } from 'redux';
import { accountReducer } from './accountReducer';
import { networkReducer } from './networkReducer';
import { tokensReducer } from './tokensReducer';
import { gasReducer } from './gasReducer';
import { transactionReducer } from './transactionReducer';

export const rootReducer = combineReducers({
    account: accountReducer,
    network: networkReducer,
    tokens: tokensReducer,
    gas: gasReducer,
    transaction: transactionReducer
});