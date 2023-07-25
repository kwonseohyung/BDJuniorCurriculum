const express = require("express");
const nunjucks = require("nunjucks");
const session = require("express-session");
const Memorystore = require("memorystore")(session);
const app = express();
//chokidar 설치

const fs = require("fs");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//
//
//
//
//
// server.js에서 mysql과 연결해서 사용
// exist.js의 함수를 require해서 사용중인 코드가 있음 app.post~~~
// exist.js에서도 mysql과 연결해서 사용해야 함.. 어떻게??
// 아래는 server.js코드

var mysql = require("mysql2");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "3778",
  database: "memo",
});

//module.exports = db;
db.connect();

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
  { userid: "1", userpw: "1", username: "kim" },
  { userid: "a", userpw: "a", username: "lee" },
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
  const id = req.session.user.userid;

  console.log("id: " + id);
  db.query(
    `select exists(select * from activity_file WHERE id = '${id}') AS existsFile`,
    (err, results, fields) => {
      if (err) {
        console.log("0: " + err);
        res.status(500).send({ message: "서버 오류" });
      } else {
        const existsFile = results[0].existsFile;
        if (existsFile) {
          // 중복된 파일이 존재
          db.query(
            `select activity_title from activity_file WHERE id = '${id}'`,
            (err, results, fields) => {
              if (err) {
                console.log("에러: " + err);
                res.status(500).send({ message: "서버 오류" });
              } else {
                const activity_titles = results.map(
                  (result) => result.activity_title
                );

                const jsonData = { activity_title: activity_titles };
                console.log(jsonData);
                res.render("index.html", {
                  jsonData: JSON.stringify(jsonData),
                });
              }
            }
          );
        } else {
          // 중복된 파일이 존재X
          // sql문에 insert
          res.render("index.html");
        }
      }
    }
  );
});

app.get("/note/fileContent/:fileName", (req, res) => {
  const { fileName } = req.params;
  const id = req.session.user.userid;
  const title = req.body.keyName;

  db.query(
    `select contents from file WHERE id = '${id}' AND title = '${fileName}'`,
    (err, results, fields) => {
      if (err) {
        // res.status(500).send({ message: "서버 오류" });
        res.end();
      } else {
        const contents = results.map((result) => result.contents);
        res.send(contents);
      }
    }
  );
});

app.post("/note/saveAs", (req, res) => {
  const id = req.session.user.userid;
  const title = req.body.keyName;
  const contents = req.body.fileData;
  console.log("id:" + id + "  title: " + title);
  //해당 유저의 파일명 존재여부확인

  db.query(
    `select exists(select * from file WHERE id = '${id}' AND title = '${title}') AS existsFile`,
    (err, results, fields) => {
      if (err) {
        console.log("0: " + err);
        res.status(500).send({ message: "서버 오류" });
      } else {
        const existsFile = results[0].existsFile;
        if (existsFile) {
          // 중복된 파일이 존재
          res.status(200).send({ exists: 1 });
        } else {
          // 중복된 파일이 존재X
          // sql문에 insert
          db.query(
            `INSERT INTO file VALUES ('${id}', '${title}', '${contents}')`,
            (err, results, fields) => {
              if (err) {
                console.log("1: " + err);
                res.status(500).send({ message: "서버 오류" });
              } else {
                res.status(200).send({ exists: 0 });
              }
            }
          );
        }
      }
    }
  );
});

//잘 되던 코드가 테이블 삭제, 생성 이후  res.status(500).send({ message: "서버 오류" });가 뜸
//const { existsFile } = require("./views/exist.js");
/*
app.post("/note/hh", (req, res) => {
  const id = req.session.user.userid;
  const title = req.body.keyName;
  const contents = req.body.fileData;

  existsFile(id, title, (err, exists) => {
    if (err) {
      res.status(502).send({ message: "서버 오류" });
      return;
    }
    if (exists) {
      // 파일이 존재
      db.query(
        `INSERT INTO file VALUES (${id}, '${title}', '${contents}')`,
        (err, results, fields) => {
          if (err) {
            res.status(500).send({ message: "서버 오류" });
          } else {
            res.status(200).send({ exists: 0 });
          }
        }
      );
    } else {
      // 파일 없음
      res.status(200).send({ exists: 0 });
    }
  });
});
*/

