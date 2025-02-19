import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { supportedInputFormats, supportedOutputFormats } from "@shared/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Get format from mime type
export function getFormatFromMime(mimeType: string): string {
  // Special handling for svg+xml and x-icon
  if (mimeType === "image/svg+xml") return "svg";
  if (mimeType === "image/x-icon") return "ico";
  return mimeType.split('/')[1];
}

// Get mime type from format
export function getMimeFromFormat(format: string): string {
  // Special handling for svg and ico
  if (format === "svg") return "image/svg+xml";
  if (format === "ico") return "image/x-icon";
  return `image/${format}`;
}

// Generate URL for conversion route
export function getConversionUrl(fromFormat: string, toFormat: string): string {
  return `/convert/${fromFormat}-to-${toFormat}`;
}

// Generate all possible conversion combinations
export function getAllConversionRoutes(): { from: string, to: string, path: string }[] {
  const routes: { from: string, to: string, path: string }[] = [];

  // Get input formats without the MIME type prefix
  const inputFormats = supportedInputFormats.map(mime => getFormatFromMime(mime));

  for (const fromFormat of inputFormats) {
    for (const toFormat of supportedOutputFormats) {
      // Skip if formats are the same
      if (fromFormat !== toFormat) {
        const path = `/convert/${fromFormat}-to-${toFormat}`;
        routes.push({
          from: fromFormat,
          to: toFormat,
          path
        });
      }
    }
  }

  return routes;
}

// Generate sitemap entries for conversion routes
export function getConversionSitemapEntries(): { url: string, changefreq: string, priority: number }[] {
  return getAllConversionRoutes().map(route => ({
    url: route.path,
    changefreq: 'weekly',
    priority: 0.8
  }));
}