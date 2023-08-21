"use strict";
module.exports = (sequelize, DataTypes) => {
  var activity_file = sequelize.define(
    "activity_file",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      activity_title: {
        type: DataTypes.STRING(30),
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
  activity_file.associate = (models) => {
    /**
     *  Users모델 안에 "company_id라는 컬럼 이름"으로 CompanyInformation모델에 있는 "id값"을 새로운 컬럼으로 추가한다.
     */
    activity_file.belongsTo(models.user, {
      foreignKey: "user_id",
      sourceKey: "id",
    });
  };

  // user.associate = function (models) {
  //   user.belongsTo(models.File, { foreignKey: "user_id" });
  // };

  return activity_file;
};

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class activity_file extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   activity_file.init({
//     user_id: DataTypes.INTEGER,
//     user_name: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'activity_file',
//   });
//   return activity_file;
// };
