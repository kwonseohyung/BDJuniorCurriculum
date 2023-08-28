const express = require("express");
const router = express.Router();
const models = require("../models");
const crypto = require("crypto");

var sequelize = require("../models").sequelize;
sequelize.sync();
const { user } = require("../models");

router.get("/sign", function (req, res, next) {
  res.render("sign.html");
});

router.post("/sign", async function (req, res) {
  let body = req.body;

  const existsId = await user.findOne({
    where: {
      id: req.body.userId,
    },
  });

  if (existsId) {
    // 중복아이디

    return res.status(200).send({ exists: 1 });
  } else {
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
  }
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
    res.render("index.html", {
      session: session,
      jsonData: JSON.stringify(activity_data),
    });
  } else {
    res.redirect("/user/login");
  }
});

module.exports = router;
