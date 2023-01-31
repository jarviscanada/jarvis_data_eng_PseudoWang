const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Quote extends Model {
}

Quote.init(
    {
        ticker: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        lastPrice: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            field: 'last_price'
        },
        bidPrice: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            field: 'bid_price'
        },
        bidSize: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            field: 'bid_size'
        },
        askPrice: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            field: 'ask_price'
        },
        askSize: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            field: 'ask_size'
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'quote'
    }
);

module.exports = Quote;