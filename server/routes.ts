import type { Express } from "express";
import { createServer } from "http";
import multer from "multer";
import sharp from "sharp";
import cors from "cors";
import axios from "axios";
import { storage } from "./storage";
import { insertImageJobSchema, supportedInputFormats, supportedOutputFormats } from "@shared/schema";
import { z } from "zod";
import { removeBackground } from "@imgly/background-removal";
import { setupAuth, createInitialAdmin } from "./auth";
import { insertBlogPostSchema } from "@shared/schema";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (_req, file, cb) => {
    if (supportedInputFormats.includes(file.mimetype as any)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported format: ${file.mimetype}`));
    }
  }
});

export async function registerRoutes(app: Express) {
  // Setup authentication
  setupAuth(app);
  await createInitialAdmin();

  app.use(cors());

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // News API endpoint
  app.get('/api/news', async (_req, res) => {
    try {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: '(image processing OR artificial intelligence OR computer vision)',
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: 4, // Get 4 latest articles
          apiKey: process.env.NEWS_API_KEY
        }
      });

      res.json(response.data);
    } catch (error) {
      console.error('News API error:', error);
      res.status(500).json({ error: 'Failed to fetch news' });
    }
  });

  // Add blog management routes
  app.post("/api/blog", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      const postData = insertBlogPostSchema.parse({
        ...req.body,
        authorId: req.user.id
      });

      const post = await storage.createBlogPost(postData);
      res.status(201).json(post);
    } catch (err) {
      console.error("Failed to create blog post:", err);
      res.status(400).json({ error: "Invalid blog post data" });
    }
  });

  app.get("/api/blog", async (_req, res) => {
    try {
      const posts = await storage.listPublishedBlogPosts();
      res.json(posts);
    } catch (err) {
      console.error("Failed to list blog posts:", err);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/all", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      const posts = await storage.listAllBlogPosts();
      res.json(posts);
    } catch (err) {
      console.error("Failed to list all blog posts:", err);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) return res.status(404).json({ error: "Blog post not found" });
      res.json(post);
    } catch (err) {
      console.error("Failed to get blog post:", err);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  app.patch("/api/blog/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      const post = await storage.updateBlogPost(parseInt(req.params.id), req.body);
      res.json(post);
    } catch (err) {
      console.error("Failed to update blog post:", err);
      res.status(400).json({ error: "Failed to update blog post" });
    }
  });

  app.delete("/api/blog/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      await storage.deleteBlogPost(parseInt(req.params.id));
      res.sendStatus(204);
    } catch (err) {
      console.error("Failed to delete blog post:", err);
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  app.post("/api/convert", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        throw new Error("No file uploaded");
      }

      const format = z.enum(supportedOutputFormats).parse(req.body.format);
      const compressionLevel = req.body.compressionLevel ? parseInt(req.body.compressionLevel) : 85;
      const shouldRemoveBackground = req.body.removeBackground === 'true';

      const job = await storage.createImageJob({
        originalName: req.file.originalname,
        targetFormat: format,
        settings: {
          compressionLevel,
          removeBackground: shouldRemoveBackground
        }
      });

      try {
        let processedBuffer = req.file.buffer;

        // Handle background removal first if requested
        if (shouldRemoveBackground) {
          try {
            // Convert to PNG first for better background removal
            const pngBuffer = await sharp(processedBuffer)
              .toFormat('png')
              .toBuffer();

            // Remove background
            const removedBgBuffer = await removeBackground(pngBuffer);

            // Convert back to buffer for further processing
            processedBuffer = Buffer.from(await removedBgBuffer.arrayBuffer());
          } catch (error) {
            console.error("Background removal error:", error);
            throw new Error("Failed to remove background. Please try again with a different image.");
          }
        }

        let result: Buffer;

        // Handle format conversion
        if (format === 'svg') {
          // For SVG output, convert to PNG
          result = await sharp(processedBuffer)
            .toFormat('png')
            .toBuffer();
        } else if (format === 'ico') {
          // For ICO output, resize and convert
          result = await sharp(processedBuffer)
            .resize(256, 256)
            .toFormat('png')
            .toBuffer();
        } else {
          // For all other formats
          result = await sharp(processedBuffer)
            .toFormat(format as keyof sharp.FormatEnum, {
              quality: compressionLevel,
              ...(format === 'png' ? {
                compressionLevel: Math.floor(compressionLevel / 10),
                palette: true
              } : {}),
              ...(format === 'jpeg' ? {
                mozjpeg: true,
                quality: compressionLevel
              } : {}),
              ...(format === 'webp' ? {
                lossless: compressionLevel === 100,
                quality: compressionLevel
              } : {})
            })
            .toBuffer();
        }

        const base64 = `data:${format === 'svg' ? 'image/svg+xml' : `image/${format}`};base64,${result.toString('base64')}`;

        await storage.updateImageJob(job.id, {
          status: "completed",
          progress: 100,
          result: base64
        });

        res.json({ id: job.id, result: base64 });
      } catch (err) {
        const error = err as Error;
        console.error("Conversion error:", error);
        await storage.updateImageJob(job.id, {
          status: "failed",
          error: error.message
        });
        throw error;
      }
    } catch (err) {
      const error = err as Error;
      console.error("Request error:", error);
      res.status(400).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}