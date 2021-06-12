import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import classes from './TxFee.module.scss';
import InputRange from '../../components/InputRange/InputRange';
import Tooltip from '../../components/Tooltip/Tooltip';

const TxFee = (props) => {

    const maxGasPrice = useSelector(reduxState => {
        return reduxState.gas.maxGasPrice;
    });

    const maxGasLimit = useSelector(reduxState => {
        return reduxState.gas.maxGasLimit;
    });

    return (
        <Fragment>
            <div>
                <p className={classes.text}>Gas price (Gwei)</p>
                <InputRange
                    onChange={e => props.onChange(e, 1)}
                    settings={{min: '1', max: maxGasPrice, step: '1'}}
                    value={props.gasPrice}
                />
            </div>
            
            <div>
                <p className={classes.text}>Gas limit</p>
                <InputRange
                    onChange={e => props.onChange(e, 2)}
                    settings={{min: '21000', max: maxGasLimit, step: '1000'}}
                    value={props.gasLimit}
                />
            </div>

            <div>
                <span className={classes.spanFontSize}>Nonce</span>
                <Tooltip
                    hoverText="This refers to the number of the transaction you are making. If you have never made a transaction before, this will be 0. Add +1 for each transaction you make. Reference an ETH blockchain explorer if you do not know your current nonce."
                />
                <input
                    className={classes.inputNonce}
                    type="text"
                    onChange={props.setNonce}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    value={props.nonceValue}
                />
            </div>

            {props.typeCoin === 'ETH' &&
                <div className={classes.inputDataWrapper}>
                    <span className={classes.spanFontSize}>Add&nbsp;Data</span>
                    <input
                        className={classes.inputData}
                        type="text"
                        placeholder="Add Data (e.g. 0x6578616d706c65)"
                        onChange={props.setData}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        value={props.inputData}
                    />
                </div>
            }
            
            <div>
                <p className={classes.text}>Transaction Fee</p>
                <p className={classes.txFeeLine}>
                    {props.txFee}
                </p>
            </div>
        </Fragment>
    );
}

export default TxFee;
