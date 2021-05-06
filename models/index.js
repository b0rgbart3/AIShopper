"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];
var db = {};

console.log("env: ", env);

async function testConnection(sequelize) {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  
}



if (config.use_env_variable) {
  console.log("Production.");
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  console.log("In Development: ", config.database, config.username, config.password, config);
  
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

testConnection(sequelize);


// fs
//   .readdirSync(__dirname)
//   .filter(function(file) {
//     return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
//   })
//   .forEach(function(file) {
//     console.log("Filename: ",file);

    
//     // THIS IS THE OLD WAY OF IMPORTING INTO SEQUELIZE
//    //var model = sequelize["import"](path.join(__dirname, file));

//     // THIS IS THE NEW WAY
//     var model = require(path.join(__dirname, file));
//     let modelName = file.split('.')[0];
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(function(modelName) {
//   console.log("model: ", modelName);
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;


var Search = sequelize.define("Search", {
  image_url: {
    type: DataTypes.STRING   
  },
  image_blob: {
    type: DataTypes.BLOB("long") 
  }
});


Search.associate = function(models) {

    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Search.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    Search.hasMany(models.Item, {
        onDelete: "cascade"
    })
  
};

module.exports = db;
