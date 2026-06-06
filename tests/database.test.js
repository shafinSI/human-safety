const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

(async function databaseTest() {
    try {
        await prisma.$connect();
        console.log("✅ Database Connected Successfully");

        await prisma.$disconnect();
        console.log("🎉 DATABASE TEST PASSED");

    } catch (error) {
        console.log("❌ DATABASE TEST FAILED");
        console.error(error.message);
    }
})();