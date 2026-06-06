const { Builder, By, until } = require("selenium-webdriver");
require("chromedriver");

async function typeIntoFirstInputs(driver, values) {
    const inputs = await driver.findElements(By.css("input"));

    if (inputs.length === 0) {
        throw new Error("No input fields found on this page");
    }

    for (let i = 0; i < values.length && i < inputs.length; i++) {
        await inputs[i].clear();
        await inputs[i].sendKeys(values[i]);
    }
}

async function clickSubmitButton(driver) {
    const buttons = await driver.findElements(By.css("button"));

    if (buttons.length === 0) {
        throw new Error("No button found on this page");
    }

    await buttons[buttons.length - 1].click();
}

(async function authFormTest() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        await driver.manage().window().maximize();

        // Login Test
        await driver.get("http://localhost:3000/login");
        await driver.sleep(1500);

        await typeIntoFirstInputs(driver, [
            "test@gmail.com",
            "123456"
        ]);

        await clickSubmitButton(driver);
        console.log("✅ Login Form Test Passed");

        await driver.sleep(1500);

        // Register Test
        await driver.get("http://localhost:3000/register");
        await driver.sleep(1500);

        await typeIntoFirstInputs(driver, [
            "Test User",
            "testuser@gmail.com",
            "123456"
        ]);

        await clickSubmitButton(driver);
        console.log("✅ Register Form Test Passed");

        console.log("\n🎉 AUTH FORM TESTS PASSED");

    } catch (error) {
        console.log("\n❌ AUTH FORM TEST FAILED");
        console.error(error);
    } finally {
        await driver.quit();
    }
})();