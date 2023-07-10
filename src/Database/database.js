const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  port: 3306,
  database: "minpro2be",
});

db.connect((err) => {
  if (err) {
    console.error("gabisa nyambung ke database:", err);
    return;
  }
  console.log(`tersambung ke database ${db.config.database}`);
});
