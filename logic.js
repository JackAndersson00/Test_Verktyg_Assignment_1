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
        [fname, lname, uname, age, bio, userId]
        );
    return editUser;
}

module.exports = { getUsersFromDB, getUserFromDbByID, updateUserInDb } 