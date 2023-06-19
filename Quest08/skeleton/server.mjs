import formidable from "formidable";
import http from "http";
import url from "url";
import fs from "fs";

let uploadedImagePath = 0;
let uploadedOldPath = 0;

const server = http.createServer((req, res) => {
  var URL = req.url;
  var pathname = url.parse(URL, true).pathname;
  var query = url.parse(URL, true).query;

  res.writeHead(200);

  if (pathname === "/") {
    //브라우저의 주소창에 `http://localhost:8080`을 치면 `Hello World!`를 응답하여 브라우저에 출력합니다.
    res.write("Hello World!");
    res.end();
  } else if (pathname === "/foo") {
    if (req.method == "GET") {
      //서버의 `/foo` URL에 `bar` 변수로 임의의 문자열을 GET 메소드로 보내면, `Hello, [문자열]`을 출력합니다.
      if (query.bar) {
        res.write("Hello, " + query.bar);
      }
      res.end();
    } else if (req.method == "POST") {
      //서버의 `/foo` URL에 `bar` 키에 임의의 문자열 값을 갖는 JSON 객체를 POST 메소드로 보내면, `Hello, [문자열]`을 출력합니다.
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        const jsonData = JSON.parse(body);

        if (jsonData && jsonData.bar) {
          const message = `Hello, ${jsonData.bar}`;
          res.write(message);
        }

        res.end(); // POST 요청 처리 완료 후 응답을 보냄
      });
    }
  } else if (pathname === "/pic/upload") {
    // 서버의 `/pic/upload` URL에 그림 파일을 POST 하면 서버에 보안상 적절한 방법으로 파일이 업로드 됩니다.
    // formidable 모듈은 업로드된 파일의 정보를 files 객체에 저장, 각 파일은 files 객체의 속성으로 저장
    if (req.method == "POST") {
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        if (files.file) {
          var uploadedFile = files.file;
          var oldpath = uploadedFile.filepath;

          res.write("file uploaded");
          res.end();

          uploadedOldPath = oldpath;
        }
      });
    }
  } else if (pathname === "/pic/show") {
    //서버의 `/pic/show` URL을 GET 하면 브라우저에 위에 업로드한 그림이 뜹니다.
    if (req.method == "GET") {
      if (uploadedOldPath) {
        fs.readFile(uploadedOldPath, (err, data) => {
          if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("그림 파일을 찾을 수 없습니다.");
            return;
          }

          res.writeHead(200, { "Content-Type": "image/jpeg" });
          res.end(data);
        });
      }
    }
  } else if (pathname === "/pic/download") {
    //서버의 `/pic/download` URL을 GET 하면 브라우저에 위에 업로드한 그림이 `pic.jpg`라는 이름으로 다운로드 됩니다.
    if (req.method == "GET") {
      if (uploadedOldPath) {
        var newpath = "C:/BDJuniorCurriculum/Quest08/skeleton/" + "pic.jpg";

        fs.rename(uploadedOldPath, newpath, function (err) {
          if (err) throw err;
          res.write("File download");
          res.end();
        });
      }
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found");
    res.end();
  }
});

server.listen(8080, () => {
  console.log("서버가 http://localhost:8080 에서 실행 중입니다.");
});