import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { UploadZone } from "./upload-zone";
import { convertImage } from "@/lib/api";
import type { SupportedOutputFormat } from "@shared/schema";
import { Download, RefreshCw, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImageConverter() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<SupportedOutputFormat>("jpeg");
  const [convertedImage, setConvertedImage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!selectedFile) return null;
      const result = await convertImage(selectedFile, targetFormat);
      return result;
    },
    onSuccess: (result) => {
      if (result?.result) {
        setConvertedImage(result.result);
        toast({
          title: "Conversion Complete",
          description: "Your image has been converted successfully"
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    }
  });

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setConvertedImage(null);
    }
  };

  const handleFormatChange = (format: SupportedOutputFormat) => {
    setTargetFormat(format);
    setConvertedImage(null);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Convert Images</h2>
        <p className="text-muted-foreground">
          Convert between multiple image formats including JPG, PNG, WebP, and more.
          Fast, free, and no registration required.
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <UploadZone
            onFileSelect={handleFileSelect}
            disabled={mutation.isPending}
          />

          {selectedFile && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["jpeg", "png", "webp", "pdf"].map((format) => (
                  <Button
                    key={format}
                    variant={targetFormat === format ? "default" : "outline"}
                    onClick={() => handleFormatChange(format as SupportedOutputFormat)}
                    className="w-full"
                    disabled={mutation.isPending}
                  >
                    {format.toUpperCase()}
                  </Button>
                ))}
              </div>

              <Button
                onClick={() => mutation.mutate()}
                disabled={!selectedFile || mutation.isPending}
                className="w-full"
              >
                {mutation.isPending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Converting...
                  </>
                ) : (
                  "Start Converting"
                )}
              </Button>
            </div>
          )}
        </div>
      </Card>

      {convertedImage && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="aspect-square max-w-sm mx-auto overflow-hidden rounded-lg border">
              {targetFormat === "pdf" ? (
                <div className="h-full w-full flex items-center justify-center bg-muted/30">
                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                </div>
              ) : (
                <img
                  src={convertedImage}
                  alt="Converted"
                  className="h-full w-full object-contain"
                />
              )}
            </div>
            <Button
              onClick={() => {
                const link = document.createElement("a");
                link.href = convertedImage;
                const extension = targetFormat === "jpeg" ? "jpg" : targetFormat;
                link.download = `converted.${extension}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}