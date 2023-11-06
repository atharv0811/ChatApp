const { Sequelize } = require("sequelize");
const sequelize = require("../db");

const ArchiveChatStorage = sequelize.define('ArchiveChatStorage', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    recipeintId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    messageText: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = ArchiveChatStorage;