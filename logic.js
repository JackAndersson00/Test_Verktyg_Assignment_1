async function getUsersFromDB(connection) { // unit tests
    const [allUsers] = await connection.query("SELECT * FROM users");
    return allUsers;
}

async function getUserFromDbByID(connection, userId) {
    const [user] = await connection.query("SELECT * FROM users WHERE ID = ?", [userId]);
    return user;
}

async function updateUserInDb(connection, fname, lname, uname, age, bio, userId) {
    const [editUser] = await connection.query(
        "UPDATE users SET fname = ?, lname = ?, uname = ?, age = ?, bio = ? WHERE ID = ?",
        [fname, lname, uname, age, bio, userId]);
    return editUser;
}

async function createUserInDB(connection, fname, lname, uname, age, bio) {
    const [newUser] = await connection.query(
        "INSERT INTO users (fname, lname, uname, age, bio) VALUES (?, ?, ?, ?, ?)",
        [fname, lname, uname, age, bio]);
    return newUser;
}

async function deleteUserFromDB(connection, userId) {
    const [deleteUser] = await connection.query("DELETE FROM users WHERE id = ?", [userId]);
    return deleteUser;
}

module.exports = { getUsersFromDB, getUserFromDbByID, updateUserInDb, createUserInDB, deleteUserFromDB } 