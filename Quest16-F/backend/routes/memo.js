var express = require('express');
var router = express.Router();
const models = require("../db/models");

router.post("/saveAs", async (req, res) => {  
  try {
    const { userid, title, content } = req.body;

    //1. user2 테이블에서 userid와 일치하는 사용자 찾기
    const user = await models.tb_user.findOne({
      where: {
        id: userid,
      }
    });

    // user에서 seq_user 가져오기
    const user_seq = user.user_seq;

    // 2. file2 테이블에서 seq_user와 title이 일치하는 파일이 이미 존재하는지 확인
    const existsFile = await models.tb_file.findOne({
      where: {
        user_seq: user_seq,
        file: title,
      },
    });

    if (existsFile) {
      // 중복 파일이 존재
      return res.status(200).json({ message: "이미 존재하는 파일입니다." });
    } else {
      // 3. 중복 파일이 없으면 file2 테이블에 새로운 파일 추가
      await models.tb_file.create({
        file: title,
        contents: content,
        user_seq: user_seq,
      });
      return res.status(200).json({ message: "파일 저장 성공" });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ message: "서버 오류" });
   }
   
});

router.post("/delete", async (req, res) => {
  try {
    const { userid, title } = req.body;

    //1. user2 테이블에서 userid와 일치하는 사용자 찾기
    const user = await models.tb_user.findOne({
      where: {
        id: userid,
      },
    });

    // user에서 seq_user 가져오기
    const user_seq = user.user_seq;

    // 2. file2 테이블에서 seq_user와 title이 일치하는 파일이 이미 존재하는지 확인
    const existsFile = await models.tb_file.findOne({
      where: {
        user_seq: user_seq,
        file: title,
      },
    });

    if (existsFile) {
      // 3. 중복 파일이 존재 삭제
      const file_seq = existsFile.file_seq;
      await models.tb_activity_file.destroy({
        where: {
          user_seq: user_seq,
          file_seq: file_seq,
        },
      });
      await models.tb_file.destroy({
        where: {
          user_seq: user_seq,
          file: title,
        },
      });
      return res.status(200).json({ message: "파일 삭제 성공" });
    } else {
      // 4. 파일 존재하지 않음
      return res.status(200).json({ message: "해당 파일이 존재하지 않습니다." });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ message: "서버 오류" });
  }
});

router.post("/open", async (req, res) => {
  try {
    const { userid, title } = req.body;

    //1. user2 테이블에서 userid와 일치하는 사용자 찾기
    const user = await models.tb_user.findOne({
      where: {
        id: userid,
      },
    });

    // user에서 seq_user 가져오기
    const user_seq = user.user_seq;
    // 2. file2 테이블에서 seq_user와 title이 일치하는 파일이 이미 존재하는지 확인
    const existsFile = await models.tb_file.findOne({
      where: {
        user_seq: user_seq,
        file: title,
      },
    });

    if (existsFile) {
      // 3. 중복 파일이 존재, 데이터 프론트엔드에 보내기
      const fileData = await models.tb_file.findOne({
        attributes: ["contents"],
        where: {
          user_seq: user_seq,
          file: title,
        },
      });
      const contents = fileData.get("contents"); // 파일 내용 추출

      return res.status(200).json({ data: contents, message: "파일 로딩 성공" });
    } else {
      // 4. 파일 존재하지 않음
      return res.status(200).send({ exists: 0, message: "해당 파일이 존재하지 않습니다." });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ message: "서버 오류" });
  }
});


module.exports = router;
 