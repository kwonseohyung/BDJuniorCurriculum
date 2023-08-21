const express = require("express");
const router = express.Router();
const models = require("../models");
const crypto = require("crypto");

// router.get("/sign_up", function (req, res, next) {
//   res.render("user/signup");
// });

router.get("/", (req, res) => {
  res.render("main.html");
});

router.get("/user/sign", (req, res) => {
  res.render("sign.html");
});

router.post("/user/sign", async function (req, res) {
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

  res.redirect("/user/sign");
});

module.exports = router;
