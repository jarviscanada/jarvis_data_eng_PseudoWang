const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Transaction extends Model {
}

Transaction.init(
    {
        //TODO
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'transaction'
    }
);

module.exports = Transaction;