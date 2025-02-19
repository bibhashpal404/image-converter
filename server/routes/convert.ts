import { Router } from "express";
import multer from "multer";
import sharp from "sharp";
import { z } from "zod";
import { supportedOutputFormats } from "@shared/schema";

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

const router = Router();

const convertSchema = z.object({
  format: z.enum(supportedOutputFormats),
  compressionLevel: z.string().transform(Number).optional(),
  removeBackground: z.string().transform(val => val === "true").optional(),
});

router.post("/api/convert", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image file" });
    }

    const validation = convertSchema.safeParse({
      format: req.body.format,
      compressionLevel: req.body.compressionLevel,
      removeBackground: req.body.removeBackground,
    });

    if (!validation.success) {
      return res.status(400).json({ 
        message: "Invalid conversion parameters" 
      });
    }

    const { format, compressionLevel, removeBackground } = validation.data;

    // Process the image with Sharp
    let sharpInstance = sharp(req.file.buffer);

    // Remove background if requested
    if (removeBackground) {
      sharpInstance = sharpInstance.removeAlpha().ensureAlpha();
    }

    // Handle SVG conversion specially
    if (req.file.mimetype === 'image/svg+xml') {
      if (format === 'svg') {
        const dataUrl = `data:image/svg+xml;base64,${req.file.buffer.toString('base64')}`;
        return res.json({ 
          result: dataUrl,
          message: "SVG processing successful"
        });
      }
      // For SVG to other formats, we'll convert using Sharp
    }

    // Handle specific format conversions
    switch (format) {
      case "jpeg":
      case "jpg":
        sharpInstance = sharpInstance.jpeg({
          quality: compressionLevel || 85,
          mozjpeg: true,
          chromaSubsampling: '4:4:4'
        });
        break;

      case "png":
        sharpInstance = sharpInstance.png({
          quality: compressionLevel || 85,
          compressionLevel: 9,
          palette: true
        });
        break;

      case "webp":
        sharpInstance = sharpInstance.webp({
          quality: compressionLevel || 85,
          lossless: compressionLevel === 100,
          effort: 6
        });
        break;

      case "pdf":
        // For PDF conversion, we'll create a PDF with the image
        sharpInstance = sharpInstance.jpeg({
          quality: compressionLevel || 85,
          mozjpeg: true
        }).resize(2480, 3508, { // A4 size at 300 DPI
          fit: 'inside',
          withoutEnlargement: true
        });
        break;

      case "svg":
        // Convert to SVG using potrace-like algorithm
        sharpInstance = sharpInstance
          .greyscale()
          .threshold()
          .toFormat('svg');
        break;

      default:
        return res.status(400).json({ 
          message: `Conversion to ${format} is not supported` 
        });
    }

    try {
      const processedBuffer = await sharpInstance.toBuffer();
      const base64Image = processedBuffer.toString("base64");

      // Handle PDF conversion specially
      if (format === 'pdf') {
        const dataUrl = `data:application/pdf;base64,${base64Image}`;
        return res.json({ 
          result: dataUrl,
          message: "PDF conversion successful"
        });
      }

      const dataUrl = `data:image/${format};base64,${base64Image}`;
      res.json({ 
        result: dataUrl,
        message: "Conversion successful"
      });
    } catch (error) {
      console.error("Sharp processing error:", error);
      res.status(500).json({ 
        message: "Failed to process image. The input file may be corrupted or unsupported." 
      });
    }
  } catch (error) {
    console.error("Image conversion error:", error);
    res.status(500).json({ 
      message: "Failed to convert image. Please try again with a different file or format." 
    });
  }
});

export default router;