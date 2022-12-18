const Sequelize = require('sequelize');
const sequelize = new Sequelize('node_by_zuber', 'root', 'Zuber@786', { 
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;


