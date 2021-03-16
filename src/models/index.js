"use strict";

var fs = require("fs");
var path = require("path");
var basename = path.basename(module.filename);
//var config = require(__dirname + "/../config/config.json")[env];
var db = {};
const { Sequelize } = require('sequelize');

// Get the Environment Variables 
const env_variables = process.env;
const env = process.env.NODE_ENV || "development";
//console.log(env_variables);
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

        fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
  })
  .forEach(function(file) {
    console.log("Filename: ",file);

    
    // THIS IS THE OLD WAY OF IMPORTING INTO SEQUELIZE
   //var model = sequelize["import"](path.join(__dirname, file));

    // THIS IS THE NEW WAY
    var model = require(path.join(__dirname, file));
    let modelName = file.split('.')[0];
    db[modelName] = model;
  });

// Object.keys(db).forEach(function(modelName) {
//   console.log("model: ", modelName);
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;   // this is a reference to our sequelize connection instance
db.Sequelize = Sequelize;   // this is a reference to the Sequelize base code Library

      }
}

connectToDB();





module.exports = db;
