import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';
import classes from './TokensArea.module.scss';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import TokenList from '../../components/TokenList/TokenList';
import { addToken } from '../../redux/actions/tokens';


const TokensArea = () => {

    const [state, setState] = useState({
        inputVisible: false,
        contract: '',
        hideInputAfterSave: false,
        warning: false,
        symbol: '',
        decimals: '',
        isInputsValid: false
    });

    const dispatch = useDispatch();

    const tokenList = useSelector(reduxState => {
        return reduxState.tokens.tokenList;
    });


    const addTokensHandler = () => {
        setState(state => ({
            ...state,
            inputVisible: !state.inputVisible,
            warning: false
        }));
    }

    const inputContractHandler = e => {
        setState(state => ({
            ...state,
            contract: e.target.value
        }));
    }

    const inputSymbolHandler = e => {
        setState(state => ({
            ...state,
            symbol: e.target.value
        }));
    }

    const inputDecimalsHandler = e => {
        const regex = /^\+?([0-9]\d*)+$|^$/;
        const valid = regex.test(e.target.value);

        if (valid) {
            setState(state => ({
                ...state,
                decimals: e.target.value
            }));
        }
    }

    useEffect(() => {
        const isContractValid = Web3.utils.isAddress(state.contract);
        const isSymbolValid = state.symbol !== '';
        const isDecimalsValid = state.decimals !== '';

        const isAllValid = isContractValid
            && isSymbolValid
            && isDecimalsValid;

        setState(state => ({
            ...state,
            isInputsValid: isAllValid
        }));

    }, [state.contract, state.symbol, state.decimals]);


    const saveButtonHandler = () => {
        const isTokenAdded = tokenList
            .find(item => item.contract === state.contract);

        if (!isTokenAdded) {
            dispatch(
                addToken(state.contract, state.decimals, state.symbol)
            );

            setState(state => ({
                ...state,
                contract: '',
                symbol: '',
                decimals: '',
                isInputsValid: false,
                hideInputAfterSave: true,
                warning: false
            }));
            
        } else {
            setState(state => ({
                ...state,
                contract: '',
                symbol: '',
                decimals: '',
                isInputsValid: false,
                warning: true
            }));
        }
    }

    useEffect(() => {
        if (state.hideInputAfterSave) {
            setState(state => ({
                ...state,
                inputVisible: false,
                hideInputAfterSave: false
            }));
        }
     // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenList]);

  
    return (
        <div className={classes.main}>
            <div>
                <p className={classes.text}>Tokens Balance
                    <i className={`fa fa-refresh ${classes.iconRefresh}`}></i>
                </p>
                <p className={classes.notice}>
                    Balance is not available in offline version
                </p>
                {tokenList.length !== 0 &&
                    <TokenList />
                }
                <Button
                    customClass={classes.addTokensBtn}
                    onClick={addTokensHandler}
                >Add Tokens</Button>
            </div>
            {state.inputVisible &&
                <div>
                    <p className={classes.text}>Token Contract Address</p>
                    <Input
                        customClass={classes.input}
                        onChange={inputContractHandler}
                        value={state.contract}
                    />
                    <p className={`${classes.text} ${classes.marginTop}`}>
                        Token Symbol
                    </p>
                    <Input
                        customClass={classes.input}
                        onChange={inputSymbolHandler}
                        value={state.symbol}
                    />
                    <p className={`${classes.text} ${classes.marginTop}`}>
                        Decimals
                    </p>
                    <Input
                        customClass={classes.input}
                        onChange={inputDecimalsHandler}
                        value={state.decimals}
                    />
                    <Button
                        customClass={classes.saveBtn}
                        disabled={state.isInputsValid ? '' : 'disabled'}
                        onClick={saveButtonHandler}
                    >Save</Button>
                    {state.warning &&
                        <p className={classes.errorText}>
                            Warning! Token Already Exist.
                        </p>
                    }
                </div>
            }
        </div>
    );
}

export default TokensArea;
