import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "./ui/card";
import { supportedInputFormats } from "@shared/schema";
import { Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onFileSelect: (files: File[]) => void;
  disabled?: boolean;
}

export function UploadZone({ onFileSelect, disabled }: UploadZoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: Object.fromEntries(supportedInputFormats.map(type => [type, []])),
    disabled,
    multiple: true
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative p-12 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200",
        "hover:border-primary/50 hover:bg-primary/[0.02]",
        isDragActive && "border-primary bg-primary/5 scale-[1.02]",
        disabled && "opacity-50 cursor-not-allowed hover:border-muted hover:bg-transparent"
      )}
    >
      <input {...getInputProps()} />

      <div className="relative z-10 text-center">
        <div className="mb-6 relative">
          <Upload 
            className={cn(
              "w-16 h-16 mx-auto text-muted-foreground/60 transition-transform duration-200",
              isDragActive && "scale-110 text-primary"
            )} 
          />
          <ImageIcon className="w-8 h-8 absolute bottom-0 right-1/2 translate-x-8 translate-y-2 text-primary/60" />
        </div>

        <h3 className="text-xl font-semibold mb-2">
          {isDragActive ? "Drop your images here" : "Drag & drop images here"}
        </h3>

        <p className="text-muted-foreground mb-4">
          Or click to select from your computer
        </p>

        <div className="text-sm text-muted-foreground/60">
          Supported formats: 
          <span className="font-medium">
            {" JPEG, PNG, GIF, BMP, WebP, TIFF"}
          </span>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.02] to-transparent" />
      </div>
    </Card>
  );
}