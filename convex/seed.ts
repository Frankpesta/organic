import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    // Create categories
    const faceCareId = await ctx.db.insert("categories", {
      name: "Face Care",
      slug: "face-care",
      description: "Complete facial skincare routine products",
      isActive: true,
      sortOrder: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    const bodyCareId = await ctx.db.insert("categories", {
      name: "Body Care",
      slug: "body-care", 
      description: "Body care and moisturizing products",
      isActive: true,
      sortOrder: 2,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    const giftSetsId = await ctx.db.insert("categories", {
      name: "Gift Sets",
      slug: "gift-sets",
      description: "Curated skincare gift sets",
      isActive: true,
      sortOrder: 3,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Create sample products
    const products = [
      {
        name: "Hydrating Vitamin C Serum",
        slug: "hydrating-vitamin-c-serum",
        description: "A powerful vitamin C serum that brightens skin and reduces dark spots while providing deep hydration. Formulated with 20% vitamin C and hyaluronic acid for maximum effectiveness.",
        shortDescription: "Brightening vitamin C serum with hyaluronic acid",
        price: 49.00,
        comparePrice: 65.00,
        sku: "HBS-VC-001",
        images: ["/products/vitamin-c-serum.jpg"],
        categoryId: faceCareId,
        isActive: true,
        isFeatured: true,
        inventory: 50,
        weight: 0.1,
        ingredients: ["Vitamin C", "Hyaluronic Acid", "Aloe Vera", "Green Tea Extract"],
        skinTypes: ["all", "dry", "combination"],
        benefits: ["Brightens skin", "Reduces dark spots", "Deep hydration", "Anti-aging"],
        howToUse: "Apply 2-3 drops to clean skin morning and evening. Gently pat into skin until absorbed.",
        seoTitle: "Hydrating Vitamin C Serum - Helen's Beauty Secret",
        seoDescription: "Brighten your skin with our hydrating vitamin C serum. 20% vitamin C with hyaluronic acid for maximum effectiveness.",
        metaKeywords: ["vitamin c serum", "brightening serum", "anti-aging", "hydrating serum"],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        name: "Gentle Foaming Cleanser",
        slug: "gentle-foaming-cleanser",
        description: "A gentle yet effective foaming cleanser that removes dirt, oil, and makeup without stripping your skin. Perfect for all skin types, especially sensitive skin.",
        shortDescription: "Gentle foaming cleanser for all skin types",
        price: 29.00,
        comparePrice: 39.00,
        sku: "HBS-CL-001",
        images: ["/products/foaming-cleanser.jpg"],
        categoryId: faceCareId,
        isActive: true,
        isFeatured: true,
        inventory: 75,
        weight: 0.2,
        ingredients: ["Aloe Vera", "Chamomile Extract", "Coconut Oil", "Glycerin"],
        skinTypes: ["all", "sensitive", "oily"],
        benefits: ["Gentle cleansing", "Removes makeup", "Suitable for sensitive skin", "Non-stripping"],
        howToUse: "Wet face with lukewarm water. Apply cleanser and gently massage in circular motions. Rinse thoroughly.",
        seoTitle: "Gentle Foaming Cleanser - Helen's Beauty Secret",
        seoDescription: "Gentle foaming cleanser that removes dirt and makeup without stripping skin. Perfect for sensitive skin.",
        metaKeywords: ["gentle cleanser", "foaming cleanser", "sensitive skin", "face wash"],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        name: "Anti-Aging Night Cream",
        slug: "anti-aging-night-cream",
        description: "Rich night cream formulated with retinol and peptides to reduce fine lines and wrinkles while you sleep. Wake up to smoother, more youthful-looking skin.",
        shortDescription: "Rich night cream with retinol and peptides",
        price: 79.00,
        comparePrice: 99.00,
        sku: "HBS-NC-001",
        images: ["/products/night-cream.jpg"],
        categoryId: faceCareId,
        isActive: true,
        isFeatured: true,
        inventory: 30,
        weight: 0.15,
        ingredients: ["Retinol", "Peptides", "Shea Butter", "Jojoba Oil", "Vitamin E"],
        skinTypes: ["mature", "dry", "combination"],
        benefits: ["Reduces fine lines", "Firms skin", "Deep moisturizing", "Anti-aging"],
        howToUse: "Apply to clean skin before bedtime. Gently massage in upward motions until absorbed.",
        seoTitle: "Anti-Aging Night Cream - Helen's Beauty Secret",
        seoDescription: "Rich night cream with retinol and peptides to reduce fine lines and wrinkles while you sleep.",
        metaKeywords: ["anti-aging cream", "night cream", "retinol cream", "wrinkle cream"],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        name: "Hydrating Body Lotion",
        slug: "hydrating-body-lotion",
        description: "Ultra-hydrating body lotion that nourishes and softens skin from head to toe. Lightweight formula absorbs quickly without leaving a greasy residue.",
        shortDescription: "Ultra-hydrating body lotion for all skin types",
        price: 35.00,
        comparePrice: 45.00,
        sku: "HBS-BL-001",
        images: ["/products/body-lotion.jpg"],
        categoryId: bodyCareId,
        isActive: true,
        isFeatured: false,
        inventory: 60,
        weight: 0.5,
        ingredients: ["Shea Butter", "Coconut Oil", "Aloe Vera", "Vitamin E"],
        skinTypes: ["all", "dry"],
        benefits: ["Deep hydration", "Softens skin", "Quick absorption", "Non-greasy"],
        howToUse: "Apply to clean, dry skin after showering. Massage gently until absorbed.",
        seoTitle: "Hydrating Body Lotion - Helen's Beauty Secret",
        seoDescription: "Ultra-hydrating body lotion that nourishes and softens skin without greasy residue.",
        metaKeywords: ["body lotion", "hydrating lotion", "moisturizer", "body care"],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        name: "Complete Skincare Set",
        slug: "complete-skincare-set",
        description: "Everything you need for a complete skincare routine. Includes cleanser, serum, moisturizer, and eye cream. Perfect for beginners or as a gift.",
        shortDescription: "Complete 4-piece skincare routine set",
        price: 149.00,
        comparePrice: 199.00,
        sku: "HBS-SET-001",
        images: ["/products/skincare-set.jpg"],
        categoryId: giftSetsId,
        isActive: true,
        isFeatured: true,
        inventory: 25,
        weight: 0.8,
        ingredients: ["Complete skincare routine", "All natural ingredients"],
        skinTypes: ["all"],
        benefits: ["Complete routine", "Perfect for beginners", "Great gift", "Value set"],
        howToUse: "Follow the included routine guide for best results.",
        seoTitle: "Complete Skincare Set - Helen's Beauty Secret",
        seoDescription: "Complete 4-piece skincare routine set with everything you need for healthy, glowing skin.",
        metaKeywords: ["skincare set", "gift set", "complete routine", "skincare bundle"],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ];

    // Insert products
    for (const product of products) {
      await ctx.db.insert("products", {
        ...product,
        inStock: product.inventory > 0,
      });
    }

    // Create some sample countries for PPP
    const countries = [
      {
        code: "US",
        name: "United States",
        currency: "USD",
        exchangeRate: 1.0,
        pppMultiplier: 1.0,
        isActive: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        code: "GB",
        name: "United Kingdom",
        currency: "GBP",
        exchangeRate: 0.79,
        pppMultiplier: 0.85,
        isActive: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        code: "CA",
        name: "Canada",
        currency: "CAD",
        exchangeRate: 1.35,
        pppMultiplier: 1.1,
        isActive: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        code: "AU",
        name: "Australia",
        currency: "AUD",
        exchangeRate: 1.52,
        pppMultiplier: 1.2,
        isActive: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ];

    for (const country of countries) {
      await ctx.db.insert("countries", country);
    }

    // Create some sample settings
    const settings = [
      {
        key: "site_name",
        value: "Helen's Beauty Secret",
        updatedAt: Date.now(),
      },
      {
        key: "site_description",
        value: "Pure, organic skincare that transforms your complexion naturally.",
        updatedAt: Date.now(),
      },
      {
        key: "currency",
        value: "USD",
        updatedAt: Date.now(),
      },
      {
        key: "free_shipping_threshold",
        value: 75,
        updatedAt: Date.now(),
      },
    ];

    for (const setting of settings) {
      await ctx.db.insert("settings", setting);
    }

    return { message: "Database seeded successfully!" };
  },
});
