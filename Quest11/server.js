const express = require("express");
const nunjucks = require("nunjucks");
const session = require("express-session");
const Memorystore = require("memorystore")(session);
const crypto = require("crypto");
//var sequelize = require("./models").default.sequelize;

const router = require("./routes/user");
var sequelize = require("./models").sequelize;
const app = express();
//chokidar 설치
sequelize.sync();
const fs = require("fs");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mysql = require("mysql2");
const models = require("./models/index.js");

models.sequelize
  .sync()
  .then(() => {
    console.log(" DB 연결 성공");
  })
  .catch((err) => {
    console.log("연결 실패");
    console.log(err);
  });

//module.exports = db;
//db.connect();

app.set("view engine", "html");
nunjucks.configure("./views", {
  express: app,
  watch: true,
});

let maxAge = 3 * 60 * 1000;
const sessionObj = {
  secret: "secretkey",
  resave: false,
  saveUninitialized: true,
  store: new Memorystore({ checkPeriod: maxAge }),
  cookie: {
    maxAge: maxAge,
  },
};

app.use(session(sessionObj));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("view2"));
app.use("/user", router);

app.listen(8000, function () {
  console.log("listening on 8000");
});

app.get("/", (req, res) => {
  res.render("main.html");
});

app.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.clearCookie("secretkey");

  res.redirect("/user/login");
});

const { user } = require("./models");
const { file } = require("./models");
const { activity_file } = require("./models");

app.get("/note/fileContent/:fileName", async (req, res) => {
  const { fileName } = req.params;
  const id = req.session.userId;
  console.log("fileName: " + fileName);
  try {
    const existsFile = await file.findOne({
      where: {
        user_id: `${id}`,
        file: fileName,
      },
    });

    if (existsFile) {
      // 중복된 파일이 존재
      console.log(fileName + " 중복된 파일 존재");
      console.log(0);
      const activity_contents = await file.findOne({
        attributes: ["contents"],
        where: {
          user_id: id,
          file: fileName,
        },
      });

      JSON.stringify(activity_contents);
      res.status(200).send({
        activity_contents: activity_contents.contents,
      });
    } else {
      console.log(fileName + " 존재안함");
      res.status(200);
    }
  } catch (err) {
    res.status(500).send({ message: "서버 오류" });
  }
});

app.post("/note/saveAs", async (req, res) => {
  const id = req.session.userId;
  const title = req.body.keyName;
  const contents = req.body.fileData;
  console.log("id:" + id + "  title: " + title);
  //해당 유저의 파일명 존재여부확인
  console.log(req.session);

  try {
    // 파일 존재 여부 확인
    const existsFile = await file.findOne({
      where: {
        user_id: `${id}`,
        file: `${title}`,
      },
    });

    if (existsFile) {
      // 중복된 파일이 존재
      res.status(200).send({ exists: 1 });
    } else {
      await file.create({
        file: `${title}`,
        contents: `${contents}`,
        user_id: `${id}`,
      });
      res.status(200).send({ exists: 0 });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ message: "서버 오류" });
  }
});

app.post("/note/delete", async (req, res) => {
  const id = req.session.userId;
  const title = req.body.keyName;

  try {
    // 파일 존재 여부 확인
    const existsFile = await file.findOne({
      where: {
        user_id: `${id}`,
        file: `${title}`,
      },
    });

    if (existsFile) {
      // 중복된 파일이 존재
      res.status(200).send({ exists: 1 });
    } else {
      await file.destroy({
        where: {
          user_id: `${id}`,
          file: `${title}`,
        },
      });
      res.status(200).send({ exists: 0 });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ message: "서버 오류" });
  }
});

app.post("/note/loading", async (req, res) => {
  const id = req.session.userId;
  const title = req.body.keyName;

  try {
    // 파일 존재 여부 확인
    const existsFile = await file.findOne({
      where: {
        user_id: `${id}`,
        file: `${title}`,
      },
    });

    if (existsFile) {
      // 중복된 파일이 존재
      var contents = await file.findOne({
        attributes: ["contents"],
        where: {
          user_id: id,
          file: title,
        },
      });
      contents = contents.get("contents");
      console.log("co: " + contents);
      res.status(200).send({ exists: 1, contents: contents });
    } else {
      res.status(200).send({ exists: 0 });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ message: "서버 오류" });
  }
});

app.post("/note/saving", async (req, res) => {
  const id = req.session.userId;
  const title = req.body.keyName;
  const contents = req.body.fileData;

  try {
    // 파일 존재 여부 확인
    const existsFile = await file.findOne({
      where: {
        user_id: `${id}`,
        file: `${title}`,
      },
    });

    if (existsFile) {
      // 중복된 파일이 존재
      await file.update(
        {
          contents: `${contents}`,
        },
        {
          where: {
            user_id: `${id}`,
            file: `${title}`,
          },
        }
      );
      console.log("co: " + contents);
      res.status(200).send({ exists: 1, contents: contents });
    } else {
      res.status(200).send({ exists: 0 });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ message: "서버 오류" });
  }
});

app.post("/logout", async (req, res) => {
  const id = req.session.userId;
  const tabData = req.body.tabData;

  try {
    // 파일 존재 여부 확인
    const existsFile = await activity_file.findOne({
      where: {
        user_id: `${id}`,
      },
    });

    if (existsFile) {
      // 중복된 파일이 존재
      console.log("Dd");
      await activity_file.destroy({
        where: {
          user_id: `${id}`,
        },
      });
    }

    for (item of tabData) {
      const existsTitle = await file.findOne({
        where: {
          user_id: `${id}`,
          file: `${item}`,
        },
      });

      if (existsTitle) {
        // 중복된 파일이 존재하는 경우
        await activity_file.create({
          user_id: `${id}`,
          activity_title: `${item}`,
        });
      }
    }

    req.session.destroy(function (err) {
      if (err) {
        console.error("세션 삭제 실패:", err);
        res.status(500).json({ message: "세션 삭제 실패" });
      } else {
        console.log("세션 삭제 완료 및 이동");
        console.log(req.session);
        //res.redirect("/");
        res.end();
      }
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ message: "서버 오류" });
  }
});
