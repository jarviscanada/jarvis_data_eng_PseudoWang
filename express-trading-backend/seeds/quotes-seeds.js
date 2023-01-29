const { Quote } = require('../models');

const quoteData = [
    {
        ticker: 'MEOW',
        lastPrice: 12.2,
        bidPrice: 12.3,
        bidSize: 20,
        askPrice: 12.1,
        askSize: 15
    },
    {
        ticker: 'WOOF',
        lastPrice: 2.3,
        bidPrice: 14,
        bidSize: 4,
        askPrice: 12,
        askSize: 6
    },
];

const seedQuotes = () => Quote.bulkCreate(quoteData);

module.exports = seedQuotes;