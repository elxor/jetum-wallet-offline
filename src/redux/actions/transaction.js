import Web3 from 'web3';
import { Decimal } from 'decimal.js';
import abi from 'human-standard-token-abi';
import { getChainId } from '../../utils/getChainId';
import { GET_TX_HASH, TX_LOADING, CLEAR_TX_DATA } from './actionTypes';


export function sendEther(receiver, amount, gasPrice, gasLimit, dataValue, nonceNum) {
    return (dispatch, getState) => {

        const network = getState().network.infuraNetwork;
        const privateKey = getState().account.privateKey;

        const chainIdNum = getChainId(network);

        const web3 = new Web3();

        const txObject = {
            nonce: nonceNum,
            to: receiver,
            value: web3.utils.toWei(amount.toString(), 'ether'),
            data: dataValue === '' ? '0x' : dataValue,
            gas: gasLimit.toString(),
            gasPrice: web3.utils.toWei(gasPrice.toString(), 'gwei'),
            chainId: chainIdNum
        }

        web3.eth.accounts.signTransaction(txObject, privateKey, (error, result) => {
            if (error) {
                console.log(error);

                const object = {
                    txHash: '',
                    loading: false,
                    error: error.message,
                    inputsClear: true
                };

                dispatch({ type: GET_TX_HASH, payload: object });
            }
            if (result) {
                const object = {
                    txHash: result.rawTransaction,
                    loading: false,
                    error: false,
                    inputsClear: true
                };

                dispatch({ type: GET_TX_HASH, payload: object });
            }
        });
    }
}


export function sendToken(receiver, amount, gasPrice, gasLimit, nonceNum, tokenId) {
    return (dispatch, getState) => {

        const network = getState().network.infuraNetwork;
        const privateKey = getState().account.privateKey;
        const tokenList = getState().tokens.tokenList;

        const chainIdNum = getChainId(network);

        const web3 = new Web3();

        const contractAddress = tokenList[+tokenId].contract;
        const dec = tokenList[+tokenId].decimals;

        const contract = new web3.eth.Contract(abi, contractAddress);

        const tokenAmount = new Decimal(amount.toString())
            .times(Decimal.pow(10, dec));
        
        const tokenAmountHex = tokenAmount.toHex();

        const txObject = {
            nonce: nonceNum,
            to: contractAddress,
            gas: gasLimit,
            gasPrice: web3.utils.toWei(gasPrice.toString(), 'gwei'),
            chainId: chainIdNum,
            data: contract.methods.transfer(receiver, tokenAmountHex).encodeABI()
        }

        web3.eth.accounts.signTransaction(txObject, privateKey, (error, result) => {
            if (error) {
                console.log(error);

                const object = {
                    txHash: '',
                    loading: false,
                    error: error.message,
                    inputsClear: true
                }

                dispatch({ type: GET_TX_HASH, payload: object });
            }
            if (result) {
                const object = {
                    txHash: result.rawTransaction,
                    loading: false,
                    error: false,
                    inputsClear: true
                }

                dispatch({ type: GET_TX_HASH, payload: object });
            }
        });

    }
}


export function txLoading() {
    return {
        type: TX_LOADING
    }
}

export function clearTxData() {
    return {
        type: CLEAR_TX_DATA
    }
}