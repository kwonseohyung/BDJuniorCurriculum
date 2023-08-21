const express = require("express");
const nunjucks = require("nunjucks");
const session = require("express-session");
const Memorystore = require("memorystore")(session);
const app = express();
//chokidar 설치
const jwt = require("jsonwebtoken");

const fs = require("fs");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "html");
nunjucks.configure("./views", {
  express: app,
  watch: true,
});

let maxAge = 30 * 60 * 1000;
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

let user = [
  { userid: "a", userpw: "aa", username: "ki" },
  { userid: "2", userpw: "2", username: "가" },
  { userid: "test", userpw: "testpw", username: "테스트용" },
];

app.listen(8000, function () {
  console.log("listening on 8000");
});

app.get("/", (req, res) => {
  let { user } = req.session;
  res.render("login.html", {
    user,
  });
});

app.post("/login", (req, res) => {
  const { userid, userpw } = req.body;

  const [data] = user.filter((v) => v.userid === userid && v.userpw === userpw);

  if (data != undefined) {
    req.session.user = { ...data };
    res.redirect("/note");
  } else {
    res.send("아이디와 패스워드가 없습니다.");
  }
});

app.get("/note", (req, res) => {
  console.log("Df: " + req.body.userid);
  fs.readFile(
    `./file/${req.session.user.userid}/data.json`,
    "utf8",
    (err, data) => {
      if (err) {
        res.render("index.html");
      } else {
        const json = JSON.parse(data);
        if (json.activityFile == "") {
          res.render("index.html");
        } else {
          const jsonData = JSON.stringify(data);
          res.render("index.html", { jsonData });
        }
      }
    }
  );
});

app.get("/note/fileContent/:fileName", (req, res) => {
  const { fileName } = req.params;
  fs.readFile(
    `./file/${req.session.user.userid}/${fileName}.txt`,
    "utf8",
    (err, fileData) => {
      if (err) {
        res.end();
      } else {
        res.send(fileData);
      }
    }
  );
});

app.post("/note/saveAs", (req, res) => {
  fs.access(`./file/${req.session.user.userid}`, fs.constants.F_OK, (err) => {
    if (err) {
      console.log("폴더존재X");
      fs.mkdir(`./file/${req.session.user.userid}`, (err) => {
        if (err) {
          console.log("폴더생성X");
        } else {
          console.log("폴더생성");
          fs.writeFile(
            `./file/${req.session.user.userid}/${req.body.keyName}.txt`,
            req.body.fileData,
            (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log("파일생성");
                var checkName = 1;
                console.log("user.userid 1: " + req.session.user.userid);
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end(checkName.toString());
              }
            }
          );
        }
      });
    } else {
      console.log("user.userid: " + req.session);
      fs.access(
        `./file/${req.session.user.userid}/${req.body.keyName}.txt`,
        fs.constants.F_OK,
        (err) => {
          if (err) {
            console.log("폴더 존재, 파일존재X");
            fs.writeFile(
              `./file/${req.session.user.userid}/${req.body.keyName}.txt`,
              req.body.fileData,
              (err) => {
                if (err) {
                  console.log(err);
                } else {
                  var checkName = 1;
                  res.writeHead(200, { "Content-Type": "text/plain" });
                  res.end(checkName.toString());
                }
              }
            );
          } else {
            console.log("폴더 존재, 파일존재");
            res.send({ message: "동일명의 파일이 존재" });
          }
        }
      );
    }
  });
});

app.post("/note/delete", (req, res) => {
  fs.access(
    `./file/${req.session.user.userid}/${req.body.keyName}.txt`,
    fs.constants.F_OK,
    (err) => {
      if (err) {
        res.send({ message: "해당파일이 존재하지 않음" });
      } else {
        var checkDe = 1;
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(checkDe.toString());
        fs.unlink(
          `./file/${req.session.user.userid}/${req.body.keyName}.txt`,
          (err) => {
            console.log(err);
          }
        );
      }
    }
  );
});

app.post("/note/loading", (req, res) => {
  fs.access(
    `./file/${req.session.user.userid}/${req.body.keyName}.txt`,
    fs.constants.F_OK,
    (err) => {
      if (err) {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("File not found");
      } else {
        fs.readFile(
          `./file/${req.session.user.userid}/${req.body.keyName}.txt`,
          (err, data) => {
            var checkText = data;
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(checkText.toString()); // readFile의 결과물은 버퍼 형식으로 제공
            console.log("checkText" + checkText);
            console.log(err);
          }
        );
      }
    }
  );
});

app.post("/note/saving", (req, res) => {
  fs.access(
    `./file/${req.session.user.userid}/${req.body.keyName}.txt`,
    fs.constants.F_OK,
    (err) => {
      if (err) {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("File not found");
      } else {
        fs.writeFile(
          `./file/${req.session.user.userid}/${req.body.keyName}.txt`,
          `${req.body.fileData}`,
          (err) => {
            res.end();
          }
        );
      }
    }
  );
});

app.post("/logout", (req, res) => {
  const activityFile = [];
  var isActive = "";
  const { is_on, tab } = req.body;
  tab.forEach((file) => {
    if (fs.existsSync(`./file/${req.session.user.userid}/${file}.txt`)) {
      //존재파일
      console.log("존재파일" + file);
      activityFile.push(file);
    } else {
      console.log(`./file/${req.session.user.userid}/${file}.txt`);
      console.log("존재안함" + file);
    }
  });
  console.log("activityFile 확인" + activityFile);

  tab.forEach((file) => {
    if (!fs.existsSync(`./file/${req.session.user.userid}/${file}.txt`)) {
      isActive = "";
    } else {
      isActive = req.body.is_on;
    }
  });

  const jsonData = {
    is_on: isActive,
    activityFile: activityFile,
  };

  const jsonContent = JSON.stringify(jsonData);

  fs.writeFile(
    `./file/${req.session.user.userid}/data.json`,
    jsonContent,
    (err) => {
      if (err) {
        res.redirect("/");
      } else {
        console.log("JSON 파일 저장 완료");
        req.session.destroy(function (err) {
          if (err) {
            console.error("세션 삭제 실패:", err);
            res.status(500).json({ message: "세션 삭제 실패" });
          } else {
            console.log("세션 삭제 완료 및 이동");
            res.redirect("/");
          }
        });
      }
    }
  );
});
