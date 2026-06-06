const { Builder, By, until } = require("selenium-webdriver");
require("chromedriver");

(async function registerPageTest() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        await driver.manage().window().maximize();

        await driver.get("http://localhost:3000/register");
        await driver.sleep(1500);

        const inputs = await driver.findElements(By.css("input"));

        if (inputs.length < 4) {
            throw new Error("Register page e 4 ta input field paoa jay nai");
        }

        await inputs[0].sendKeys("Selenium Test User");
        await inputs[1].sendKeys("seleniumtest" + Date.now() + "@gmail.com");
        await inputs[2].sendKeys("01812345678");
        await inputs[3].sendKeys("12345678");

        const buttons = await driver.findElements(By.css("button"));
        const registerButton = buttons[buttons.length - 1];

        await driver.executeScript(
            "arguments[0].scrollIntoView({block: 'center'});",
            registerButton
        );

        await driver.sleep(1000);

        await driver.wait(until.elementIsVisible(registerButton), 5000);
        await driver.wait(until.elementIsEnabled(registerButton), 5000);

        await driver.executeScript("arguments[0].click();", registerButton);

        await driver.sleep(2000);

        console.log("✅ Register Page Input Test Passed");
        console.log("✅ Register Button Click Test Passed");
        console.log("🎉 REGISTER PAGE TEST PASSED");

    } catch (error) {
        console.log("❌ REGISTER PAGE TEST FAILED");
        console.error(error);
    } finally {
        await driver.quit();
    }
})();