async function getUsersFromDB(connection) { // unit tests
    const [allUsers] = await connection.query("SELECT * FROM users");
    return allUsers;
}

async function getUserFromDbByID(connection, userId) {
    const [user] = await connection.query("SELECT * FROM users WHERE ID = ?", [userId]);
    return user;
}

module.exports = { getUsersFromDB, getUserFromDbByID } 