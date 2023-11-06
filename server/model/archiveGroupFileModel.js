const { Sequelize } = require("sequelize");
const sequelize = require("../db");

const ArchiveGroupFileModel = sequelize.define('ArchiveGroupFileModel', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    senderId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fileName: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    fileUrl: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = ArchiveGroupFileModel;