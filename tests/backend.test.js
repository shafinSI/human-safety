const axios = require("axios");

(async function backendRouteTest() {
    try {

        const routes = [
            "http://localhost:3000/api/test"
        ];

        for (const route of routes) {

            const response = await axios.get(route);

            console.log(
                `✅ Backend Route Working: ${route} | Status: ${response.status}`
            );
        }

        console.log("\n🎉 BACKEND TEST PASSED");

    } catch (error) {

        console.log("\n❌ BACKEND TEST FAILED");
        console.error(error.message);

    }
})();