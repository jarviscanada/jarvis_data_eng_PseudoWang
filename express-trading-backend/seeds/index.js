const sequelize = require('../config/connection');
const seedQuotes = require('./quotes-seeds');
const seedTraders = require('./traders-seeds');
const seedTransactions = require('./transactions-seeds');


const seedAll = async () => {
    console.log('--------------');
    await sequelize.sync({ force: true });
    console.log('--------------');
    await seedQuotes();
    await seedTraders();
    await seedTransactions();
    console.log('--------------');
    process.exit(0);
};

seedAll();