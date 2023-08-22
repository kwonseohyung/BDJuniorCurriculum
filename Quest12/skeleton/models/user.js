"use strict";
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      salt: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        },
      },
    }
  );
  user.associate = (models) => {
    /**
     * user안에 있는 "id값"을 "user_id라는 컬럼 이름"으로 file모델에 새로운 컬럼으로 추가한다.
     */
    user.hasMany(models.file, {
      foreignKey: "user_id",
      sourceKey: "id",
    });
    user.hasMany(models.activity_file, {
      foreignKey: "user_id",
      sourceKey: "id",
    });
  };

  // user.associate = function (models) {
  //   user.belongsTo(models.File, { foreignKey: "user_id" });
  // };

  return user;
};
/*
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
    
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      id: DataTypes.STRING(10),
      password: DataTypes.STRING(10),
      name: DataTypes.STRING(10),
      salt: DataTypes.STRING,
    },
    {
      timestamps: false,
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
*/
