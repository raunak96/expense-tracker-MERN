import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

const IncomeExpenses = () => {
    const {expense,income}= useContext(GlobalContext);
    return (
        <div className="inc-exp-container">
            <div>
                <h4>&#8593;&nbsp;Income</h4>
                <p className="money plus">
                    <span>&#8377;</span>
                    {income.toLocaleString('en-IN')}
                </p>
            </div>
            <div>
                <h4>&#8595;&nbsp;Expense</h4>
                <p className="money minus">
                    <span>&#8377;</span>
                    {(Math.abs(expense)).toLocaleString('en-IN')}
                </p>
            </div>
        </div>
    );
};

export default IncomeExpenses;
