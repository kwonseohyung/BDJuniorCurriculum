const express = require("express");
const router = express.Router();
const models = require("../models");
const crypto = require("crypto");
const activity_file = require("../models/activity_file");

router.get("/sign", function (req, res, next) {
  res.render("sign.html");
});

router.post("/sign", async function (req, res) {
  let body = req.body;

  let inputPassword = body.password;
  let salt = Math.round(new Date().valueOf() * Math.random()) + "";
  //createHash: 해시 알고리즘 넘김, update: 비밀번호에 salt를 더한 값을 넘김, digest: 인코딩방식
  let hashPassword = crypto
    .createHash("sha512")
    .update(inputPassword + salt)
    .digest("hex");
  let result = models.user.create({
    id: body.userId,
    password: hashPassword,
    name: body.userName,
    salt: salt,
  });

  res.redirect("/");
});

router.get("/login", (req, res) => {
  res.render("login.html");
});

router.post("/login", async function (req, res, next) {
  let body = req.body;

  //find: 사용자가 입력한 아이디에 해당하는 데이터 조회
  let result = await models.user.findOne({
    where: {
      id: body.userId,
    },
  });
  if (result == null) {
    return res.redirect("/user/login");
  }
  let dbPassword = result.dataValues.password; //db에 저장된 값
  let inputPassword = body.password;
  let salt = result.dataValues.salt;
  let hashPassword = crypto
    .createHash("sha512")
    .update(inputPassword + salt)
    .digest("hex");

  if (dbPassword === hashPassword) {
    console.log("비밀번호 일치");
    req.session.userId = body.userId;
    // res.redirect("/note");
    let session = req.session;
    const activity_title = await models.activity_file.findAll({
      attributes: ["activity_title"],
      where: {
        user_id: body.userId,
      },
    });
    const activity_data = activity_title.map(
      (activity) => activity.activity_title
    );
    console.log(typeof activity_data);
    console.log("activity_data: " + activity_data);
    res.render("index.html", {
      session: session,
      jsonData: JSON.stringify(activity_data),
    });
  } else {
    console.log("비밀번호 불일치");
    res.redirect("/user/login");
  }
});

module.exports = router;
