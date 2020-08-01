const Transactions = require("../models/transactions");

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transactions.find();
        return res.status(200).json({ data: transactions });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.addTransaction = async (req, res) => {
    try {
        const { amount, text } = req.body;
        const newTransaction = await Transactions.create({ amount, text });
        return res.status(201).json({
            data: newTransaction,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(
                (err) => err.message
            );
            return res.status(422).json({ error: messages[0] });
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
};
exports.removeTransaction = async (req, res) => {
    try {
        const transaction = await Transactions.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({
                error: "No transaction found",
            });
        }
        await transaction.remove();
        return res.status(200).json({ data: {} });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
