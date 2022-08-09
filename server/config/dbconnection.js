const Sequelize = require('sequelize');

const sequelize = new Sequelize('clinica_dental', 'root', 'DEVASUS..97ee', {
    host: 'localhost',
    dialect: "mysql",
    operatorAliases: false,
    timezone: "America/Guatemala"
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
