import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";
import {
    UpdateValues,
    RemoveTransaction,
    AddTransaction,
    GetTransactions,
    TransactionError,
} from "./actions";
import axios from "axios";

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
};

export const GlobalContext = createContext(INITIAL_STATE);

const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE);
    const { transactions, balance, income, expense, error, isLoading } = state;

    const removeTransaction = async (id) => {
        try {
            await axios.delete(`/api/transactions/${id}`);
            dispatch(RemoveTransaction(id));
        } catch (error) {
            dispatch(TransactionError(error.response.data.error));
        }
    };

    const addTransaction = async (transaction) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.post("/api/transactions",transaction,config);
            dispatch(AddTransaction(res.data.data));
        } catch (error) {
            dispatch(TransactionError(error.response.data.error));
        }
    };

    const getTransactions = async () => {
        try {
            const res = await axios.get("/api/transactions");
            dispatch(GetTransactions(res.data.data));
        } catch (error) {
            dispatch(TransactionError(error.response.data.error));
        }
    };

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
                income: +newIncome,
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
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
