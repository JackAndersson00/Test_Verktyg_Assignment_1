//help my soul 2 but cooler :)
const { Builder, By, Key, until } = require("selenium-webdriver");
const mysql = require("mysql2/promise");

describe("End-2-end test", function() {

    let driver;
    let connection;

    beforeAll(async function() {
        driver = await new Builder().forBrowser('firefox').build();

        connection = await mysql.createConnection({
            user: "root",
            password: "admin123!",
            host: "localhost",
            database: "users",
        });
        console.log("Connected to database");

        await connection.query("DROP TABLE IF EXISTS users");
        await connection.query(`
            CREATE TABLE users (
                ID int AUTO_INCREMENT PRIMARY KEY,
                fname VARCHAR(255) NOT NULL,
                lname VARCHAR(255) NOT NULL,
                uname VARCHAR(255) NOT NULL,
                age int NOT NULL,
                bio VARCHAR(600) NOT NULL
            )
        `);

        await connection.query(`INSERT INTO users (fname, lname, uname, age, bio) VALUES 
            ("Jack", "Daniels", "jackie", 65, "Smooth")`);
    });

    afterAll(async function() {
        await driver.quit();

        await connection.query("DELETE FROM users");
        await connection.end();
    });

    it("should result in a new user being created", async function() {
        await driver.get("http://localhost:3000");
        await driver.findElement(By.css("a#to-create-page")).click();

        await driver.findElement(By.css("input#fname")).sendKeys("Jim");
        await driver.findElement(By.id("lname")).sendKeys("Beam");
        await driver.findElement(By.id("uname")).sendKeys("Jimmie");

        const ageElement = await driver.findElement(By.id("age"));
        await ageElement.click();
        await ageElement.sendKeys("65", Key.ENTER);

        await driver.findElement(By.id("bio")).sendKeys("beam me up");
        
        await driver.findElement(By.id("submit-btn")).click();

        const responseMessage = await driver.findElement(By.id("response-msg")).getText();

        expect(responseMessage).toBe("New user created.");
    });

    it("should show the all the users on the front page", async function() {
        await driver.get("http://localhost:3000");
        const userName = await driver.findElement(By.css("a#userName1")).getText();

        expect(userName.trim()).toBe("Jack Daniels");
    })

    it("should result in changes being made to the user profile", async function() {
        await driver.get("http://localhost:3000");
        await driver.findElement(By.css("a#userName1")).click()
        
        await driver.findElement(By.css("a#linkToEdit")).click();
        await driver.findElement(By.css("textarea#bio")).clear();
        await driver.findElement(By.css("textarea#bio")).sendKeys("Beam me up, Scottie");

        await driver.findElement(By.id("submit-btn")).click();

        const responseMessage = await driver.findElement(By.id("response-msg")).getText();

        expect(responseMessage).toBe("Changes saved.");
    });

    it("should delete the user", async function() {
        await driver.get("http://localhost:3000");
        await driver.findElement(By.css("button#close-button1")).click();

        const responseMessage = await driver.findElement(By.id("response-msg")).getText();
        console.log(`Response.body is: ${responseMessage}`);

        expect(responseMessage).toBe("User deleted.");
    });
})