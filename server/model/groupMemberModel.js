const { Sequelize } = require("sequelize");
const sequelize = require("../db");
const GroupMembers = sequelize.define('GroupMembers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        defaultValue: 'many'
    }
});
module.exports = GroupMembers;