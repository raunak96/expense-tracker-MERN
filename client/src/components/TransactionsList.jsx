import React, { useContext, useEffect, Fragment } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import Transaction from "./Transaction";
import Spinner from "./LoaderSpinner";

const TransactionsList = () => {

    const {transactions,getTransactions,isLoading}= useContext(GlobalContext);
    useEffect(() => {
        getTransactions();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <Fragment>
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
