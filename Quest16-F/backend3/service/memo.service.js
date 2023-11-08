const models = require("../db/models");
const Sequelize = require("sequelize");
const { findUserSeq, findFileSeq, findFileData } = require("./utils");

exports.memoData = async (req, res, userid) => {
  try {
    console.log("userid" + userid);
    const user = await models.tb_user.findOne({
      where: {
        id: userid,
      },
    });

    const activity_title = await models.tb_user_file.findAll({
      attributes: ["file_seq"],
      where: {
        user_seq: userid,
        act_yn: "Y",
      },
      order: [["act_ord", "ASC"]],
    });
    const memoTabs = [];

    for (const data of activity_title) {
      // 각 seq_file에 해당하는 file 및 content 가져오기
      const fileData = await models.tb_file.findOne({
        where: { file_seq: data.file_seq },
        attributes: ["file", "contents"],
      });

      const memoTab = {
        title: fileData.file,
        content: fileData.contents,
      };

      memoTabs.push(memoTab);
    }
    console.log(memoTabs);
    console.log(memoTabs[0]);
    return memoTabs;
  } catch (error) {
    console.log(error);
  }
};

exports.saveAs = async (req, res, userid, title, content) => {
  try {
    //사용자seq찾기
    const user_seq = await findUserSeq(userid);
    // 파일명에 해당하는 파일seq찾기
    const fileSeqArray = await findFileSeq(title);
    //해당사용자seq&& 파일seq 찾기 -> 즉, 이미 존재하는 파일인지 찾기
    const existsFile = await findFileData(user_seq, fileSeqArray);

    if (existsFile) {
      return existsFile;
    } else {
      const file = await models.tb_file.create({
        file: title,
        contents: content,
      });

      const file_seq = file.file_seq;
      await models.tb_user_file.create({
        user_seq: user_seq,
        file_seq: file_seq,
      });
      return existsFile;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.open = async (req, res, userid, title) => {
  try {
    const user_seq = await findUserSeq(userid);
    const fileSeqArray = await findFileSeq(title);
    const existsFile = await findFileData(user_seq, fileSeqArray);

    if (existsFile) {
      const file_seq = existsFile.file_seq;
      const fileData = await models.tb_file.findOne({
        attributes: ["contents"],
        where: {
          file_seq: file_seq,
          file: title,
        },
      });
      const contents = fileData.get("contents");
      console.log("contents: " + contents);
      return contents;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res, userid, title) => {
  try {
    const user_seq = await findUserSeq(userid);
    const fileSeqArray = await findFileSeq(title);
    const existsFile = await findFileData(user_seq, fileSeqArray);

    if (existsFile) {
      const file_seq = existsFile.file_seq;
      await models.tb_user_file.destroy({
        where: {
          user_seq: user_seq,
          file_seq: file_seq,
        },
      });
      await models.tb_file.destroy({
        where: {
          file_seq: file_seq,
        },
      });

      return existsFile;
    } else {
      return existsFile;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.save = async (req, res, userid, title, content) => {
  try {
    const user_seq = await findUserSeq(userid);
    const fileSeqArray = await findFileSeq(title);
    const existsFile = await findFileData(user_seq, fileSeqArray);

    if (!existsFile) {
      return existsFile;
    } else {
      const file_seq = existsFile.file_seq;
      await models.tb_file.update(
        {
          contents: content,
        },
        {
          where: {
            file_seq: file_seq,
          },
        }
      );
      return existsFile;
    }
  } catch (error) {
    console.log(error);
  }
};
