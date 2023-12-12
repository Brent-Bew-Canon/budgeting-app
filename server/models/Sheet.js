const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Sheet extends Model { }

Sheet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // include bookId foreign key to associate sheet with a book
        book_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'book',
                key: 'id',
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        grand_total: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        categories: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: true,
            defaultValue: []
        },
        // transactions will be an array of objects that have a transaction name, amount, and category
        transactions: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: true,
            defaultValue: []
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'sheet',
    }
);

module.exports = Sheet;

