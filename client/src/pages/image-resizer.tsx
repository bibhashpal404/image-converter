import { ImageConverter } from "@/components/image-converter";
import { SiConvertio } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ImageIcon, Home } from "lucide-react";
import { SharedFooter } from "@/components/shared-footer";
import { SEO } from "@/components/seo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ImageResizer() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Free Image Resizer - Resize Images Online Without Quality Loss"
        description="Resize images online for free. Best image resizer with custom dimensions and aspect ratio control. No quality loss, no registration required."
        keywords="image resizer, resize image online, free image resizer, resize picture, change image size, resize photos online"
        canonicalUrl="/image-resizer"
      />

      <header className="relative py-16 bg-gradient-to-r from-primary/5 to-primary/10 border-b">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <SiConvertio className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            Free Image Resizer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Resize your images instantly while maintaining quality.
            100% free, no registration required.
          </p>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -right-4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </div>
      </header>

      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-4 overflow-x-auto">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
            <Link href="/photo">
              <Button variant="ghost" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Photo Converter
              </Button>
            </Link>
            <Link href="/remove-background-from-image">
              <Button variant="ghost" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Background Remover
              </Button>
            </Link>
            <Link href="/image-resizer">
              <Button variant="default" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Image Resizer
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="ghost" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Blog
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Image Resizing Features</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Custom Dimensions</h3>
                <p className="text-sm text-muted-foreground">
                  Resize to any width and height you need
                </p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Quality Control</h3>
                <p className="text-sm text-muted-foreground">
                  Adjust compression to balance quality and file size
                </p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Batch Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Resize multiple images at once
                </p>
              </div>
            </div>
          </section>

          <ImageConverter 
            supportedFormats={["jpeg", "png", "webp"]} 
            showCompressionOptions={true}
          />

          <section className="mt-12">
            <h2 className="text-3xl font-semibold mb-6">How to Resize Images</h2>
            <div className="bg-muted/30 p-6 rounded-lg">
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                <li>Upload your image(s)</li>
                <li>Enter desired dimensions or percentage</li>
                <li>Choose to maintain aspect ratio if needed</li>
                <li>Click resize to process your images</li>
                <li>Download your resized images</li>
              </ol>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-semibold mb-6">Image Resizer FAQs</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I maintain image quality while resizing?</AccordionTrigger>
                <AccordionContent>
                  Our resizer uses advanced algorithms to maintain image quality. When downsizing, it intelligently reduces pixels, and when enlarging, it uses smart interpolation to prevent pixelation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What's the maximum image size I can resize?</AccordionTrigger>
                <AccordionContent>
                  You can upload images up to 10MB. There's no limit on output dimensions, but we recommend staying within reasonable sizes for web use.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Can I resize multiple images at once?</AccordionTrigger>
                <AccordionContent>
                  Yes! Our batch processing feature allows you to resize multiple images simultaneously while maintaining consistent dimensions across all files.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>What formats are supported for resizing?</AccordionTrigger>
                <AccordionContent>
                  We support all common image formats including JPG, PNG, and WebP. You can also convert between formats while resizing.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </main>

      <SharedFooter />
    </div>
  );
}