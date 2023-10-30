module.exports = (sequelize, DataTypes) => {
  const ActivityFile = sequelize.define(
    "tb_activity_file",
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
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: "tb_activity_file",
    }
  );
  

  ActivityFile.associate = (models) => {
    ActivityFile.belongsTo(models.tb_user, {
      foreignKey: "user_seq",
    });
    ActivityFile.belongsTo(models.tb_file, {
      foreignKey: "file_seq",
    });
  };

  return ActivityFile;
};
