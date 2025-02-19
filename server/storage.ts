import { imageJobs, type ImageJob, type InsertImageJob, adminUsers, type AdminUser, type InsertAdminUser, blogPosts, type BlogPost, type InsertBlogPost } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // Existing image job methods
  createImageJob(job: InsertImageJob): Promise<ImageJob>;
  getImageJob(id: number): Promise<ImageJob | undefined>;
  updateImageJob(id: number, updates: Partial<ImageJob>): Promise<ImageJob>;
  deleteImageJob(id: number): Promise<void>;

  // New admin user methods
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  getAdminUserById(id: number): Promise<AdminUser | undefined>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;

  // New blog post methods
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  updateBlogPost(id: number, updates: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;
  listPublishedBlogPosts(): Promise<BlogPost[]>;
  listAllBlogPosts(): Promise<BlogPost[]>;

  // Session store for authentication
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  // Existing image job methods
  async createImageJob(insertJob: InsertImageJob): Promise<ImageJob> {
    const [job] = await db
      .insert(imageJobs)
      .values(insertJob)
      .returning();
    return job;
  }

  async getImageJob(id: number): Promise<ImageJob | undefined> {
    const [job] = await db.select().from(imageJobs).where(eq(imageJobs.id, id));
    return job;
  }

  async updateImageJob(id: number, updates: Partial<ImageJob>): Promise<ImageJob> {
    const [job] = await db
      .update(imageJobs)
      .set(updates)
      .where(eq(imageJobs.id, id))
      .returning();

    if (!job) {
      throw new Error(`Job ${id} not found`);
    }

    return job;
  }

  async deleteImageJob(id: number): Promise<void> {
    await db.delete(imageJobs).where(eq(imageJobs.id, id));
  }

  // New admin user methods
  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    const [newUser] = await db.insert(adminUsers).values(user).returning();
    return newUser;
  }

  async getAdminUserById(id: number): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
    return user;
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return user;
  }

  // New blog post methods
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async updateBlogPost(id: number, updates: Partial<InsertBlogPost>): Promise<BlogPost> {
    const [post] = await db
      .update(blogPosts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();

    if (!post) {
      throw new Error(`Blog post ${id} not found`);
    }

    return post;
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  async listPublishedBlogPosts(): Promise<BlogPost[]> {
    return db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(blogPosts.createdAt);
  }

  async listAllBlogPosts(): Promise<BlogPost[]> {
    return db
      .select()
      .from(blogPosts)
      .orderBy(blogPosts.createdAt);
  }
}

export const storage = new DatabaseStorage();