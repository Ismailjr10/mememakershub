import { users, services, bookings, referrals, analytics, type User, type InsertUser, type Service, type InsertService, type Booking, type InsertBooking, type Referral, type InsertReferral, type Analytics, type InsertAnalytics } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sum, count } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByReferralCode(referralCode: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;

  // Service operations
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  getServicesByCategory(category: string): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, updates: Partial<Service>): Promise<Service | undefined>;

  // Booking operations
  getBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  getBookingsByUser(userId: number): Promise<Booking[]>;
  getBookingsByService(serviceId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: number, updates: Partial<Booking>): Promise<Booking | undefined>;

  // Referral operations
  getReferrals(): Promise<Referral[]>;
  getReferralsByReferrer(referrerId: number): Promise<Referral[]>;
  createReferral(referral: InsertReferral): Promise<Referral>;
  updateReferral(id: number, updates: Partial<Referral>): Promise<Referral | undefined>;

  // Analytics operations
  createAnalyticsEvent(analytics: InsertAnalytics): Promise<Analytics>;
  getAnalyticsByUser(userId: number): Promise<Analytics[]>;
  getDashboardStats(): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.firebaseUid, firebaseUid));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async getUserByReferralCode(referralCode: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.referralCode, referralCode));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  // Service operations
  async getServices(): Promise<Service[]> {
    return await db.select().from(services).where(eq(services.isActive, true)).orderBy(desc(services.createdAt));
  }

  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || undefined;
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    return await db.select().from(services).where(and(eq(services.category, category), eq(services.isActive, true)));
  }

  async createService(insertService: InsertService): Promise<Service> {
    const [service] = await db
      .insert(services)
      .values(insertService)
      .returning();
    return service;
  }

  async updateService(id: number, updates: Partial<Service>): Promise<Service | undefined> {
    const [service] = await db
      .update(services)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
    return service || undefined;
  }

  // Booking operations
  async getBookings(): Promise<Booking[]> {
    return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }

  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return await db.select().from(bookings).where(eq(bookings.userId, userId)).orderBy(desc(bookings.createdAt));
  }

  async getBookingsByService(serviceId: number): Promise<Booking[]> {
    return await db.select().from(bookings).where(eq(bookings.serviceId, serviceId)).orderBy(desc(bookings.createdAt));
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db
      .insert(bookings)
      .values(insertBooking)
      .returning();
    return booking;
  }

  async updateBooking(id: number, updates: Partial<Booking>): Promise<Booking | undefined> {
    const [booking] = await db
      .update(bookings)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(bookings.id, id))
      .returning();
    return booking || undefined;
  }

  // Referral operations
  async getReferrals(): Promise<Referral[]> {
    return await db.select().from(referrals).orderBy(desc(referrals.createdAt));
  }

  async getReferralsByReferrer(referrerId: number): Promise<Referral[]> {
    return await db.select().from(referrals).where(eq(referrals.referrerId, referrerId));
  }

  async createReferral(insertReferral: InsertReferral): Promise<Referral> {
    const [referral] = await db
      .insert(referrals)
      .values(insertReferral)
      .returning();
    return referral;
  }

  async updateReferral(id: number, updates: Partial<Referral>): Promise<Referral | undefined> {
    const [referral] = await db
      .update(referrals)
      .set(updates)
      .where(eq(referrals.id, id))
      .returning();
    return referral || undefined;
  }

  // Analytics operations
  async createAnalyticsEvent(insertAnalytics: InsertAnalytics): Promise<Analytics> {
    const [analyticsEvent] = await db
      .insert(analytics)
      .values(insertAnalytics)
      .returning();
    return analyticsEvent;
  }

  async getAnalyticsByUser(userId: number): Promise<Analytics[]> {
    return await db.select().from(analytics).where(eq(analytics.userId, userId)).orderBy(desc(analytics.timestamp));
  }

  async getDashboardStats(): Promise<any> {
    const [totalUsers] = await db.select({ count: count() }).from(users);
    const [totalBookings] = await db.select({ count: count() }).from(bookings);
    const [totalRevenue] = await db.select({ total: sum(bookings.amount) }).from(bookings).where(eq(bookings.status, 'completed'));
    
    return {
      totalUsers: totalUsers.count,
      totalBookings: totalBookings.count,
      totalRevenue: totalRevenue.total || '0',
    };
  }
}

export const storage = new DatabaseStorage();
