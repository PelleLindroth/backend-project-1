const db = require("./index")

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS users")

  db.run(
    `CREATE TABLE "users" (
      "user_id"	INTEGER NOT NULL UNIQUE,
      "email"	TEXT NOT NULL UNIQUE,
      "password"	TEXT NOT NULL UNIQUE,
      PRIMARY KEY("user_id" AUTOINCREMENT)
    );`
  )
})

module.exports = db