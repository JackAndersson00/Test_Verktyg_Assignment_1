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

app.listen(3000, function () {
  console.log("Server started listening at localhost:3000.");
});
