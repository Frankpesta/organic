const { ConvexHttpClient } = require("convex/browser");

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

// Sample organic skincare products with open-source images
const sampleProducts = [
  {
    name: "Radiant Glow Vitamin C Serum",
    slug: "radiant-glow-vitamin-c-serum",
    description: "Transform your skin with our potent Vitamin C serum. This lightweight, fast-absorbing formula brightens dull skin, reduces dark spots, and provides powerful antioxidant protection. Made with 20% pure Vitamin C and organic botanical extracts for maximum efficacy.",
    shortDescription: "Brightening Vitamin C serum with 20% pure ascorbic acid",
    price: 45.00,
    comparePrice: 60.00,
    sku: "VCS-001",
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500&h=500&fit=crop&crop=center"
    ],
    categoryId: "face-care",
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
      "Organic Green Tea Extract"
    ],
    skinTypes: ["All Skin Types", "Dull Skin", "Aging Skin"],
    benefits: [
      "Brightens skin tone",
      "Reduces dark spots",
      "Boosts collagen production",
      "Protects against free radicals",
      "Improves skin texture"
    ],
    howToUse: "Apply 2-3 drops to clean skin in the morning. Follow with moisturizer and SPF. Start with every other day if you're new to Vitamin C.",
    seoTitle: "Radiant Glow Vitamin C Serum - Brightening Skincare",
    seoDescription: "Brighten your skin with our potent 20% Vitamin C serum. Reduces dark spots, boosts collagen, and provides antioxidant protection.",
    metaKeywords: ["vitamin c serum", "brightening serum", "dark spots", "antioxidant", "organic skincare"]
  },
  {
    name: "Hydrating Hyaluronic Acid Moisturizer",
    slug: "hydrating-hyaluronic-acid-moisturizer",
    description: "Intensely hydrate your skin with our Hyaluronic Acid moisturizer. This lightweight, non-greasy formula holds up to 1000x its weight in water, plumping fine lines and leaving skin dewy and supple. Perfect for all skin types, especially dry and dehydrated skin.",
    shortDescription: "Intense hydration with Hyaluronic Acid for plump, dewy skin",
    price: 38.00,
    comparePrice: 50.00,
    sku: "HAM-002",
    images: [
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop&crop=center"
    ],
    categoryId: "face-care",
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
      "Ceramides"
    ],
    skinTypes: ["All Skin Types", "Dry Skin", "Dehydrated Skin"],
    benefits: [
      "Intense hydration",
      "Plumps fine lines",
      "Non-greasy formula",
      "Locks in moisture",
      "Improves skin elasticity"
    ],
    howToUse: "Apply to clean skin morning and evening. Gently massage in upward motions until fully absorbed.",
    seoTitle: "Hydrating Hyaluronic Acid Moisturizer - Deep Hydration",
    seoDescription: "Get intense hydration with our Hyaluronic Acid moisturizer. Plumps fine lines and leaves skin dewy and supple.",
    metaKeywords: ["hyaluronic acid", "moisturizer", "hydration", "dry skin", "anti-aging"]
  },
  {
    name: "Gentle Cleansing Oil",
    slug: "gentle-cleansing-oil",
    description: "Remove makeup and impurities with our luxurious cleansing oil. This gentle formula melts away even waterproof makeup while nourishing your skin. Enriched with organic oils and botanical extracts for a spa-like cleansing experience.",
    shortDescription: "Luxurious oil cleanser that melts makeup and nourishes skin",
    price: 32.00,
    comparePrice: 42.00,
    sku: "GCO-003",
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500&h=500&fit=crop&crop=center"
    ],
    categoryId: "face-care",
    isActive: true,
    isFeatured: false,
    inventory: 60,
    weight: 150,
    ingredients: [
      "Organic Jojoba Oil",
      "Sweet Almond Oil",
      "Organic Rosehip Oil",
      "Vitamin E",
      "Organic Lavender Extract",
      "Natural Emulsifiers"
    ],
    skinTypes: ["All Skin Types", "Sensitive Skin", "Dry Skin"],
    benefits: [
      "Removes waterproof makeup",
      "Gentle on sensitive skin",
      "Nourishes while cleansing",
      "Doesn't strip natural oils",
      "Spa-like experience"
    ],
    howToUse: "Apply to dry skin and massage gently. Add water to emulsify, then rinse thoroughly with warm water.",
    seoTitle: "Gentle Cleansing Oil - Makeup Remover & Skin Nourisher",
    seoDescription: "Remove makeup gently with our nourishing cleansing oil. Enriched with organic oils for a spa-like experience.",
    metaKeywords: ["cleansing oil", "makeup remover", "oil cleanser", "sensitive skin", "organic"]
  },
  {
    name: "Nourishing Body Butter",
    slug: "nourishing-body-butter",
    description: "Indulge your skin with our rich, creamy body butter. Formulated with organic shea butter and essential oils, this luxurious moisturizer deeply nourishes dry skin and leaves it silky smooth. Perfect for daily use or as a special treat.",
    shortDescription: "Rich body butter with organic shea butter for silky smooth skin",
    price: 28.00,
    comparePrice: 35.00,
    sku: "NBB-004",
    images: [
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop&crop=center"
    ],
    categoryId: "body-care",
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
      "Organic Vanilla Extract"
    ],
    skinTypes: ["All Skin Types", "Dry Skin", "Sensitive Skin"],
    benefits: [
      "Deeply moisturizes",
      "Long-lasting hydration",
      "Silky smooth texture",
      "Natural fragrance",
      "Suitable for sensitive skin"
    ],
    howToUse: "Apply to clean, slightly damp skin after showering. Massage in circular motions until fully absorbed.",
    seoTitle: "Nourishing Body Butter - Organic Shea Butter Moisturizer",
    seoDescription: "Indulge with our rich body butter. Organic shea butter deeply nourishes and leaves skin silky smooth.",
    metaKeywords: ["body butter", "shea butter", "body moisturizer", "dry skin", "organic"]
  },
  {
    name: "Exfoliating Face Scrub",
    slug: "exfoliating-face-scrub",
    description: "Reveal brighter, smoother skin with our gentle exfoliating scrub. Made with natural jojoba beads and fruit enzymes, this scrub removes dead skin cells without irritation. Perfect for weekly use to maintain a healthy glow.",
    shortDescription: "Gentle exfoliating scrub with jojoba beads for brighter skin",
    price: 25.00,
    comparePrice: 32.00,
    sku: "EFS-005",
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500&h=500&fit=crop&crop=center"
    ],
    categoryId: "face-care",
    isActive: true,
    isFeatured: false,
    inventory: 35,
    weight: 100,
    ingredients: [
      "Jojoba Beads",
      "Papaya Enzyme",
      "Organic Aloe Vera",
      "Vitamin C",
      "Organic Green Tea Extract",
      "Natural Glycerin"
    ],
    skinTypes: ["All Skin Types", "Dull Skin", "Oily Skin"],
    benefits: [
      "Removes dead skin cells",
      "Brightens complexion",
      "Gentle exfoliation",
      "Improves skin texture",
      "Unclogs pores"
    ],
    howToUse: "Apply to wet skin and gently massage in circular motions for 30 seconds. Rinse thoroughly with warm water. Use 1-2 times per week.",
    seoTitle: "Exfoliating Face Scrub - Gentle Jojoba Bead Exfoliator",
    seoDescription: "Reveal brighter skin with our gentle exfoliating scrub. Natural jojoba beads remove dead skin cells safely.",
    metaKeywords: ["face scrub", "exfoliator", "jojoba beads", "brightening", "dead skin cells"]
  },
  {
    name: "Anti-Aging Night Cream",
    slug: "anti-aging-night-cream",
    description: "Wake up to younger-looking skin with our intensive night cream. This rich, luxurious formula works while you sleep to reduce fine lines, improve skin firmness, and restore your skin's natural radiance. Enriched with retinol and peptides.",
    shortDescription: "Intensive night cream with retinol and peptides for younger-looking skin",
    price: 65.00,
    comparePrice: 85.00,
    sku: "ANC-006",
    images: [
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop&crop=center"
    ],
    categoryId: "face-care",
    isActive: true,
    isFeatured: true,
    inventory: 30,
    weight: 50,
    ingredients: [
      "Retinol",
      "Peptides",
      "Hyaluronic Acid",
      "Vitamin E",
      "Organic Rosehip Oil",
      "Niacinamide"
    ],
    skinTypes: ["Mature Skin", "Aging Skin", "All Skin Types"],
    benefits: [
      "Reduces fine lines",
      "Improves skin firmness",
      "Boosts collagen production",
      "Intensive night treatment",
      "Restores radiance"
    ],
    howToUse: "Apply to clean skin before bed. Start with every other night if you're new to retinol. Always use SPF during the day.",
    seoTitle: "Anti-Aging Night Cream - Retinol & Peptide Treatment",
    seoDescription: "Wake up to younger skin with our intensive night cream. Retinol and peptides reduce fine lines while you sleep.",
    metaKeywords: ["night cream", "anti-aging", "retinol", "peptides", "fine lines", "collagen"]
  }
];

// Sample categories
const sampleCategories = [
  {
    name: "Face Care",
    slug: "face-care",
    description: "Complete facial skincare routine for healthy, glowing skin",
    isActive: true
  },
  {
    name: "Body Care",
    slug: "body-care", 
    description: "Nourishing body care products for silky smooth skin",
    isActive: true
  },
  {
    name: "Gift Sets",
    slug: "gift-sets",
    description: "Curated skincare sets perfect for gifting",
    isActive: true
  }
];

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // First, create categories
    console.log("📁 Creating categories...");
    for (const category of sampleCategories) {
      const result = await client.mutation("categories:createCategory", category);
      console.log(`✅ Created category: ${category.name}`);
    }

    // Then, create products
    console.log("🛍️ Creating products...");
    for (const product of sampleProducts) {
      const result = await client.mutation("products:createProduct", product);
      console.log(`✅ Created product: ${product.name}`);
    }

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
}

// Run the seeding
seedDatabase();
