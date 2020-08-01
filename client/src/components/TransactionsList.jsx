import React, { useContext, useEffect, Fragment } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import Transaction from "./Transaction";
import Spinner from "./LoaderSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";

const TransactionsList = () => {

    const {transactions,getTransactions,isLoading,setError}= useContext(GlobalContext);
    useEffect(() => {
        const getData=async()=>{
            try {
                const res = await axios.get("/api/transactions");
                getTransactions(res.data.data);
            } catch (error) {
                setError(error.response.data.error);
                toast.error("Could not get transactions from db..Try refreshing!");
            }
        }
        getData();

         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <ToastContainer />
                    <h3>History</h3>
                    <ul className="list">
                        {transactions.map((transaction) => (
                            <Transaction
                                key={transaction._id}
                                transaction={transaction}
                            />
                        ))}
                    </ul>
                </Fragment>
            )}
        </>
    );
};

export default TransactionsList;
