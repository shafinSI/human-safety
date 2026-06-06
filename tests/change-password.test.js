const { Builder, By } = require("selenium-webdriver");
require("chromedriver");

(async function changePasswordTest() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        await driver.manage().window().maximize();

        await driver.get("http://localhost:3000/change-password");
        await driver.sleep(1500);

        const inputs = await driver.findElements(By.css("input"));

        if (inputs.length < 3) {
            throw new Error("Change Password page e 3 ta input field paoa jay nai");
        }

        await inputs[0].sendKeys("123456");
        await inputs[1].sendKeys("12345678");
        await inputs[2].sendKeys("12345678");

        const buttons = await driver.findElements(By.css("button"));

        if (buttons.length === 0) {
            throw new Error("Button paoa jay nai");
        }

        await buttons[buttons.length - 1].click();

        await driver.sleep(2000);

        console.log("✅ Change Password Form Tested");
        console.log("🎉 CHANGE PASSWORD TEST PASSED");

    } catch (error) {
        console.log("❌ CHANGE PASSWORD TEST FAILED");
        console.error(error);
    } finally {
        await driver.quit();
    }
})();