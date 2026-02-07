import { db } from "./db";
import { departments, subjects } from "./db/schema";

async function testConnection() {
  try {
    console.log("Testing database connection and tables...\n");

    // Test: Query departments table
    const deptResult = await db.select().from(departments);
    console.log("✅ Departments table exists!");
    console.log(`   Found ${deptResult.length} departments\n`);

    // Test: Query subjects table
    const subjectResult = await db.select().from(subjects);
    console.log("✅ Subjects table exists!");
    console.log(`   Found ${subjectResult.length} subjects\n`);

    console.log("🎉 All tables created successfully in your Neon database!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

testConnection();
