const axios = require("axios");

async function apiTest() {
    try {
        const response = await axios.get("http://localhost:3000");

        console.log("✅ Server Responding");
        console.log("Status:", response.status);

    } catch (error) {
        console.log("❌ API Test Failed");
        console.log(error.message);
    }
}

apiTest();