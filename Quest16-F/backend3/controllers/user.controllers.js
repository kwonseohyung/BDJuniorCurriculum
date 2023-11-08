const userService = require("../service/user.service");

exports.sign = async (req, res) => {
  try {
    const { userid, password, name } = req.body;
    // if (userid == undefined) {
    //   return res.status(200).json({ message: "아이디를 입력해주세요." });
    // }
    let result = await userService.sign(req, res, userid, password, name);

    if (result == userid) {
      return res.status(200).json({ message: "이미 존재하는 아이디입니다." });
    } else {
      return res.status(200).json({ message: "회원가입 성공" });
    }
  } catch (err) {
    res.status(500).send({ message: "서버 오류" });
  }
};

exports.login = async (req, res) => {
  try {
    const { userid, password } = req.body;
    let result = await userService.login(req, res, userid, password);
    if (result == null) {
      return res
        .status(200)
        .json({ message: "해당 아이디가 존재하지 않습니다." });
    }
    if (result.id == userid) {
      return res.status(200).json({ message: "잘못된 비밀번호입니다." });
    }
    if (result) {
      return res.status(200).json({ data: result, message: "로그인 성공" });
    }
  } catch (err) {
    return res.status(500).send({ message: "서버 오류" });
  }
};

exports.logout = async (req, res) => {
  try {
    const { userid, activityMemoTitles } = req.body;
    let result = await userService.logout(req, res, userid, activityMemoTitles);
    if (result) {
      res.status(200).json({ message: "로그아웃 성공" });
    }
  } catch (err) {
    res.status(500).send({ message: "서버 오류" });
  }
};
