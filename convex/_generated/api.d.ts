/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as admin from "../admin.js";
import type * as auth from "../auth.js";
import type * as cart from "../cart.js";
import type * as categories from "../categories.js";
import type * as email from "../email.js";
import type * as files from "../files.js";
import type * as orders from "../orders.js";
import type * as products from "../products.js";
import type * as promoteAdmin from "../promoteAdmin.js";
import type * as seed from "../seed.js";
import type * as seedData from "../seedData.js";
import type * as shipping from "../shipping.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  auth: typeof auth;
  cart: typeof cart;
  categories: typeof categories;
  email: typeof email;
  files: typeof files;
  orders: typeof orders;
  products: typeof products;
  promoteAdmin: typeof promoteAdmin;
  seed: typeof seed;
  seedData: typeof seedData;
  shipping: typeof shipping;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