app.post("/note/delete", (req, res) => {
  const id = req.session.user.userid;
  const title = req.body.keyName;

  //해당 유저의 파일명 존재여부확인
  db.query(
    `select exists(select * from file WHERE id = '${id}' AND title = '${title}') AS existsFile`,
    (err, results, fields) => {
      if (err) {
        res.status(502).send({ message: "서버 오류" });
      } else {
        const existsFile = results[0].existsFile;
        if (existsFile) {
          // 파일이 존재
          // sql문 삭제
          db.query(
            `delete from file WHERE id = '${id}' AND title = '${title}'`,
            (err, results, fields) => {
              if (err) {
                res.status(500).send({ message: "서버 오류" });
              } else {
                res.status(200).send({ exists: 1 });
              }
            }
          );
        } else {
          // 파일 없음
          res.status(200).send({ exists: 0 });
        }
      }
    }
  );
});

app.post("/note/loading", (req, res) => {
  const id = req.session.user.userid;
  const title = req.body.keyName;

  //해당 유저의 파일명 존재여부확인
  db.query(
    `select exists(select * from file WHERE id = '${id}' AND title = '${title}') AS existsFile`,
    (err, results, fields) => {
      if (err) {
        res.status(500).send({ message: "서버 오류" });
      } else {
        const existsFile = results[0].existsFile;
        if (existsFile) {
          //파일이 존재
          //sql문에서 contents 값(checkText) 가져와서 보내기

          db.query(
            `SELECT contents FROM file WHERE id = '${id}' AND title = '${title}'`,
            (err, results, fields) => {
              if (err) {
                res.status(500).send({ message: "서버 오류" });
              } else {
                if (results.length > 0) {
                  const contents = results[0].contents;
                  res.status(200).send({ exists: 1, contents: contents });
                } else {
                  res
                    .status(404)
                    .send({ message: "파일이 존재하지 않습니다." });
                }
              }
            }
          );
        } else {
          // 파일 없음
          res.status(200).send({ exists: 0 });
        }
      }
    }
  );
});

app.post("/note/saving", (req, res) => {
  const id = req.session.user.userid;
  const title = req.body.keyName;
  const contents = req.body.fileData;

  // if (title == "undefined") {
  //   res.status(200).send({ exists: 0 });
  //   res.end();
  // }
  //해당 유저의 파일명 존재여부확인
  db.query(
    `select exists(select * from file WHERE id = '${id}' AND title = '${title}') AS existsFile`,
    (err, results, fields) => {
      if (err) {
        res.status(500).send({ message: "서버 오류" });
      } else {
        const existsFile = results[0].existsFile;
        if (existsFile) {
          // 중복된 파일이 존재
          db.query(
            `update file set contents= '${contents}' where id = '${id}' AND title = '${title}'`,
            (err, results, fields) => {
              if (err) {
                console.log(err);
                res.status(500).send({ message: "서버 오류" });
              } else {
                res.status(200).send({ exists: 1 });
              }
            }
          );
        } else {
          // 중복된 파일이 존재X
          res.status(200).send({ exists: 0 });
        }
      }
    }
  );
});

app.post("/logout", (req, res) => {
  const id = req.session.user.userid;
  const tabData = req.body.tabData;

  db.query(
    `delete from activity_file WHERE id = '${id}'`,
    (err, results, fields) => {
      if (err) {
        res.status(500).send({ message: "서버 오류" });
      } else {
        res.status(200).send({ exists: 1 });
      }
    }
  );

  tabData.forEach((title) => {
    db.query(
      `select exists(select * from file WHERE id = '${id}' AND title = '${title}') AS existsFile`,
      (err, results, fields) => {
        if (err) {
          res.status(500).send({ message: "서버 오류" });
        } else {
          const existsFile = results[0].existsFile;
          if (existsFile) {
            // 중복된 파일이 존재
            // sql activity_file 테이블에 insert
            db.query(
              `INSERT INTO activity_file(id, activity_title) VALUES ('${id}', '${title}')`,
              (err, results, fields) => {
                if (err) {
                  console.log("1: " + err);
                  res.status(500).send({ message: "서버 오류" });
                } else {
                  req.session.destroy(function (err) {
                    if (err) {
                      console.error("세션 삭제 실패:", err);
                      res.status(500).json({ message: "세션 삭제 실패" });
                    } else {
                      console.log("세션 삭제 완료 및 이동");
                      //res.redirect("/");
                      res.end();
                    }
                  });
                }
              }
            );
          }
        }
      }
    );
  });
});
