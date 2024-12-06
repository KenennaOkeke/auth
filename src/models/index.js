const { Sequelize } = require("sequelize");
const  DataTypes = require("sequelize").DataTypes;
const config = require("../config");

const db = {}

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: 'postgres'
});

db['User'] = require('./User')(sequelize, DataTypes)

db['sequelize'] = sequelize

module.exports = db