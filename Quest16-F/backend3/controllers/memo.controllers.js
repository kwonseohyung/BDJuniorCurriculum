const memoService = require("../service/memo.service");

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

exports.memoData = async (req, res) => {
  console.log("memoData 도착");
  try {
    const { userid } = req.body;
    console.log("con: " + userid);
    let result = await memoService.memoData(req, res, userid);
    if (result) {
      return res.status(200).json({ data: result, message: "메모데이터" });
    }
  } catch (err) {
    return res.status(500).send({ message: "서버 오류" });
  }
};
exports.delete = async (req, res) => {
  try {
    const { userid, title } = req.body;
    let result = await memoService.delete(req, res, userid, title);

    if (result) {
      return res.status(200).json({ message: "파일 삭제 성공" });
    } else {
      return res
        .status(200)
        .json({ message: "해당 파일이 존재하지 않습니다." });
    }
  } catch (err) {
    res.status(500).send({ message: "서버 오류" });
  }
};

exports.open = async (req, res) => {
  console.log("open");
  try {
    const { userid, title } = req.body;
    let result = await memoService.open(req, res, userid, title);
    if (result) {
      console.log("result존재");
      return res.status(200).json({ data: result, message: "파일 로딩 성공" });
    } else {
      console.log("result없음");
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
      return res.status(200).json({ message: "저장(NEW)를 먼저 해주세요." });
    }
  } catch (err) {
    res.status(500).send({ message: "서버 오류" });
  }
};
