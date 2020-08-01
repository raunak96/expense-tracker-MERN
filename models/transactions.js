const mongoose = require('mongoose');

const TransactionSchema= new mongoose.Schema({
    text:{
        type:String,
        trim:true,
        required:[true,'Please add Some text']
    },
    amount:{
        type: Number,
        required:[true,'Please Add a positive or negative number']
    }
},
{timestamps: true}
);

module.exports=mongoose.model('Transactions',TransactionSchema);