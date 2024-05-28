async function getUsersFromDB(connection) { // unit tests
    const [allUsers] = await connection.query("SELECT * FROM users");
    return allUsers;
}

module.exports = { getUsersFromDB }