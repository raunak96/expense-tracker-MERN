import React from "react";
import Header from "./components/Header";
import "./App.css";
import Balance from "./components/Balance";
import IncomeExpenses from "./components/IncomeExpenses";
import TransactionsList from "./components/TransactionsList";
import AddTransaction from "./components/AddTransaction";
import GlobalProvider from "./contexts/GlobalContext";
const App = () => {
    return (
        <GlobalProvider>
            <Header />
            <div className="container">
                <Balance />
                <IncomeExpenses />
                <TransactionsList />
                <AddTransaction />
            </div>
        </GlobalProvider>
    );
};

export default App;
