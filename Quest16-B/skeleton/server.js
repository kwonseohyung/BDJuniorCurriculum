const express = require("express");
const nunjucks = require("nunjucks");
const session = require("express-session");
const Memorystore = require("memorystore")(session);
const sequelize = require("./models").sequelize;
const app = express();
const bodyParser = require("body-parser");

const router = require("./routes/user");
const noterouter = require("./routes/note");
//chokidar 설치

sequelize.sync();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.use("/note", noterouter);

app.listen(8000, function () {
  console.log("컨테이너 내에서 실행");
});

app.get("/", (req, res) => {
  res.render("main.html");
});

app.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.clearCookie("secretkey");
  res.redirect("/user/login");
});

module.exports = app;
