const { Trader } = require('../models');

const tradersData = [
    {
        id: 1,
        firstName: 'Mike',
        lastName: 'Spencer',
        dob: '2023/1/1',
        country: 'Canada',
        email: 'mike@email.com',
        amount: 100,
    },
    {
        id: 2,
        firstName: 'Hellen',
        lastName: 'Miller',
        dob: '2023/1/1',
        country: 'USA',
        email: 'hellen@email.com',
        amount: 50,
    },
];

const seedTraders = () => Trader.bulkCreate(tradersData);

module.exports = seedTraders;