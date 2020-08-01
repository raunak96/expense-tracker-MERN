export const UpdateValues=(values)=>({   //updates values of balance,expense which depends on transactions
    type:'UPDATE_VALUES',
    payload:values
});

export const RemoveTransaction=(id)=>({
    type: 'REMOVE_TRANSACTION',
    payload: id
});

export const AddTransaction=(transaction)=>({
    type: 'ADD_TRANSACTION',
    payload: transaction
});

export const GetTransactions=(transactions)=>({
    type: 'GET_TRANSACTIONS',
    payload: transactions
});

export const TransactionError= (error)=>({
    type:"TRANSACTION_ERROR",
    payload: error
})