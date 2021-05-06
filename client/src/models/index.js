"use strict";

// var fs = require("fs");
// var path = require("path");
// var basename = path.basename(module.filename);
//var config = require(__dirname + "/../config/config.json")[env];
var db = {};
const { Sequelize, DataTypes } = require('sequelize');
import User from './User.js';
import Search from './Search.js';
import Item from './Item.js';
import Product from './Product.js';
import Friend_Connection from './Friend_Connection.js';

// Get the Environment Variables 
const env_variables = process.env;
const env = process.env.NODE_ENV || "development";
// console.log(env_variables);
console.log("The NODE Environment: ", env);

const DB_NAME = env_variables['SHOPPR_LOCAL_DB'];
const DB_USER = env_variables['SHOPPR_LOCAL_DB_USER'];
const DB_PASS = env_variables['SHOPPR_LOCAL_PASS'];

// Create the DB Connection
console.log("Creating Sequelize Connection using: ");
console.log("DB_NAME: ", DB_NAME);
console.log("DB_USER: ", DB_USER);
console.log("DB_PASS: ", DB_PASS);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: 'localhost',
    dialect: 'mysql' 
  });

async function connectToDB() {
    try {
        await sequelize.authenticate();
        console.log('Sequelize Connection to the DB has been established successfully.');
      } catch (error) {
        console.error('Sequelize Unable to connect to the database:', error);
      }  finally {

        const models = {
            User: User(sequelize, DataTypes),
            Search: Search(sequelize, DataTypes),
            Item: Item(sequelize, DataTypes),
            Product: Product(sequelize, DataTypes),
            Friend_Connection: Friend_Connection(sequelize, DataTypes),
        }

        db.User = models.User;
        db.Search= models.Search;
        db.Item = models.Item;
        db.Product = models.Product;
        db.Friend_Connection = models.Friend_Connection;
        db.sequelize = sequelize;   // this is a reference to our sequelize connection instance
        db.Sequelize = Sequelize;   // this is a reference to the Sequelize base code Library
        console.log("Finished creating the db models.");
       // db.sequelize.sync({ force: true });
      }
}

connectToDB();


module.exports = db;
