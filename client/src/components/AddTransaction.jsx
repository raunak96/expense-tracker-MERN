import React, { useState, useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

const AddTransaction = () => {

    const [inputs,setInputs]= useState({amount:0,text:''});

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setInputs({...inputs,[name]:value});
    }
    const {addTransaction}= useContext(GlobalContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(inputs.text==='' || inputs.amount===0)
            return;
        const newTransaction = {
            amount: parseFloat(inputs.amount),
            text: inputs.text
        };
        addTransaction(newTransaction);
        setInputs({ amount: 0, text: "" });
    };

    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" placeholder="Enter text..." required name="text" value={inputs.text} onChange={handleChange} />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">
                        Amount <br />
                        (negative - expense, positive - income)
                    </label>
                    <input
                        type="number"
                        placeholder="Enter amount..."
                        name="amount"
                        value={inputs.amount}
                        onChange={handleChange}
                        step="100"
                    />
                </div>
                <button className="btn" >Add transaction</button>
            </form>
        </>
    );
};

export default AddTransaction;