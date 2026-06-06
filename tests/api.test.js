const axios = require("axios");

async function apiTest() {
    try {
        const response = await axios.get("http://localhost:3000/api/test");

        console.log("✅ API Route Responding");
        console.log("Status:", response.status);

        console.log("\n🎉 API TEST PASSED");

    } catch (error) {
        console.log("❌ API Test Failed");

        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Data:", error.response.data);
        } else {
            console.log(error.message);
        }
    }
}

apiTest();