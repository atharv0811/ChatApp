const { Sequelize } = require("sequelize");
const sequelize = require("../db");
const GroupMembers = sequelize.define('GroupMembers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    ContactName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        defaultValue: 'many'
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});
module.exports = GroupMembers;