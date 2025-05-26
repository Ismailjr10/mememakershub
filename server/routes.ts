import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertServiceSchema, insertBookingSchema, insertReferralSchema, insertAnalyticsSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/users/me", async (req, res) => {
    try {
      const firebaseUid = req.headers.authorization?.replace("Bearer ", "");
      if (!firebaseUid) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await storage.getUserByFirebaseUid(firebaseUid);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Generate unique referral code
      const referralCode = `MMH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      const user = await storage.createUser({
        ...userData,
        referralCode,
      });

      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      
      const user = await storage.updateUser(id, updates);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Service routes
  app.get("/api/services", async (req, res) => {
    try {
      const { category } = req.query;
      
      let services;
      if (category && typeof category === 'string') {
        services = await storage.getServicesByCategory(category);
      } else {
        services = await storage.getServices();
      }

      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.getService(id);
      
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/services", async (req, res) => {
    try {
      const serviceData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(serviceData);
      res.status(201).json(service);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid service data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Booking routes
  app.get("/api/bookings", async (req, res) => {
    try {
      const { userId, serviceId } = req.query;
      
      let bookings;
      if (userId) {
        bookings = await storage.getBookingsByUser(parseInt(userId as string));
      } else if (serviceId) {
        bookings = await storage.getBookingsByService(parseInt(serviceId as string));
      } else {
        bookings = await storage.getBookings();
      }

      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      
      // Create analytics event
      await storage.createAnalyticsEvent({
        userId: booking.userId,
        eventType: "service_booking",
        eventData: { bookingId: booking.id, serviceId: booking.serviceId },
      });

      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      
      const booking = await storage.updateBooking(id, updates);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Referral routes
  app.get("/api/referrals/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const referrals = await storage.getReferralsByReferrer(userId);
      res.json(referrals);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/referrals", async (req, res) => {
    try {
      const referralData = insertReferralSchema.parse(req.body);
      const referral = await storage.createReferral(referralData);

      // Create analytics event
      await storage.createAnalyticsEvent({
        userId: referral.referrerId,
        eventType: "referral",
        eventData: { referralId: referral.id, referredUserId: referral.referredUserId },
      });

      res.status(201).json(referral);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid referral data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Analytics routes
  app.get("/api/analytics/dashboard", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/analytics", async (req, res) => {
    try {
      const analyticsData = insertAnalyticsSchema.parse(req.body);
      const analytics = await storage.createAnalyticsEvent(analyticsData);
      res.status(201).json(analytics);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid analytics data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Admin routes
  app.get("/api/admin/users", async (req, res) => {
    try {
      // Check admin authorization here
      const users = await storage.getServices(); // This should be a proper admin user query
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/admin/bookings", async (req, res) => {
    try {
      // Check admin authorization here
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
