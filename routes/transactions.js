const { getTransactions, addTransaction, removeTransaction } = require('../controllers/transactions');

const router = require('express').Router();


router.route("/")
.get(getTransactions)
.post(addTransaction);

router.route("/:id")
.delete(removeTransaction);

module.exports = router;