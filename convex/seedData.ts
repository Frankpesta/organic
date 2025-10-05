import { mutation } from "./_generated/server";

export default mutation(async (ctx) => {
  console.log("🌱 Starting database seeding...");

  // Sample categories
  const categories = [
    {
      name: "Face Care",
      slug: "face-care",
      description: "Complete facial skincare routine for healthy, glowing skin",
      isActive: true,
      sortOrder: 1,
    },
    {
      name: "Body Care",
      slug: "body-care",
      description: "Nourishing body care products for silky smooth skin",
      isActive: true,
      sortOrder: 2,
    },
    {
      name: "Gift Sets",
      slug: "gift-sets",
      description: "Curated skincare sets perfect for gifting",
      isActive: true,
      sortOrder: 3,
    },
  ];

  // Sample products
  const products = [
    {
      name: "Radiant Glow Vitamin C Serum",
      slug: "radiant-glow-vitamin-c-serum",
      description:
        "Transform your skin with our potent Vitamin C serum. This lightweight, fast-absorbing formula brightens dull skin, reduces dark spots, and provides powerful antioxidant protection. Made with 20% pure Vitamin C and organic botanical extracts for maximum efficacy.",
      shortDescription:
        "Brightening Vitamin C serum with 20% pure ascorbic acid",
      price: 45.0,
      comparePrice: 60.0,
      sku: "VCS-001",
      images: [
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500&h=500&fit=crop&crop=center",
      ],
      categoryId: null as any, // Will be set after categories are created
      isActive: true,
      isFeatured: true,
      inventory: 50,
      weight: 30,
      ingredients: [
        "20% Pure Vitamin C (Ascorbic Acid)",
        "Hyaluronic Acid",
        "Organic Aloe Vera",
        "Vitamin E",
        "Ferulic Acid",
        "Organic Green Tea Extract",
      ],
      skinTypes: ["All Skin Types", "Dull Skin", "Aging Skin"],
      benefits: [
        "Brightens skin tone",
        "Reduces dark spots",
        "Boosts collagen production",
        "Protects against free radicals",
        "Improves skin texture",
      ],
      howToUse:
        "Apply 2-3 drops to clean skin in the morning. Follow with moisturizer and SPF. Start with every other day if you're new to Vitamin C.",
      seoTitle: "Radiant Glow Vitamin C Serum - Brightening Skincare",
      seoDescription:
        "Brighten your skin with our potent 20% Vitamin C serum. Reduces dark spots, boosts collagen, and provides antioxidant protection.",
      metaKeywords: [
        "vitamin c serum",
        "brightening serum",
        "dark spots",
        "antioxidant",
        "organic skincare",
      ],
    },
    {
      name: "Hydrating Hyaluronic Acid Moisturizer",
      slug: "hydrating-hyaluronic-acid-moisturizer",
      description:
        "Intensely hydrate your skin with our Hyaluronic Acid moisturizer. This lightweight, non-greasy formula holds up to 1000x its weight in water, plumping fine lines and leaving skin dewy and supple. Perfect for all skin types, especially dry and dehydrated skin.",
      shortDescription:
        "Intense hydration with Hyaluronic Acid for plump, dewy skin",
      price: 38.0,
      comparePrice: 50.0,
      sku: "HAM-002",
      images: [
        "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop&crop=center",
      ],
      categoryId: null as any,
      isActive: true,
      isFeatured: true,
      inventory: 75,
      weight: 50,
      ingredients: [
        "Hyaluronic Acid",
        "Organic Jojoba Oil",
        "Shea Butter",
        "Vitamin E",
        "Organic Chamomile Extract",
        "Ceramides",
      ],
      skinTypes: ["All Skin Types", "Dry Skin", "Dehydrated Skin"],
      benefits: [
        "Intense hydration",
        "Plumps fine lines",
        "Non-greasy formula",
        "Locks in moisture",
        "Improves skin elasticity",
      ],
      howToUse:
        "Apply to clean skin morning and evening. Gently massage in upward motions until fully absorbed.",
      seoTitle: "Hydrating Hyaluronic Acid Moisturizer - Deep Hydration",
      seoDescription:
        "Get intense hydration with our Hyaluronic Acid moisturizer. Plumps fine lines and leaves skin dewy and supple.",
      metaKeywords: [
        "hyaluronic acid",
        "moisturizer",
        "hydration",
        "dry skin",
        "anti-aging",
      ],
    },
    {
      name: "Nourishing Body Butter",
      slug: "nourishing-body-butter",
      description:
        "Indulge your skin with our rich, creamy body butter. Formulated with organic shea butter and essential oils, this luxurious moisturizer deeply nourishes dry skin and leaves it silky smooth. Perfect for daily use or as a special treat.",
      shortDescription:
        "Rich body butter with organic shea butter for silky smooth skin",
      price: 28.0,
      comparePrice: 35.0,
      sku: "NBB-004",
      images: [
        "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop&crop=center",
      ],
      categoryId: null as any,
      isActive: true,
      isFeatured: true,
      inventory: 40,
      weight: 200,
      ingredients: [
        "Organic Shea Butter",
        "Cocoa Butter",
        "Coconut Oil",
        "Vitamin E",
        "Organic Lavender Essential Oil",
        "Organic Vanilla Extract",
      ],
      skinTypes: ["All Skin Types", "Dry Skin", "Sensitive Skin"],
      benefits: [
        "Deeply moisturizes",
        "Long-lasting hydration",
        "Silky smooth texture",
        "Natural fragrance",
        "Suitable for sensitive skin",
      ],
      howToUse:
        "Apply to clean, slightly damp skin after showering. Massage in circular motions until fully absorbed.",
      seoTitle: "Nourishing Body Butter - Organic Shea Butter Moisturizer",
      seoDescription:
        "Indulge with our rich body butter. Organic shea butter deeply nourishes and leaves skin silky smooth.",
      metaKeywords: [
        "body butter",
        "shea butter",
        "body moisturizer",
        "dry skin",
        "organic",
      ],
    },
  ];

  try {
    // Create categories first
    console.log("📁 Creating categories...");
    const createdCategories: Record<string, any> = {};

    for (const category of categories) {
      const categoryId = await ctx.db.insert("categories", {
        ...category,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      createdCategories[category.slug] = categoryId;
      console.log(`✅ Created category: ${category.name}`);
    }

    // Update product categoryIds
    products[0].categoryId = createdCategories["face-care"];
    products[1].categoryId = createdCategories["face-care"];
    products[2].categoryId = createdCategories["body-care"];

    // Create products
    console.log("🛍️ Creating products...");
    for (const product of products) {
      const productId = await ctx.db.insert("products", {
        ...product,
        inStock: product.inventory > 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      console.log(`✅ Created product: ${product.name}`);
    }

    console.log("🎉 Database seeding completed successfully!");
    return { success: true, message: "Database seeded successfully!" };
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    return { success: false, error: (error as Error).message };
  }
});
