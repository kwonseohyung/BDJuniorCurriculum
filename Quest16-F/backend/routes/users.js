var express = require('express');
var router = express.Router();
const models = require("../db/models");
const crypto = require("crypto");


router.post("/sign", async  (req, res) => {
 let body = req.body;

 const existsId = await models.tb_user.findOne({
   where: {
     id: body.userid,
   },
 });
 
 if (existsId) {
   // 중복아이디
   return res.status(200).json({ message: "이미 존재하는 아이디입니다." });
 } else {
   let inputPassword = body.password;
   let salt = Math.round(new Date().valueOf() * Math.random()) + "";
   //createHash: 해시 알고리즘 넘김, update: 비밀번호에 salt를 더한 값을 넘김, digest: 인코딩방식

   let hashPassword = crypto
     .createHash("sha512")
     .update(inputPassword + salt)
     .digest("hex");

   let result = await models.tb_user.create({
     id: body.userid,
     password: hashPassword,
     name: body.name,
     salt: salt,
   });

   return res.status(200).json({ message: "회원가입 성공" });
 }
});


router.post("/login", async function (req, res, next) {
  let body = req.body;

  const user = await models.tb_user.findOne({
    where: {
      id: body.userid,
    },
  });

  if (user == null) {
    return res.status(200).json({  message: "잘못된 아이디입니다." });
  }
  const user_seq = user.user_seq;

  let dbPassword = user.dataValues.password; //db에 저장된 값
  let inputPassword = body.password;
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
      const file2Data = await models.tb_file.findOne({
        where: { file_seq: data.file_seq },
        attributes: ["file", "contents"],
      });

      const memoTab = {
        title: file2Data.file,
        content: file2Data.contents,
      };

      memoTabs.push(memoTab);
    }

    return res.status(200).json({ data:memoTabs, message: "로그인 성공" });
  }
  else {
    return res.status(200).json({ message: "잘못된 비밀번호입니다." });
  }
});

router.post("/logout", async (req, res) => {
  const { userid, activityMemoTitles } = req.body;

  try {
    //1. user2 테이블에서 userid와 일치하는 사용자 찾기
    const user = await models.tb_user.findOne({
      where: {
        id: userid,
      },
    });

    const user_seq = user.user_seq;

    //activity_file테이블 해당 유저 일괄 삭제
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
    res.status(200).json({ message: "로그아웃 성공" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ message: "서버 오류" });
  }
});



module.exports = router;
 