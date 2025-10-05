const { ConvexHttpClient } = require("convex/browser");

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

async function seedDatabase() {
  try {
    console.log("🌱 Seeding database...");

    const result = await client.mutation("seed:seedDatabase", {});

    console.log("✅ Database seeded successfully!");
    console.log(result);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
}

seedDatabase();
