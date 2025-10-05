import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table (extends Clerk user data)
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    role: v.union(v.literal("customer"), v.literal("admin")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  // Product categories
  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
    isActive: v.boolean(),
    sortOrder: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_active", ["isActive"]),

  // Products
  products: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    shortDescription: v.string(),
    price: v.number(), // Base price in USD
    comparePrice: v.optional(v.number()), // Original price for discounts
    sku: v.string(),
    images: v.array(v.union(v.string(), v.id("_storage"))), // Array of URLs or storage IDs for images
    categoryId: v.id("categories"),
    isActive: v.boolean(),
    isFeatured: v.boolean(),
    inStock: v.boolean(),
    inventory: v.number(),
    weight: v.optional(v.number()), // For shipping calculations
    dimensions: v.optional(
      v.object({
        length: v.number(),
        width: v.number(),
        height: v.number(),
      }),
    ),
    ingredients: v.array(v.string()),
    skinTypes: v.array(v.string()), // e.g., ["oily", "dry", "sensitive"]
    benefits: v.array(v.string()),
    howToUse: v.optional(v.string()),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    metaKeywords: v.optional(v.array(v.string())),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["categoryId"])
    .index("by_active", ["isActive"])
    .index("by_featured", ["isFeatured"])
    .index("by_sku", ["sku"]),

  // Product variants (size, color, etc.)
  productVariants: defineTable({
    productId: v.id("products"),
    name: v.string(),
    sku: v.string(),
    price: v.number(),
    inventory: v.number(),
    attributes: v.object({
      size: v.optional(v.string()),
      color: v.optional(v.string()),
      type: v.optional(v.string()),
    }),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_product", ["productId"])
    .index("by_sku", ["sku"]),

  // Shopping cart
  cartItems: defineTable({
    userId: v.id("users"),
    productId: v.id("products"),
    variantId: v.optional(v.id("productVariants")),
    quantity: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_product", ["userId", "productId"]),

  // Orders
  orders: defineTable({
    orderNumber: v.string(),
    userId: v.id("users"),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled"),
      v.literal("refunded"),
    ),
    paymentStatus: v.union(
      v.literal("pending"),
      v.literal("paid"),
      v.literal("failed"),
      v.literal("refunded"),
    ),
    subtotal: v.number(),
    tax: v.number(),
    shipping: v.number(),
    discount: v.number(),
    total: v.number(),
    currency: v.string(),
    exchangeRate: v.optional(v.number()), // For PPP
    deliveryMethodId: v.optional(v.id("shippingMethods")),
    shippingAddress: v.object({
      firstName: v.string(),
      lastName: v.string(),
      company: v.optional(v.string()),
      address1: v.string(),
      address2: v.optional(v.string()),
      city: v.string(),
      state: v.string(),
      postalCode: v.string(),
      country: v.string(),
      phone: v.optional(v.string()),
    }),
    billingAddress: v.object({
      firstName: v.string(),
      lastName: v.string(),
      company: v.optional(v.string()),
      address1: v.string(),
      address2: v.optional(v.string()),
      city: v.string(),
      state: v.string(),
      postalCode: v.string(),
      country: v.string(),
      phone: v.optional(v.string()),
    }),
    stripePaymentIntentId: v.optional(v.string()),
    stripeSessionId: v.optional(v.string()),
    trackingNumber: v.optional(v.string()),
    notes: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_order_number", ["orderNumber"])
    .index("by_status", ["status"])
    .index("by_payment_status", ["paymentStatus"]),

  // Order items
  orderItems: defineTable({
    orderId: v.id("orders"),
    productId: v.id("products"),
    variantId: v.optional(v.id("productVariants")),
    productName: v.string(),
    productSku: v.string(),
    variantName: v.optional(v.string()),
    price: v.number(),
    quantity: v.number(),
    total: v.number(),
  }).index("by_order", ["orderId"]),

  // Product reviews
  reviews: defineTable({
    productId: v.id("products"),
    userId: v.id("users"),
    rating: v.number(), // 1-5 stars
    title: v.string(),
    comment: v.string(),
    isVerified: v.boolean(), // Verified purchase
    isApproved: v.boolean(),
    helpful: v.number(), // Number of helpful votes
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_product", ["productId"])
    .index("by_user", ["userId"])
    .index("by_approved", ["isApproved"]),

  // Wishlist
  wishlist: defineTable({
    userId: v.id("users"),
    productId: v.id("products"),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_product", ["userId", "productId"]),

  // Coupons and discounts
  coupons: defineTable({
    code: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    type: v.union(v.literal("percentage"), v.literal("fixed")),
    value: v.number(),
    minimumAmount: v.optional(v.number()),
    maximumDiscount: v.optional(v.number()),
    usageLimit: v.optional(v.number()),
    usedCount: v.number(),
    isActive: v.boolean(),
    validFrom: v.number(),
    validUntil: v.number(),
    applicableProducts: v.optional(v.array(v.id("products"))),
    applicableCategories: v.optional(v.array(v.id("categories"))),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_code", ["code"])
    .index("by_active", ["isActive"]),

  // Countries and PPP rates
  countries: defineTable({
    code: v.string(), // ISO country code
    name: v.string(),
    currency: v.string(),
    exchangeRate: v.number(), // To USD
    pppMultiplier: v.number(), // Purchasing Power Parity multiplier
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_code", ["code"])
    .index("by_active", ["isActive"]),

  // Site settings
  settings: defineTable({
    key: v.string(),
    value: v.any(),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),

  // Shipping methods
  shippingMethods: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    countryCode: v.string(), // "ALL" for international
    price: v.number(),
    freeShippingThreshold: v.optional(v.number()),
    estimatedDays: v.string(),
    isActive: v.boolean(),
    sortOrder: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_country", ["countryCode"])
    .index("by_active", ["isActive"])
    .index("by_sort_order", ["sortOrder"]),

  // Analytics and metrics
  analytics: defineTable({
    date: v.string(), // YYYY-MM-DD format
    metric: v.string(), // e.g., "page_views", "orders", "revenue"
    value: v.number(),
    metadata: v.optional(
      v.object({
        page: v.optional(v.string()),
        productId: v.optional(v.id("products")),
        categoryId: v.optional(v.id("categories")),
        country: v.optional(v.string()),
      }),
    ),
  })
    .index("by_date", ["date"])
    .index("by_metric", ["metric"])
    .index("by_date_metric", ["date", "metric"]),
});
