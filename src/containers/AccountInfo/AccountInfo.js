import React from 'react';
import { useSelector } from 'react-redux';
import classes from './AccountInfo.module.scss';
import CopyToClipboard from '../../components/CopyToClipboard/CopyToClipboard';
import { getSymbolByNetwork } from '../../utils/getSymbolByNetwork';

const AccountInfo = () => {

    const address = useSelector(reduxState => {
        return reduxState.account.address
    });

    const network = useSelector(reduxState => {
        return reduxState.network.infuraNetwork;
    });

    return (
        <div className={classes.main}>
            <div>
                <p className={classes.text}>Account Address</p>
                <span className="wordwrap">{address}</span>
                <CopyToClipboard
                    textToCopy={address}
                    customClass={classes.copy}    
                />
            </div>
            <div>
                <p className={classes.text}>Account Balance
                    <i className={`fa fa-refresh ${classes.iconRefresh}`}></i>
                </p>
                <p className={classes.notice}>
                    Balance is not available in offline version
                </p>
                <p className={classes.ethBalance}>
                    0 {getSymbolByNetwork(network)}
                </p>
                <p>0<span className={classes.usdSymbol}>$</span></p>
            </div>
            <div>
                <p className={classes.text}>Transaction History</p>
                <a
                    className={classes.link}
                    href={network === 'mainnet'
                        ?  `https://etherscan.io/address/${address}`
                        : `https://${network}.etherscan.io/address/${address}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                >etherscan.io</a>
            </div>
        </div>
    );
}

export default AccountInfo;
