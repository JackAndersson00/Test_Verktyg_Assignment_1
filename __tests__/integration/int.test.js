//help my soul
const mysql = require("mysql2/promise");
const logic = require("../../logic.js");
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
    })

    it("should return all the users in the database", async function() {
        const response = await request(server).get("/users");
        expect(response.statusCode).toBe(200);
    })

    it("should create a new user in the database, POST", async function() {
        const newUser = {
            fname: "Jack",
            lname: "Daniels",
            uname: "danny",
            age: 65,
            bio: "say hello"
        }; 
        const response = await request(server)
            .post("/users")
            .send(newUser);
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("New user created.");
    })

    it("should delete a user from the database, DELETE", async function() {
        const userId = 35;

        const response = await request(server)
            .delete(`/users/${userId}`)
            
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User deleted.")
    })
})