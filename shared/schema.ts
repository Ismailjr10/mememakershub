import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firebaseUid: text("firebase_uid").unique(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  walletAddress: text("wallet_address"),
  walletType: text("wallet_type"), // 'ethereum' | 'solana'
  membershipTier: text("membership_tier").notNull().default("basic"), // 'basic' | 'pro' | 'enterprise'
  referralCode: text("referral_code").unique(),
  referredBy: integer("referred_by"),
  totalReferrals: integer("total_referrals").default(0),
  referralEarnings: decimal("referral_earnings", { precision: 18, scale: 8 }).default("0"),
  nftBadges: jsonb("nft_badges").default("[]"),
  isVerified: boolean("is_verified").default(false),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // 'community' | 'design' | 'marketing' | 'advisory' | 'technical' | 'complete'
  price: decimal("price", { precision: 18, scale: 8 }).notNull(),
  currency: text("currency").notNull().default("ETH"), // 'ETH' | 'SOL' | 'USDC'
  features: jsonb("features").default("[]"),
  providerId: integer("provider_id").references(() => users.id),
  isActive: boolean("is_active").default(true),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  totalBookings: integer("total_bookings").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  serviceId: integer("service_id").references(() => services.id).notNull(),
  status: text("status").notNull().default("pending"), // 'pending' | 'approved' | 'in_progress' | 'completed' | 'cancelled'
  amount: decimal("amount", { precision: 18, scale: 8 }).notNull(),
  currency: text("currency").notNull(),
  paymentTxHash: text("payment_tx_hash"),
  requirements: text("requirements"),
  deliverables: jsonb("deliverables").default("[]"),
  milestones: jsonb("milestones").default("[]"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const referrals = pgTable("referrals", {
  id: serial("id").primaryKey(),
  referrerId: integer("referrer_id").references(() => users.id).notNull(),
  referredUserId: integer("referred_user_id").references(() => users.id).notNull(),
  bookingId: integer("booking_id").references(() => bookings.id),
  commissionRate: decimal("commission_rate", { precision: 5, scale: 4 }).notNull(),
  commissionAmount: decimal("commission_amount", { precision: 18, scale: 8 }).notNull(),
  status: text("status").notNull().default("pending"), // 'pending' | 'paid' | 'cancelled'
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  eventType: text("event_type").notNull(), // 'page_view' | 'service_booking' | 'referral' | 'payment'
  eventData: jsonb("event_data").default("{}"),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many, one }) => ({
  referredUsers: many(users, { relationName: "referrer" }),
  referrer: one(users, {
    fields: [users.referredBy],
    references: [users.id],
    relationName: "referrer",
  }),
  bookings: many(bookings),
  services: many(services),
  referralsMade: many(referrals, { relationName: "referrer" }),
  referralsReceived: many(referrals, { relationName: "referred" }),
  analytics: many(analytics),
}));

export const servicesRelations = relations(services, ({ one, many }) => ({
  provider: one(users, {
    fields: [services.providerId],
    references: [users.id],
  }),
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  service: one(services, {
    fields: [bookings.serviceId],
    references: [services.id],
  }),
  referrals: many(referrals),
}));

export const referralsRelations = relations(referrals, ({ one }) => ({
  referrer: one(users, {
    fields: [referrals.referrerId],
    references: [users.id],
    relationName: "referrer",
  }),
  referredUser: one(users, {
    fields: [referrals.referredUserId],
    references: [users.id],
    relationName: "referred",
  }),
  booking: one(bookings, {
    fields: [referrals.bookingId],
    references: [bookings.id],
  }),
}));

export const analyticsRelations = relations(analytics, ({ one }) => ({
  user: one(users, {
    fields: [analytics.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertReferralSchema = createInsertSchema(referrals).omit({
  id: true,
  createdAt: true,
});

export const insertAnalyticsSchema = createInsertSchema(analytics).omit({
  id: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Referral = typeof referrals.$inferSelect;
export type InsertReferral = z.infer<typeof insertReferralSchema>;
export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
