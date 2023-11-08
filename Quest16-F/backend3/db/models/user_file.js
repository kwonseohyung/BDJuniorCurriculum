module.exports = (sequelize, DataTypes) => {
  const UserFile = sequelize.define(
    "tb_user_file",
    {
      act_seq: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_seq: {
        type: DataTypes.INTEGER,
      },
      file_seq: {
        type: DataTypes.INTEGER,
      },
      act_yn: {
        type: DataTypes.CHAR(1),
        defaultValue: "N",
      },
      act_ord: {
        type: DataTypes.INTEGER,
      },
    },

    {
      underscored: true,
      freezeTableName: true,
      tableName: "tb_user_file",
    }
  );

  UserFile.associate = (models) => {
    UserFile.belongsTo(models.tb_user, {
      foreignKey: "user_seq",
    });
    UserFile.belongsTo(models.tb_file, {
      foreignKey: "file_seq",
    });
  };

  return UserFile;
};
