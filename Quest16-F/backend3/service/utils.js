const models = require("../db/models");
const Sequelize = require("sequelize");

async function findUserSeq(userid) {
  const user = await models.tb_user.findOne({
    where: {
      id: userid,
    },
  });

  const user_seq = user.user_seq;
  return user_seq;
}

async function findFileSeq(title) {
  const files = await models.tb_file.findAll({
    where: {
      file: title,
    },
    attributes: ["file_seq"],
  });

  const fileSeqArray = files.map((file) => file.file_seq);
  return fileSeqArray;
}

async function findFileData(user_seq, fileSeqArray) {
  const existsFile = await models.tb_user_file.findOne({
    where: {
      user_seq: user_seq,
      file_seq: {
        [Sequelize.Op.in]: fileSeqArray,
      },
    },
  });
  if (existsFile) {
    return existsFile;
  } else {
    return;
  }
}

module.exports = {
  findUserSeq,
  findFileSeq,
  findFileData,
};
