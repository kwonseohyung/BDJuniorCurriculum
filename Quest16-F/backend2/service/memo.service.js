const models = require("../db/models");

exports.saveAs = async (req, res, userid, title, content) => {
    try {
      const user = await models.tb_user.findOne({
        where: {
          id: userid,
        },
      });

      const user_seq = user.user_seq;

      const existsFile = await models.tb_file.findOne({
        where: {
          user_seq: user_seq,
          file: title,
        },
      });

      if (existsFile) {
        return existsFile
      } else {
        await models.tb_file.create({
          file: title,
          contents: content,
          user_seq: user_seq,
        });
        return existsFile
      }
    } catch (error) {
      console.log(error);
    }



};


exports.open = async (req, res, userid, title) => {

  try {
    const user = await models.tb_user.findOne({
      where: {
        id: userid,
      },
    });

    const user_seq = user.user_seq;

    const existsFile = await models.tb_file.findOne({
      where: {
        user_seq: user_seq,
        file: title,
      },
    });
    if (existsFile) {
      const fileData = await models.tb_file.findOne({
        attributes: ["contents"],
        where: {
          user_seq: user_seq,
          file: title,
        },
      });
      const contents = fileData.get("contents"); // 파일 내용 추출
      return contents;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};


exports.delete = async (req, res, userid, title) => {
  try {
    const { userid, title } = req.body;

    const user = await models.tb_user.findOne({
      where: {
        id: userid,
      },
    });

    const user_seq = user.user_seq;

    const existsFile = await models.tb_file.findOne({
      where: {
        user_seq: user_seq,
        file: title,
      },
    });

    if (existsFile) {
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
      
      return existsFile;
    } else {
      return existsFile;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.save= async(req, res, userid, title, content) => {
  try {
    const { userid, title, content } = req.body;

    const user = await models.tb_user.findOne({
      where: {
        id: userid,
      },
    });

    const user_seq = user.user_seq;

    const existsFile = await models.tb_file.findOne({
      where: {
        user_seq: user_seq,
        file: title,
      },
    });

    if (!existsFile) {
      return existsFile
    }

    await models.tb_file.update(
      {
        contents: content,
      },
      {
        where: {
          user_seq: user_seq,
          file: title,
        },
      }
    );
      
   return existsFile;
  } catch (error) {
    console.log(error);
  }
};