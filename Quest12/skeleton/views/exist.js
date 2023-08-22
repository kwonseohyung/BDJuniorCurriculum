var mysql = require("mysql2");
const db = require("../server");

// var db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "3778",
//   database: "memo",
// });

// db.connect();

function existsFile(id, title, callback) {
  db.query(
    `SELECT EXISTS(SELECT * FROM file WHERE id = ${id} AND title = '${title}') AS existsFile`,
    (err, results, fields) => {
      if (err) {
        console.log("에러" + err);
        callback(err, null);
      } else {
        const existsFile = results[0].existsFile;
        callback(null, existsFile);
      }
    }
  );
}

db.end();
module.exports = { existsFile };
