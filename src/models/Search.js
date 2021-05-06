
module.exports = function(sequelize, DataTypes) {
    var Search = sequelize.define("Search", {
      image_url: {
        type: DataTypes.STRING(300)  
      },
      // image_blob: {
      //   type: DataTypes.BLOB("long") 
      // },
      userId: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      }
    });
  
  
      // Search.associate = function(models) {
  
      //     // We're saying that a Post should belong to an Author
      //     // A Post can't be created without an Author due to the foreign key constraint
      //     Search.belongsTo(models.User, {
      //       foreignKey: {
      //         allowNull: false
      //       }
      //     });
  
      //     Search.hasMany(models.Item, {
      //         onDelete: "cascade"
      //     })
        
      // };
  
  
  return Search;
  
  };
  
  