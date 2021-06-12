import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Decimal } from 'decimal.js';
import Web3 from 'web3';
import classes from './SendArea.module.scss';
import Input from '../../components/Input/Input';
import SelectTokens from '../../components/SelectTokens/SelectTokens';
import Button from '../../components/Button/Button';
import TxFee from '../TxFee/TxFee';
import { sendEther, sendToken } from '../../redux/actions/transaction';
import TxResult from '../../components/TxResult/TxResult';
import { readFile } from '../../utils/readFile';
import { getNetworkById } from '../../utils/getNetworkById';


const SendArea = () => {

    const [state, setState] = useState({
        gasPrice: '',
        gasLimit: 21000,
        txFee: 0,
        nonce: '',
        address: '',
        amount: '',
        data: '',
        dataValid: true,
        typeCoin: 'ETH',
        isInputsValid: false,
        warning: false,
        warningText: '' 
    });

    const selectEl = useRef('');

    const dispatch = useDispatch();

    const maxGasPrice = useSelector(reduxState => {
        return reduxState.gas.maxGasPrice;
    });

    const maxGasLimit = useSelector(reduxState => {
        return reduxState.gas.maxGasLimit;
    });

    const tokens = useSelector(reduxState => {
        return reduxState.tokens.tokenList;
    });

    const inputsClear = useSelector(reduxState => {
        return reduxState.transaction.inputsClear;
    });

    const address = useSelector(reduxState => {
        return reduxState.account.address;
    });

    const network = useSelector(reduxState => {
        return reduxState.network.infuraNetwork;
    });


    const chageGasLimit = () => {
        if (selectEl.current.value === 'ETH') {
            setState(state => ({
                ...state,
                gasLimit: 21000
            }));
        } else {
            setState(state => ({
                ...state,
                gasLimit: 80000
            }));
        }
    }

    useEffect(() => {
        chageGasLimit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokens]);


    useEffect(() => {
        setState(state => ({
            ...state,
            typeCoin: selectEl.current.value
        }));
    }, [selectEl.current.value]);


    useEffect(() => {
        const validSubStr = state.data.startsWith('0x');
        const hexValid = Web3.utils.isHexStrict(state.data);

        if (validSubStr && hexValid) {
            const value = 21000 + (state.data.length - 2) * 70;
            setState(state => ({
                ...state,
                gasLimit: value
            }));
        } else if (state.data === '') {
            setState(state => ({
                ...state,
                gasLimit: 21000
            }));
        }
    }, [state.data]);


    useEffect(() => {
        const fee = Decimal
            .mul(+state.gasPrice, +state.gasLimit)
            .div(1000000000).toNumber();

        setState(state => ({
            ...state,
            txFee: fee
        }));

    }, [state.gasPrice, state.gasLimit]);


    useEffect(() => {
        const isAddressValid = Web3.utils.isAddress(state.address);
        const isAmountValid = state.amount !== '';

        const isGasPriceValid = state.gasPrice !== ''
            && state.gasPrice !== 0
            && state.gasPrice !== '0';

        const isNonceValid = state.nonce !== '';

        const hexDataValid = Web3.utils.isHexStrict(state.data);
        const isDatavalid = hexDataValid || state.data === '';
        
        const isAllValid = isAddressValid 
            && isAmountValid
            && isGasPriceValid
            && isNonceValid
            && isDatavalid;

        setState(state => ({
            ...state,
            isInputsValid: isAllValid
        }));

    }, [
        state.address,
        state.amount,
        state.gasPrice,
        state.nonce,
        state.data
    ]);


    useEffect(() => {
        if (inputsClear) {
            setState(state => ({
                ...state,
                address: '',
                amount: '',
                data: '',
                nonce: '',
                gasPrice: ''
            }));
        }
    }, [inputsClear]);


    const addressInputHandler = e => {
        setState(state => ({
            ...state,
            address: e.target.value,
        }));
    }

    const amountInputHandler = e => {
        const regex = /^[0-9]*[.,]?[0-9]*$/;
        const value = e.target.value;

        const inputValid = regex.test(value);

        if (inputValid) {
            setState(state => ({
                ...state,
                amount: value
            }));
        }
    }

    const gasInputsHandler = (e, id) => {
        const regex = /^[0-9]*[.,]?[0-9]*$/;
        const value = e.target.value;
        const valid = regex.test(value);

        if (id === 1
                && valid
                && value <= maxGasPrice
            ) {
            setState(state => ({
                ...state,
                gasPrice: value
            }));
        }
        if (id === 2
                && valid
                && value >= 21000
                && value <= maxGasLimit
            ) {
            setState(state => ({
                ...state,
                gasLimit: value
            }));
        }
    }

    const inputNonceHandler = e => {
        const regex = /^\+?([0-9]\d*)+$|^$/;
        const valid = regex.test(e.target.value);

        if (valid) {
            setState(state => ({
                ...state,
                nonce: e.target.value
            }));
        }
    }

    const inputDataHandler = e => {
        setState(state => ({
            ...state,
            data: e.target.value,
        }));
    }

    const selectTokensHandler = () => {
        chageGasLimit();
    }

    const validationImportData = (object) => {
        try {
            const addressFromImport = object.address.toLowerCase();
            const addressCurrent = address.toLowerCase();
            const networkFromImport = getNetworkById(object.chainID);
    
            const cond1 = network === networkFromImport;
            const cond2 = addressCurrent === addressFromImport;
    
            if (cond1 && cond2) {
                const importGasPrice = Web3.utils.fromWei(
                    object.gasPrice.toString(), 'gwei'
                );

                setState(state => ({
                    ...state,
                    gasPrice: importGasPrice,
                    nonce: object.nonce,
                    warning: false,
                    warningText: ''
                }));
    
            } else if (cond1 && (cond1 || cond2)) {

                setState(state => ({
                    ...state,
                    warning: true,
                    warningText: 'Error: Address does not match!'
                }));

            } else if (cond2 && (cond1 || cond2)) {

                setState(state => ({
                    ...state,
                    warning: true,
                    warningText: 'Error: Network does not match!'
                }));

            } else {
                setState(state => ({
                    ...state,
                    warning: true,
                    warningText: 'Error: Import data does not match!'
                }));
            }
        } catch (e) {
            setState(state => ({
                ...state,
                warning: true,
                warningText: 'Error: Invalid file data!'
            }));

            console.log(e.message);
        }
    }

    const importFileHandler = e => {
        const file = e.target.files[0];

        const fileTypes = ['text/plain', 'application/json'];

        if (fileTypes.indexOf(file.type) !== -1) {
            readFile(file).then(
                result => {
                    const dataObject = JSON.parse(result);
                    validationImportData(dataObject);
                },
                error => {
                    console.log(error);
                }
            );
        } else {
            console.log('Error: Invalid file type!');

            setState(state => ({
                ...state,
                warning: true,
                warningText: 'Error: Invalid file type!'
            }));
        }
    }

    const sendButtonHandler = () => {
        if (selectEl.current.value === 'ETH') {
            dispatch(sendEther(state.address,
                state.amount,
                state.gasPrice,
                state.gasLimit,
                state.data,
                state.nonce
            ));
        } else {
            dispatch(sendToken(state.address,
                state.amount,
                state.gasPrice,
                state.gasLimit,
                state.nonce,
                selectEl.current.value
            ));
        } 
    }
    

    return (
        <div className={classes.main}>
            <div>
                <p className={classes.header}>Send Offline</p>
                <p className={classes.text}>To address</p>
                <div className={classes.row}>
                    <Input
                        customClass={classes.input}
                        onChange={addressInputHandler}
                        value={state.address}
                    />
                </div>
            </div>
            <div>
                <p className={classes.text}>Amount</p>
                <div className={classes.row}>
                    <Input
                        customClass={classes.input}
                        onChange={amountInputHandler}
                        value={state.amount}
                    />
                    <SelectTokens
                        onChange={selectTokensHandler}
                        selectRef={selectEl}
                    />
                </div>
            </div>
            <TxFee
                onChange={gasInputsHandler}
                setNonce={inputNonceHandler}
                setData={inputDataHandler}
                nonceValue={state.nonce}
                gasPrice={state.gasPrice}
                gasLimit={state.gasLimit}
                txFee={state.txFee}
                inputData={state.data}
                typeCoin={state.typeCoin}
            />
            <div className={classes.buttonWrapper}>
                <div className={classes.importWrapper}>
                    <label htmlFor="importId" className={classes.importLabel}>
                        Import JSON
                    </label>
                    <input
                        id="importId"
                        type="file"
                        onChange={importFileHandler}
                        className={classes.inputFile}
                        onClick={e => e.target.value = null}
                    />
                </div>
                <Button
                    customClass={classes.button}
                    onClick={sendButtonHandler}
                    disabled={state.isInputsValid
                        ? '' : 'disabled'}
                >Generate</Button>
                {state.warning &&
                    <div className={classes.notice}>
                        {state.warningText}
                    </div>
                }
            </div>
            <TxResult />
        </div>
    );
}

export default SendArea;
