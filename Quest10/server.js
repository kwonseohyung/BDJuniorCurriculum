const express = require("express");
const nunjucks = require("nunjucks");
const session = require("express-session"); //session은 세션을 생성해주는 미들웨어
const Memorystore = require("memorystore")(session); //메모리 공간에 세션 담기
const app = express();
//chokidar 설치
//
const fs = require("fs");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//

app.set("view engine", "html");
nunjucks.configure("./views", {
  express: app,
  watch: true,
});

let maxAge = 30 * 60 * 1000;
const sessionObj = {
  secret: "secretkey", //암호화
  resave: false,
  saveUninitialized: true,
  store: new Memorystore({ checkPeriod: maxAge }),
  cookie: {
    maxAge: maxAge,
  },
};

//세션을 생성해주는 미들웨어 app.use(session());
//session() 내부에 next()가 담겨있어 app.use()안에 작성 시, 항상 실행
//session() 미들웨어는 req객체 안에 session이라는 객체를 만들어줌
//session() 안에 객체 형태의 인자값들이 들어가게됨
app.use(session(sessionObj));

app.use(express.urlencoded({ extended: true }));

app.use("/note", express.static("./views")); 

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
  //user변수를 템플릿에 전달함, 템플릿 파일에서 user변수를 이용하여 사용자 정보 표시 가능
  res.render("login.html", {
    user,
  });
});

app.post("/login", (req, res) => {
  const { userid, userpw } = req.body;

  const [data] = user.filter((v) => v.userid === userid && v.userpw === userpw);
  //로그인에 성공한 경우, session객체 안에 user라는 속성값 추가해서 사용자 정보 넣어줌
  if (data != undefined) {
    req.session.user = { ...data };

    res.redirect("/note");
  } else {
    res.send("아이디와 패스워드가 없습니다.");
  }
});

app.get("/note",(req,res)=>{
  
  console.log("로그인 성공 렌더 전"+req.session.user.userid)
  //res.render("index.html", req.session.user.userid)
  //res.render("index2.html",{ activityFile :"tobi", name:"kim"})
  
  fs.readFile(`./file/${req.session.user.userid}/data.json`, "utf8", (err, data) => {
    if (err) {
      //res.render("index.html")
      console.log(err)
    } else {
      //console.log("json파일"+data)
      const jsonData = JSON.parse(data);
      res.render("index.html",jsonData)
    }
  });

 
})

  

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
      console.log("폴더존재");
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
  fs.access(`./file/${req.session.user.userid}/${req.body.keyName}.txt`, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("File not found");
    } else {
      fs.readFile(`./file/${req.session.user.userid}/${req.body.keyName}.txt`, (err, data) => {
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
  fs.access(`./file/${req.session.user.userid}/${req.body.keyName}.txt`, fs.constants.F_OK, (err) => {
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
  });
});

//세션 삭제는 되는데 -> '/'로 이동이 안됨... 왜...???????????????????????????????????????????????????????//////////////////////////////
app.post("/logout", (req, res) => {
 

    const activityFile = [];
    req.body.tab.forEach((file) => {
      if (
        fs.existsSync(`./file/${req.session.user.userid}/${file}.txt`)
      ) {
        //존재파일
        console.log("존재파일" + file);
        activityFile.push(file);
        
      }else{
        console.log(`./file/${req.session.user.userid}/${file}.txt`)
        console.log("존재안함"+file)
      
      }
    });
    console.log("activityFile 확인" + activityFile)
    
    req.body.tab.forEach((file)=>{
      if (
        !fs.existsSync(`./file/${req.session.user.userid}/${file}.txt`)
      ) {
        isActive = "";
      }else{
        isActive = req.body.is_on;
      }
    })
    
  
    
    const jsonData = {
      is_on: isActive,
      activityFile: activityFile,
    };
    
    const jsonContent = JSON.stringify(jsonData);
  
  
  
    fs.writeFile( `./file/${req.session.user.userid}/data.json`, jsonContent,
      (err) => {
        if (err) {
          console.error("JSON 파일 저장 실패:", err);
          //res.status(500).json({ message: "JSON 파일 저장 실패" });
        } else {
          console.log("JSON 파일 저장 완료");
          req.session.destroy(function (err) {
            if (err) {
              console.error("세션 삭제 실패:", err);
              res.status(500).json({ message: "세션 삭제 실패" });
            } else {
              console.log("세션 삭제 완료 및 이동");
              return res.redirect("/");
            }
          });
          
        }
      }
        
    );

    

    

  });
  

  app.get('/hh', (req,res)=>{
    res.redirect('/hihi')
  })


  app.get('/hihi',(req,res)=>{
    res.render('hh.html')
  })