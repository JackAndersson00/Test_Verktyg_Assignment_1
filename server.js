const express = require("express");
const {
  connectDB,
  getAllUsers,
  getUserById,
  updateUser,
  createUser,
  deleteUser
} = require("./routes");

const app = express();

app.use(express.static("public"));
app.use(express.json());

connectDB();

app.get("/users", getAllUsers); //super tests (integration)
app.get("/users/:id", getUserById);
app.put("/users/:id", updateUser);
app.post("/users", createUser);
app.delete("/users/:id", deleteUser);

module.exports = app