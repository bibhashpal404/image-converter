import { ImageConverter } from "@/components/image-converter";
import { SiConvertio } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ImageIcon, Home } from "lucide-react";
import { SharedFooter } from "@/components/shared-footer";
import { SEO } from "@/components/seo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function BackgroundRemover() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Free Background Remover - Remove Image Background Online | Image Converter"
        description="Remove background from images online for free. Best AI-powered background remover. No registration required, instant background removal for any image."
        keywords="remove background from image, background remover, remove background online, free background remover, transparent background, remove image background"
        canonicalUrl="/remove-background-from-image"
      />

      <header className="relative py-16 bg-gradient-to-r from-primary/5 to-primary/10 border-b">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <SiConvertio className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            Free Background Remover
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Remove background from any image instantly.
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
              <Button variant="default" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Background Remover
              </Button>
            </Link>
            <Link href="/image-resizer">
              <Button variant="ghost" className="flex items-center gap-2">
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
            <h2 className="text-2xl font-semibold mb-6">Background Removal Features</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced AI technology for precise background removal
                </p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Instant Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Remove backgrounds in seconds with high accuracy
                </p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Any Image Type</h3>
                <p className="text-sm text-muted-foreground">
                  Works with all image formats and sizes
                </p>
              </div>
            </div>
          </section>

          <ImageConverter 
            supportedFormats={["png"]} 
            showBackgroundRemoval={true}
          />

          <section className="mt-12">
            <h2 className="text-3xl font-semibold mb-6">How to Remove Image Background</h2>
            <div className="bg-muted/30 p-6 rounded-lg">
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                <li>Upload your image by clicking or dragging and dropping</li>
                <li>Wait a few seconds for automatic background removal</li>
                <li>Download your image with transparent background</li>
                <li>Use the preview to check the result</li>
                <li>Free to use for any image</li>
              </ol>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-semibold mb-6">Background Remover FAQs</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How does the background remover work?</AccordionTrigger>
                <AccordionContent>
                  Our background remover uses advanced AI technology to automatically detect and remove backgrounds from images. It works with any image type and produces high-quality results with transparent backgrounds.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What image formats are supported?</AccordionTrigger>
                <AccordionContent>
                  You can upload images in JPG, PNG, or WebP format. The result will be provided as a PNG file with a transparent background.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Is there a size limit for images?</AccordionTrigger>
                <AccordionContent>
                  We accept images up to 10MB in size. For larger images, we recommend compressing them first using our image optimizer.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Can I remove background from multiple images?</AccordionTrigger>
                <AccordionContent>
                  Yes! You can upload and process multiple images at once. Each image will be processed individually with its background removed.
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