import { pgTable, text, serial, integer, jsonb, timestamp, boolean, array } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Existing image jobs table
export const imageJobs = pgTable("image_jobs", {
  id: serial("id").primaryKey(),
  originalName: text("original_name").notNull(),
  targetFormat: text("target_format").notNull(),
  status: text("status").notNull().default("pending"),
  progress: integer("progress").notNull().default(0),
  result: text("result"),
  error: text("error"),
  settings: jsonb("settings").notNull().default({})
});

// Conversion tools table for SEO and UI
export const conversionTools = pgTable("conversion_tools", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  sourceFormat: text("source_format").notNull(),
  targetFormat: text("target_format").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  faqs: jsonb("faqs").notNull().default([]),
  metaTitle: text("meta_title").notNull(),
  metaDescription: text("meta_description").notNull(),
  active: boolean("active").notNull().default(true),
  priority: integer("priority").notNull().default(0)
});

// Admin users table remains unchanged
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

// Blog posts table remains unchanged
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  metaTitle: text("meta_title").notNull(),
  metaDescription: text("meta_description").notNull(),
  coverImage: text("cover_image"),
  bannerImage: text("banner_image"),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
  authorId: integer("author_id").references(() => adminUsers.id).notNull()
});

// Schemas
export const insertImageJobSchema = createInsertSchema(imageJobs).pick({
  originalName: true,
  targetFormat: true,
  settings: true
});

export const insertConversionToolSchema = createInsertSchema(conversionTools).omit({
  id: true
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).pick({
  username: true,
  password: true
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// Types
export type InsertImageJob = z.infer<typeof insertImageJobSchema>;
export type ImageJob = typeof imageJobs.$inferSelect;

export type InsertConversionTool = z.infer<typeof insertConversionToolSchema>;
export type ConversionTool = typeof conversionTools.$inferSelect;

export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// Input/Output formats updated with all supported formats
export const supportedInputFormats = [
  "image/jpeg", 
  "image/jpg",
  "image/png", 
  "image/gif", 
  "image/bmp", 
  "image/webp", 
  "image/tiff",
  "image/svg+xml",
  "image/x-icon",
  "application/pdf"
] as const;

export const supportedOutputFormats = [
  "jpeg", 
  "jpg",
  "png", 
  "gif", 
  "bmp", 
  "webp",
  "svg",
  "ico",
  "tiff",
  "pdf"
] as const;

export type SupportedInputFormat = typeof supportedInputFormats[number];
export type SupportedOutputFormat = typeof supportedOutputFormats[number];

// FAQ Schema for conversion tools
export const faqSchema = z.object({
  question: z.string(),
  answer: z.string()
});

export type FAQ = z.infer<typeof faqSchema>;
