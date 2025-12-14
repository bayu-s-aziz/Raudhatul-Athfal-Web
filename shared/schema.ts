import { pgTable, text, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const schoolInfo = pgTable("school_info", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  tagline: text("tagline"),
  address: text("address").notNull(),
  phone: text("phone"),
  email: text("email"),
  vision: text("vision"),
  mission: text("mission").array(),
  history: text("history"),
  yearFounded: integer("year_founded"),
});

export const programs = pgTable("programs", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon"),
  order: integer("order").default(0),
});

export const facilities = pgTable("facilities", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  order: integer("order").default(0),
});

export const gallery = pgTable("gallery", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category"),
  order: integer("order").default(0),
});

export const announcements = pgTable("announcements", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  date: text("date").notNull(),
  isActive: boolean("is_active").default(true),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type SchoolInfo = typeof schoolInfo.$inferSelect;
export type Program = typeof programs.$inferSelect;
export type Facility = typeof facilities.$inferSelect;
export type GalleryItem = typeof gallery.$inferSelect;
export type Announcement = typeof announcements.$inferSelect;

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
