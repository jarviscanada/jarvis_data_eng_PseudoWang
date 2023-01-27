const { Transaction } = require('../models');

const transactionData = [
    {
        id: 1,
        amount: 300,
        trader_id: 1
    },
    {
        id: 2,
        amount: -300,
        trader_id: 1
    }
];

const seedTransactions = () => Transaction.bulkCreate(transactionData);

module.exports = seedTransactions;