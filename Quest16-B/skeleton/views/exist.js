const models = require("../models/index.js");
const { file } = require("../models");

async function existsFile(id, title) {
  try {
    console.log("파일존재여부 확인");
    const existsFile = await file.findOne({
      where: {
        user_id: id,
        file: title,
      },
    });
    return existsFile;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("파일 존재 여부 확인 중 오류 발생");
  }
}

module.exports = { existsFile };
