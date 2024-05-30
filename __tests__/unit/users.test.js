const mysql = require("mysql2/promise");
const logic = require("../../logic.js");
//const { del } = require("selenium-webdriver/http.js");
//const { create } = require("json-server");

describe("Logic unit tests", function () {
    let connection = null;

    beforeAll(async function() {
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

        await connection.query("DROP TABLE IF EXISTS users");

        await connection.query(`CREATE TABLE users (
            ID int AUTO_INCREMENT PRIMARY KEY,
            fname VARCHAR(255) NOT NULL,
            lname VARCHAR(255) NOT NULL,
            uname VARCHAR(255) NOT NULL,
            age int NOT NULL,
            bio VARCHAR(600) NOT NULL
        )`);

        await connection.query(`INSERT INTO users (fname, lname, uname, age, bio) VALUES 
            ("Jack", "Daniels", "jackie", 65, "Smooth")`);
    })

    afterAll(async function() {
        await connection.query("DELETE FROM users");
        await connection.end();
    })

    it("should return all users from db", async function () {
        const users = await logic.getUsersFromDB(connection)
        expect(users.length > 0).toBe(true)
    })

    it("should return user with specified ID", async function() {
        const userId = 1;
        const user = await logic.getUserFromDbByID(connection, userId);
        expect(user.length > 0).toBe(true)
    })

    it("should return affected.Row as 1", async function() {
        const userId = 1;
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

    it("should create user in DB", async function() {
        const createUser = {fname: "Jill",
                            lname: "Smith",
                            uname: "Jilly",
                            age: 30,
                            bio: "Lorem ipsum"
        };
        const newUser = await logic.createUserInDB(connection, createUser.fname, createUser.lname, createUser.uname, createUser.age, createUser.bio);
        expect(newUser.affectedRows).toBe(1)
        
    })

    it("should delete user in DB",async function(){
        const userID = 1;
        const deletedUSer = await logic.deleteUserFromDB(connection, userID);
        expect(deletedUSer.affectedRows).toBe(1)
    })
})