const express = require("express");
const mysql = require("mysql2/promise");

const app = express();

app.use(express.static("public"));
app.use(express.json());

let connection = null;
async function connectDB() {
  try {
    connection = await mysql.createConnection({
      user: "root",
      password: "admin123!",
      host: "localhost",
      database: "users",
    });
    console.log("Connected to database");
  } catch (error) {
    console.error("Something went wrong with connecting to db", error);
  }
}
connectDB();

app.get("/users", async function (req, res) {
    const [allUsers] = await connection.query("SELECT * FROM users");
    res.json(allUsers);
});

app.get("/users/:id", async function (req, res) {
  const userId = req.params.id;
  const [user] = await connection.query("SELECT * FROM users WHERE ID = ?", [userId]);
  res.json(user[0]);
});

app.put("/users/:id", async function (req, res) {
  const userId = req.params.id;
  const { fname, lname, uname, age, bio } = req.body;
  const [editUser] = await connection.query(
    "UPDATE users SET fname = ?, lname = ?, uname = ?, age = ?, bio = ? WHERE ID = ?", 
    [fname, lname, uname, age, bio, userId]);
  res.json(editUser);
});

app.post("/users", async function (req, res) {
  const { fname, lname, uname, age, bio } = req.body;
  const [newUser] = await connection.query(
    "INSERT INTO users (fname, lname, uname, age, bio) VALUES (?, ?, ?, ?, ?)",
    [fname, lname, uname, age, bio]);
  res.json(newUser);
});

app.delete("/users/:id", async function(req, res) {
  const userId = req.params.id;
  const deleteUser = await connection.query("DELETE FROM users WHERE id = ?", [userId]);
  res.json(deleteUser);
});

app.listen(3000, function () {
    console.log("Server started at localhost:3000.");
})