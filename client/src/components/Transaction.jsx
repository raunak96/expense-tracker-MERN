import React, { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";


const Transaction = ({transaction:{amount,text,_id}}) => {
    const sign= amount<0?'-':'+';
    const {removeTransaction,setError}= useContext(GlobalContext);

    const handleClick= async (e)=>{
        e.preventDefault();
        try {
            await axios.delete(`/api/transactions/${_id}`);
            removeTransaction(_id);
            toast.success("Successfully deleted the transaction!");
        } catch (error) {
            setError(error.response.data.error);
            toast.error(error.response.data.error);
        }
    }
    return (
        <>
            <ToastContainer />
            <li className={amount<0?"minus":"plus"}>
                {text} <span>{sign}<span>&#8377;</span>{(Math.abs(amount)).toLocaleString('en-IN')}</span>
                <button className="delete-btn" onClick={handleClick}>x</button>
            </li>
        </>
    );
};

export default React.memo(Transaction);