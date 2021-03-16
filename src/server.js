import express from 'express';

const app = express();
const { Sequelize } = require('sequelize');

// Get the Environment Variables 
const env_variables = process.env;
console.log(env_variables);

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
      }
    
}

connectToDB();


app.get('/hello', (req, res) => res.send('hello'));

app.listen(8000, () => console.log('Listening on port 8000'));


