module.exports = (sequelize, DataTypes) => {
  var file = sequelize.define(
    "file",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      file: {
        type: DataTypes.STRING(30),
        // allowNull: false,
      },
      contents: {
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

  file.associate = (models) => {
    /**
     *  Users모델 안에 "user_id라는 컬럼 이름"으로 CompanyInformation모델에 있는 "id값"을 새로운 컬럼으로 추가한다.
     */
    file.belongsTo(models.user, { foreignKey: "user_id", sourceKey: "id" });
  };

  // file.associate = function (models) {
  //   file.belongsTo(User, { foreignKey: "user_id" }); // User 모델을 참조하도록 수정
  // };

  return file;
};
