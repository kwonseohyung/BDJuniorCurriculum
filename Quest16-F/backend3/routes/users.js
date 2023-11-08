var express = require('express');
var router = express.Router();
const userController = require("../controllers/user.controllers");

router.post("/sign", userController.sign);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

module.exports = router;
 