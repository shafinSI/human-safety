const { Builder, By } = require('selenium-webdriver');

(async function humanSafetyTest() {

    let driver = await new Builder()
        .forBrowser('chrome')
        .build();

    try {

        // Home Page
        await driver.get('http://localhost:3000');
        await driver.sleep(2000);

        console.log("✅ Home Page Loaded");
        console.log("Title:", await driver.getTitle());

        // Sidebar Open Button (if exists)
        try {
            const menuButton = await driver.findElement(By.css('button'));
            await menuButton.click();
            await driver.sleep(1000);
            console.log("✅ Sidebar Opened");
        } catch {
            console.log("⚠ Sidebar button not found");
        }

        // Emergency Alert
        await driver.get('http://localhost:3000/emergency-alert');
        await driver.sleep(2000);
        console.log("✅ Emergency Alert Page");

        // Nearest People
        await driver.get('http://localhost:3000/nearest-people');
        await driver.sleep(2000);
        console.log("✅ Nearest People Page");

        // Safety Travel
        await driver.get('http://localhost:3000/safety-travel');
        await driver.sleep(2000);
        console.log("✅ Safety Travel Page");

        // Guardian Mode
        await driver.get('http://localhost:3000/guardian-mode');
        await driver.sleep(2000);
        console.log("✅ Guardian Mode Page");

        // Emergency Contact
        await driver.get('http://localhost:3000/emergency-contact');
        await driver.sleep(2000);
        console.log("✅ Emergency Contact Page");

        // Login
        await driver.get('http://localhost:3000/login');
        await driver.sleep(2000);
        console.log("✅ Login Page");

        // Register
        await driver.get('http://localhost:3000/register');
        await driver.sleep(2000);
        console.log("✅ Register Page");

        console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY");

    } catch (error) {

        console.log("\n❌ TEST FAILED");
        console.error(error);

    } finally {

        await driver.quit();

    }

})();