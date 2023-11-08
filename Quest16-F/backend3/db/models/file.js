module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define(
    "tb_file",
    {
      file_seq: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      file: {
        type: DataTypes.STRING(30),
      },
      contents: {
        type: DataTypes.STRING(250),
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: "tb_file",
    }
  );

  File.associate = (models) => {
    File.hasMany(models.tb_user_file, {
      foreignKey: "file_seq",
    });
  };

  return File;
};
