import React, { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

const Transaction = ({transaction:{amount,text,_id}}) => {
    const sign= amount<0?'-':'+';
    const {removeTransaction}= useContext(GlobalContext);
    return (
        <>
            <li className={amount<0?"minus":"plus"}>
                {text} <span>{sign}<span>&#8377;</span>{(Math.abs(amount)).toLocaleString('en-IN')}</span>
                <button className="delete-btn" onClick={()=>removeTransaction(_id)}>x</button>
            </li>
        </>
    );
};

export default Transaction;