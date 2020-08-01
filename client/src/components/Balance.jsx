import React, { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

const Balance = () => {
    const {balance}= useContext(GlobalContext);
    const sign= balance===0?'':balance>0?'+':'-';
    return (
        <>
            <h4 style={{textAlign:'center'}}>Your Balance</h4>
            <h1 style={{textAlign:'center'}} className={balance<0?"minus":"plus"}>{sign}<span>&#8377;</span>{(Math.abs(balance)).toLocaleString('en-IN')}</h1>
        </>
    );
};

export default Balance;