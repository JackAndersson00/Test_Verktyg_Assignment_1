const mysql = require("mysql2/promise");
const logic = require("./logic.js")

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

async function getAllUsers(req, res) {
  try {
    const allUsers = await logic.getUsersFromDB(connection);
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

async function getUserById(req, res) {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) return res.status(400).json({ message: "Invalid ID format." });

    const  user = await logic.getUserFromDbByID(connection, userId);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.json(user[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function updateUser(req, res) {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) return res.status(400).json({ message: "Invalid ID format." });

    const { fname, lname, uname, age, bio } = req.body;
    const editUser = await logic.updateUserInDb(connection, fname, lname, uname, age, bio, userId);
    if (editUser.affectedRows === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ message: "Changes saved." });
  
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function createUser(req, res) {
  try {
    const { fname, lname, uname, age, bio } = req.body;
    const newUser = await logic.createUserInDB(connection, fname, lname, uname, age, bio);
    
    if (newUser.affectedRows === 0) {
      return res.status(404).json({ message: "Could not create user." });
    }

    return res.status(201).json({ message: "New user created." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function deleteUser(req, res) {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) return res.status(400).json({ message: "Invalid ID format." });

    const deleteUser = await logic.deleteUserFromDB(connection, userId);

    if (deleteUser.affectedRows === 0) {
      return res.status(404).json({ message: "No such user." });
    }

    return res.status(200).json({ message: "User deleted." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = {
  connectDB,
  getAllUsers,
  getUserById,
  updateUser,
  createUser,
  deleteUser
};
