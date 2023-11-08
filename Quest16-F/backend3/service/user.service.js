const models = require("../db/models");
const crypto = require("crypto");
const { findUserSeq, findFileSeq, findFileData } = require("./utils");
const Sequelize = require("sequelize");

exports.sign = async (req, res, userid, password, name) => {
  try {
    const existsId = await models.tb_user.findOne({
      where: {
        id: userid,
      },
    });

    if (existsId) {
      return existsId.id;
    } else {
      let inputPassword = password;
      let salt = Math.round(new Date().valueOf() * Math.random()) + "";
      //createHash: 해시 알고리즘 넘김, update: 비밀번호에 salt를 더한 값을 넘김, digest: 인코딩방식

      let hashPassword = crypto
        .createHash("sha512")
        .update(inputPassword + salt)
        .digest("hex");

      let result = await models.tb_user.create({
        id: userid,
        password: hashPassword,
        name: name,
        salt: salt,
      });

      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res, userid, password) => {
  try {
    const user = await models.tb_user.findOne({
      where: {
        id: userid,
      },
    });

    if (user == null) {
      return user;
    }

    let dbPassword = user.dataValues.password; //db에 저장된 값
    let inputPassword = password;
    let salt = user.dataValues.salt;
    let hashPassword = crypto
      .createHash("sha512")
      .update(inputPassword + salt)
      .digest("hex");

    if (dbPassword === hashPassword) {
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

      return memoTabs;
    } else {
      return user;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.logout = async (req, res, userid, activityMemoTitles) => {
  try {
    const user_seq = await findUserSeq(userid);
    //해당 유저에 해당하는 act_yn은 N으로 초기화
    await models.tb_user_file.update(
      {
        act_yn: "N",
        act_ord: null,
      },
      {
        where: {
          user_seq: user_seq,
        },
      }
    );

    let newActOrd = 1;

    for (item of activityMemoTitles) {
      const fileSeqArray = await findFileSeq(item);
      const existsFile = await findFileData(user_seq, fileSeqArray);

      if (existsFile) {
        const file_seq = existsFile.file_seq;
        await models.tb_user_file.update(
          {
            act_yn: "Y",
            act_ord: newActOrd,
          },
          {
            where: {
              user_seq: user_seq,
              file_seq: file_seq,
            },
          }
        );
        newActOrd = newActOrd + 1;
      }
    }
    return user_seq;
  } catch (error) {
    console.log(error);
  }
};
