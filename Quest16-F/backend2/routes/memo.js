var express = require('express');
var router = express.Router();
const memoController = require("../controllers/memo.controllers");

router.post("/open", memoController.open);
router.post("/saveAs", memoController.saveAs);
router.post("/delete", memoController.delete);
router.post("/save", memoController.save);

module.exports = router;
 