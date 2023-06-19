const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser"); //req.body는 body-parser를 사용하기 전에는 디폴트 값으로 Undefined이 설정
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json()); // JSON 데이터를 파싱하기 위한 바디 파서 설정
app.use(bodyParser.urlencoded({ extended: true })); //URL 인코딩된 데이터를 파싱하기 위한 바디 파서 설정 브라우저에서 오는 응답이 json일 수도 있고, 아닐 수도 있으므로 urlencoded()추가

app.listen(8000, function () {
  console.log("listening on 8000");
});


app.use(express.static(__dirname));
app.get("/note", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});



app.post("/note/saveAs", (req, res) => {
  // 파일 저장
  fs.access(`./file/${req.body.keyName}.txt`, fs.constants.F_OK, (err) => {
    if (err) {
      var checkName = 1;
      // 숫자 변수를 문자열로 변환하여 브라우저로 전송
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(checkName.toString());
      fs.writeFile(`./file/${req.body.keyName}.txt`, req.body.fileData, (err) =>
        console.log(err)
      );
    } else {
      res.send({ message: "동일명의 파일이 존재" });
    }
  });
});

app.post("/note/delete", (req, res) => {
  fs.access(`./file/${req.body.keyName}.txt`, fs.constants.F_OK, (err) => {
    if (err) {
      res.send({ message: "해당파일이 존재하지 않음" });
    } else {
      var checkDe = 1;
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(checkDe.toString());
      fs.unlink(`./file/${req.body.keyName}.txt`, (err) => {
        console.log(err);
      });
    }
  });
});

app.post("/note/loading", (req, res) => {
  fs.access(`./file/${req.body.keyName}.txt`, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("File not found");
    } else {
      fs.readFile(`./file/${req.body.keyName}.txt`, (err, data) => {
        var checkText = data;
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(checkText.toString()); // readFile의 결과물은 버퍼 형식으로 제공
        console.log("checkText" + checkText);
        console.log(err);
      });
    }
  });
});
app.post("/note/saving", (req, res) => {
  fs.access(`./file/${req.body.keyName}.txt`, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("File not found");
    } else {
      fs.writeFile(
        `./file/${req.body.keyName}.txt`,
        `${req.body.fileData}`,
        (err) => {
          res.end();
        }
      );
    }
  });
});
