import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";
import {
    UpdateValues,
    RemoveTransaction,
    AddTransaction,
    GetTransactions,
    TransactionError,
} from "./actions";

const INITIAL_STATE = {
    transactions: [],
    balance: 0,
    income: 0,
    expense: 0,
    error: undefined,
    isLoading: true,
    removeTransaction: () => {},
    addTransaction: () => {},
    getTransactions: () => {},
    setError:  () => {},
};

export const GlobalContext = createContext(INITIAL_STATE);

const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE);
    const { transactions, balance, income, expense, error, isLoading } = state;

    const removeTransaction = (id) =>dispatch(RemoveTransaction(id));
        
    const addTransaction =  (transaction) => dispatch(AddTransaction(transaction));

    const getTransactions =  (transactions) => dispatch(GetTransactions(transactions));
       
    const setError = (error) => dispatch(TransactionError(error));

    useEffect(() => {
        const newBalance = transactions
            .reduce((total, transaction) => (total += transaction.amount), 0)
            .toFixed(2);
        const newExpense = transactions
            .filter((transaction) => transaction.amount < 0)
            .reduce((total, transaction) => (total += transaction.amount), 0);
        const newIncome = transactions
            .filter((transaction) => transaction.amount > 0)
            .reduce((total, transaction) => (total += transaction.amount), 0);

        dispatch(
            UpdateValues({
                balance: +newBalance,
                expense: +newExpense,
                income: +newIncome,  // + converts string to number
            })
        );
    }, [transactions]);

    return (
        <GlobalContext.Provider
            value={{
                transactions,
                balance,
                income,
                expense,
                removeTransaction,
                addTransaction,
                error,
                isLoading,
                getTransactions,
                setError
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
