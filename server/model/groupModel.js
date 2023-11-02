const { Sequelize } = require("sequelize");
const sequelize = require("../db");
const GroupName = sequelize.define('GroupName', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    GroupName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
module.exports = GroupName;