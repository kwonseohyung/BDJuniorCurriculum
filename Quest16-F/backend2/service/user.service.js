const models = require("../db/models");
const crypto = require("crypto");

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
      return user
    }
    
    const user_seq = user.user_seq;

    let dbPassword = user.dataValues.password; //db에 저장된 값
    let inputPassword = password;
    let salt = user.dataValues.salt;
    let hashPassword = crypto
      .createHash("sha512")
      .update(inputPassword + salt)
      .digest("hex");

    if (dbPassword === hashPassword) {
      const activity_title = await models.tb_activity_file.findAll({
        attributes: ["file_seq"],
        where: {
          user_seq: user_seq,
        },
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
      return user
    }
    }
 catch (error) {
    console.log(error);
  }
};

exports.logout = async (req, res, userid, activityMemoTitles) => {
  try {
    const user = await models.tb_user.findOne({
      where: {
        id: userid,
      },
    });

    const user_seq = user.user_seq;

    const existsActFile = await models.tb_activity_file.findOne({
      where: {
        user_seq: user_seq,
      },
    });

    if (existsActFile) {
      await models.tb_activity_file.destroy({
        where: {
          user_seq: user_seq,
        },
      });
    }

    //activityfile 테이블에 insert
    for (item of activityMemoTitles) {
      // 2. file2 테이블에서 seq_user와 title이 일치하는 파일 seq_file
      let existsFile = await models.tb_file.findOne({
        where: {
          user_seq: user_seq,
          file: item,
        },
      });

      // file에서 seq_file 가져오기
      let file_seq = existsFile.file_seq;

      let activeTitle = await models.tb_file.findOne({
        where: {
          user_seq: user_seq,
          file: item,
        },
      });

      if (activeTitle) {
        // 중복된 파일이 존재하는 경우
        await models.tb_activity_file.create({
          user_seq: user_seq,
          file_seq: file_seq,
        });
      }
   }
    return user
  } catch (error) {
    console.log(error);
  }
};