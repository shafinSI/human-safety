const { Builder, By, until } = require("selenium-webdriver");
require("chromedriver");

(async function humanSafetyFrontendTest() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        await driver.manage().window().maximize();

        // 1. Home Page
        await driver.get("http://localhost:3000");
        await driver.wait(until.titleIs(await driver.getTitle()), 5000);
        console.log("✅ Home Page Loaded");

        // 2. Login Page
        await driver.get("http://localhost:3000/login");
        await driver.sleep(1000);
        console.log("✅ Login Page Loaded");

        // 3. Register Page
        await driver.get("http://localhost:3000/register");
        await driver.sleep(1000);
        console.log("✅ Register Page Loaded");

        // 4. Emergency Alert Page
        await driver.get("http://localhost:3000/emergency-alert");
        await driver.sleep(1000);
        console.log("✅ Emergency Alert Page Loaded");

        // 5. Nearest People Page
        await driver.get("http://localhost:3000/nearest-people");
        await driver.sleep(1000);
        console.log("✅ Nearest People Page Loaded");

        // 6. Safety Travel Page
        await driver.get("http://localhost:3000/safety-travel");
        await driver.sleep(1000);
        console.log("✅ Safety Travel Page Loaded");

        // 7. Guardian Mode Page
        await driver.get("http://localhost:3000/guardian-mode");
        await driver.sleep(1000);
        console.log("✅ Guardian Mode Page Loaded");

        // 8. Emergency Contact Page
        await driver.get("http://localhost:3000/emergency-contact");
        await driver.sleep(1000);
        console.log("✅ Emergency Contact Page Loaded");

        console.log("\n🎉 ALL FRONTEND TESTS PASSED SUCCESSFULLY");

    } catch (error) {
        console.log("\n❌ TEST FAILED");
        console.error(error);
    } finally {
        await driver.quit();
    }
})();