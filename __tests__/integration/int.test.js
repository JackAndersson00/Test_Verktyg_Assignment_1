//help my soul
const mysql = require("mysql2/promise");
const server = require("../../server.js");
const request = require("supertest");

describe("Routes integration tests", function () {
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

    it("should return all the users in the database", async function() {
        const response = await request(server).get("/users");
        expect(response.statusCode).toBe(200);
    })

    it("should create a new user in the database, POST", async function() {
        const newUser = {
            fname: "Jim",
            lname: "Beam",
            uname: "jimmy",
            age: 65,
            bio: "beam me up"
        }; 
        const response = await request(server)
            .post("/users")
            .send(newUser);
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("New user created.");
    })

    it("should delete a user from the database, DELETE", async function() {
        const userId = 1;

        const response = await request(server)
            .delete(`/users/${userId}`)
            
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User deleted.")
    })
})