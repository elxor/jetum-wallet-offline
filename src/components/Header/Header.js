import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Header.module.scss';
import Select from '../Select/Select';
import { changeNetwork } from '../../redux/actions/network';


const Header = () => {

    const dispatch = useDispatch();
    
    const network = useSelector(reduxState => {
        return reduxState.network.infuraNetwork;
    });
    
    const selectNetworkHandler = e => {
        dispatch(changeNetwork(e.target.value));
    }

    return (
        <div className={classes.header}>
            <div className={`${classes.content} container`}>
                <Link exact="true" to="/" className={classes.title}>JETUM</Link>
                <div className={classes.info}>
                    <div className={classes.itemMargin}>
                        Offline Version
                    </div>
                    <div>
                        Network:&nbsp;
                        <Select
                            customClass={classes.select}
                            options={['mainnet', 'ropsten', 'kovan', 'rinkeby', 'goerli']}
                            onChange={selectNetworkHandler}
                            value={network}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Header;