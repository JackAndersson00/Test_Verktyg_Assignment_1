//help my soul 2 but cooler :)
const { Builder, By, Key, until } = require("selenium-webdriver");
const mysql = require("mysql2");

describe("End-2-end test", function() {

    let driver;
    

    beforeAll(async function() {
        driver = await new Builder().forBrowser('firefox').build();
    })

    it("should reslut in a new user being created", async function() {
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

        expect(responseMessage).toBe("New user created.")
    })

    it("should show the all the users on the front page", async function() {
        await driver.get("http://localhost:3000");
        const userName = await driver.findElement(By.css("a#userName12")).getText();
        console.log(`Result is: ${userName}`);

        expect(userName.trim()).toBe("Jim Beam");
    })

    it("should result in changes being made to the user profile", async function() {
        await driver.get("http://localhost:3000");
        await driver.findElement(By.css("a#userName12")).click()
        
        await driver.findElement(By.css("textarea#bio")).sendKeys("Smooth as fuck...");

        await driver.findElement(By.id("submit-btn")).click();

        const responseMessage = await driver.findElement(By.id("resonse-msg")).getText();

        expect(responseMessage).toBe("Changes saved.");
    });
})