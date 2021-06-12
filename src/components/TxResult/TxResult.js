import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './TxResult.module.scss';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { clearTxData } from '../../redux/actions/transaction';
import { downloadFile } from '../../utils/downloadFile';

const TxResult = () => {
    const [state, setState] = useState({
        modal: false
    });

    const dispatch = useDispatch();

    const txRaw = useSelector(reduxState => {
        return reduxState.transaction.txHash;
    });

    const error = useSelector(reduxState => {
        return reduxState.transaction.error;
    });

    useEffect(() => {
        if (txRaw !== '' || error) {
            setState(state => ({
                ...state,
                modal: true
            }));
        }
    }, [txRaw, error]);

    const modalToogleHandler = () => {
        setState(state => ({
            ...state,
            modal: !state.modal
        }));
        dispatch(clearTxData());
    }

    const clickDownloadBtnHandler = () => {
        const timeNow = Date.now();

        const data = {
            rawTransaction: txRaw
        }

        const dataJson = JSON.stringify(data);
        const fileName = `signedTransactionObject-${timeNow}.json`;

        downloadFile(fileName, dataJson);
    }

    return (
        <Fragment>
            {state.modal && <Modal onClick={modalToogleHandler}>
                {txRaw !== '' &&
                    <div className={classes.success}>
                        <p className={classes.headerSuccess}>Success!</p>
                        <div>
                            <p className={classes.title}>Signed Transaction</p>
                            <p className={`wordwrap ${classes.txHashWrapper}`}>
                                {txRaw}
                            </p>
                        </div>
                        <div className={classes.downloadBtnWrapper}>
                            <Button
                                customClass={classes.downloadBtn}
                                onClick={clickDownloadBtnHandler}
                            >
                                Download JSON
                            </Button>
                        </div>
                        
                        
                    </div>
                }
                {error &&
                    <div className={classes.error}>
                        <p className={classes.headerError}>Error!</p>
                        <p>{error}</p>
                    </div>
                }
            </Modal>}
        </Fragment>
    );
}

export default TxResult;
