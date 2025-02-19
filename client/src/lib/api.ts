import { apiRequest } from "./queryClient";
import type { SupportedOutputFormat } from "@shared/schema";

interface ConversionOptions {
  compressionLevel?: number;
  removeBackground?: boolean;
}

export async function convertImage(
  file: File, 
  format: SupportedOutputFormat,
  options?: ConversionOptions
) {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("format", format);

  if (options?.compressionLevel !== undefined) {
    formData.append("compressionLevel", options.compressionLevel.toString());
  }

  if (options?.removeBackground !== undefined) {
    formData.append("removeBackground", options.removeBackground.toString());
  }

  const response = await fetch("/api/convert", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to convert image");
  }

  return response.json();
}