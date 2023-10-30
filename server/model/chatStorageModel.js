const { Sequelize } = require("sequelize");
const sequelize = require("../db");

const chatStorageDb = sequelize.define('chatStorage', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    messageText: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = chatStorageDb;