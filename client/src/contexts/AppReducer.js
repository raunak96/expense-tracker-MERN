export default (state,action)=>{
    switch (action.type) {
        case "GET_TRANSACTIONS":
            return {
                ...state,
                transactions: action.payload,
                isLoading: false
            };
        case "UPDATE_VALUES":
            return {
                ...state,
                ...action.payload,
            };
        case "REMOVE_TRANSACTION":
            return {
                ...state,
                transactions: state.transactions.filter(
                    (transaction) => transaction._id !== action.payload
                ),
                error:undefined
            };
        case "ADD_TRANSACTION":
            return {
                ...state,
                transactions: [...state.transactions, action.payload],
                error: undefined
            };
        case "TRANSACTION_ERROR":
            return { ...state,error:action.payload, isLoading: false }

        default:
            return state;
    }
}