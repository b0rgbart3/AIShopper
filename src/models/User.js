var bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 100],
        isEmail: true
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 200],
      },
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  });

  User.associate = function (models) {

    User.belongsToMany(models.User, { through: 'Friend_Connection', as: 'Users', foreignKey: 'UserId', otherKey: 'id' });
    User.belongsToMany(models.User, { through: 'Friend_Connection', as: 'Friends', foreignKey: 'FriendId', otherKey: 'id' });

    User.hasMany(models.Search, {
      onDelete: "cascade"
    })


    User.hasMany(models.Product, {
      onDelete: "cascade"
    });

  };

  User.sync({ alter: true });


  // // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  // User.prototype.validPassword = function (password) {
  //   return bcrypt.compareSync(password, this.password);
  // };
  // // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // // In this case, before a User is created, we will automatically hash their password
  // User.addHook("beforeCreate", function (user) {
  //   user.password = bcrypt.hashSync(
  //     user.password,
  //     bcrypt.genSaltSync(10),
  //     null
  //   );
  // });
  return User;
};


/*

USE SHOPPR;
drop table Users;
create table Users(
   id INT NOT NULL AUTO_INCREMENT,
   username VARCHAR(100) NOT NULL,
   email VARCHAR(100) NOT NULL,
   password VARCHAR(200) NOT NULL,
   avatar VARCHAR(200),
   admin BOOLEAN NOT NULL,
   createdAt DATE,
   updatedAt DATE,
   PRIMARY KEY ( id )
);
*/
