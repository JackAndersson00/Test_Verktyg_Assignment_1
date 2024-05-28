const mysql = require("mysql2/promise");
const logic = require("../../logic.js");

describe("Logic unit tests", function () {
    let connection = null;

    beforeAll(async function () {
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
    })

    it("should return all users from db", async function () {
        const users = await logic.getUsersFromDB(connection)
        expect(users.length > 0).toBe(true)
    })

    it("should return user with specified ID", async function() {
        const userId = 2;
        const user = await logic.getUserFromDbByID(connection, userId);
        expect(user.length > 0).toBe(true)
    })

    it("should return affected.Row as 1", async function() {
        const userId = 2;
        const user = {
            fname: "Jill",
            lname: "Smith",
            uname: "jilly",
            age: 30,
            bio: "Lorem ipsum"
        };
        const editUser = await logic.updateUserInDb(connection, user.fname, user.lname, user.uname, user.age, user.bio, userId);
        expect(editUser.affectedRows).toBe(1);
    })
})