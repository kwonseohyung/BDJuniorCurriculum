const memoService = require("../service/memo.service")


exports.saveAs = async (req, res) => {
  try {
    const { userid, title, content } = req.body;
    let result = await memoService.saveAs(req, res, userid, title, content);

    if (result) {
      return res.status(200).json({ message: "이미 존재하는 파일입니다." });
    } else {
      return res.status(200).json({ message: "파일 저장 성공" });
    }
    
  } catch (err) {
    res.status(500).send({ message: "서버 오류" });
  }
   
};


exports.delete =async (req, res) => {
  try {
    const { userid, title } = req.body;
    let result = await memoService.delete(req, res, userid, title);

    if (result) {
      return res.status(200).json({ message: "파일 삭제 성공" });
    } else {
      return res.status(200).json({ message: "해당 파일이 존재하지 않습니다." });
    }
    
  } catch (err) {
    res.status(500).send({ message: "서버 오류" });
  }
   
};

exports.open = async (req, res) => {
  try {
    const { userid, title } = req.body;
    let result = await memoService.open(req, res, userid, title);
    if (result) {
       return res
         .status(200)
         .json({ data: result, message: "파일 저장 성공" });
    } else {
      console.log(1);
      return res
        .status(200)
        .json({ message: "해당 파일이 존재하지 않습니다." });
    }
  } catch (err) {
    res.status(500).send({ message: "서버 오류" });
  }
};


exports.save = async (req, res) => {
  try {
    const { userid, title, content } = req.body;
    let result = await memoService.save(req, res, userid, title, content);
    if (result) {
      return res.status(200).json({ data: result, message: "파일 저장 성공" });
    } else {
      return res
        .status(200)
        .json({ message: "저장(NEW)를 먼저 해주세요." });
    }
  } catch (err) {
    res.status(500).send({ message: "서버 오류" });
  }
};
