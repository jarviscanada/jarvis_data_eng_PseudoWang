const { Trader } = require('../models');

const tradersData = [
    {
        id: 1,
        first_name: 'Mike',
        last_name: 'Spencer',
        dob: '2023/01/01',
        country: 'Canada',
        email: 'mike@email.com',
        amount: 100,
    },
    {
        id: 2,
        first_name: 'Hellen',
        last_name: 'Miller',
        dob: '2023/01/01',
        country: 'USA',
        email: 'hellen@email.com',
        amount: 50,
    },
];

const seedTraders = () => Trader.bulkCreate(tradersData);

module.exports = seedTraders;