import { ImageConverter } from "@/components/image-converter";
import { SiConvertio } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ImageIcon, Home } from "lucide-react";
import { SharedFooter } from "@/components/shared-footer";
import { SEO } from "@/components/seo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PhotoConverter() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Free Online Image Converter - Convert Images Between Multiple Formats"
        description="Convert images between multiple formats including JPG, PNG, WebP, PDF and more. Free online image converter with quality control. No registration required."
        keywords="image converter, convert image format, jpg converter, png converter, webp converter, image format converter"
        canonicalUrl="/photo"
      />

      <header className="relative py-16 bg-gradient-to-r from-primary/5 to-primary/10 border-b">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <SiConvertio className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            Free Image Converter
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Convert between multiple image formats instantly. 
            Supporting JPG, PNG, WebP, PDF, and more.
            Free and unlimited conversions.
          </p>
        </div>
      </header>

      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
            <Button variant="default" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Image Converter
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Popular Conversion Types</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">WEBP to PNG</h3>
                <p className="text-sm text-muted-foreground">
                  Convert WebP images to PNG format for better compatibility
                </p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">PNG to JPG</h3>
                <p className="text-sm text-muted-foreground">
                  Convert PNG images to JPG format
                </p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">PNG to PDF</h3>
                <p className="text-sm text-muted-foreground">
                  Convert PNG images to PDF documents
                </p>
              </div>
            </div>
          </section>

          <ImageConverter 
            supportedFormats={["jpeg", "jpg", "png", "webp", "pdf"]} 
            showCompressionOptions={true}
          />

          <section className="mt-12">
            <h2 className="text-3xl font-semibold mb-6">How to Convert Images</h2>
            <div className="bg-muted/30 p-6 rounded-lg">
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                <li>Upload your image file(s)</li>
                <li>Select your desired output format</li>
                <li>Adjust quality settings if needed</li>
                <li>Click convert and wait for processing</li>
                <li>Download your converted images</li>
              </ol>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What image formats are supported?</AccordionTrigger>
                <AccordionContent>
                  Our converter supports all popular image formats including JPG, PNG, WebP, and PDF. You can convert between any of these formats while maintaining the best possible quality.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Is there a file size limit?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can upload files up to 10MB in size. For larger files, we recommend using the compression options to reduce the file size first.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How can I maintain the best quality?</AccordionTrigger>
                <AccordionContent>
                  For best quality, use the quality slider to adjust compression levels. Higher values maintain better quality but result in larger file sizes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Can I convert multiple images at once?</AccordionTrigger>
                <AccordionContent>
                  Yes! Our batch conversion feature allows you to convert multiple images at the same time. Simply select all the files you want to convert.
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