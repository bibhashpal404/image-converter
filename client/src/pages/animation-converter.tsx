import { ImageConverter } from "@/components/image-converter";
import { SiConvertio } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ImageIcon, Home } from "lucide-react";
import { SharedFooter } from "@/components/shared-footer";
import { SEO } from "@/components/seo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function AnimationConverter() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Free GIF Converter Online - Convert to GIF & Optimize Animations"
        description="Free GIF converter online. Convert images to GIF, optimize animations, and reduce file size. Best free gif converter with support for multiple formats."
        keywords="gif converter, convert to gif, free gif converter, animation converter, convert image to gif, optimize gif, reduce gif size"
        canonicalUrl="/animation"
      />

      <header className="relative py-16 bg-gradient-to-r from-primary/5 to-primary/10 border-b">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <SiConvertio className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            Free GIF Converter
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Convert your images to GIF format or optimize existing animations.
            Free, unlimited conversions with no registration required.
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
            <Link href="/animation">
              <Button variant="default" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Animation Converter
              </Button>
            </Link>
            <Link href="/vector">
              <Button variant="ghost" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Vector Converter
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
            <h2 className="text-2xl font-semibold mb-6">GIF Conversion Features</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Convert to GIF</h3>
                <p className="text-sm text-muted-foreground">
                  Transform your images or animations into GIF format easily
                </p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Optimize GIFs</h3>
                <p className="text-sm text-muted-foreground">
                  Reduce GIF file size while maintaining quality
                </p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Batch Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Convert multiple images to GIF format at once
                </p>
              </div>
            </div>
          </section>

          <ImageConverter supportedFormats={["gif"]} />

          <section className="mt-12">
            <h2 className="text-3xl font-semibold mb-6">How to Use the GIF Converter</h2>
            <div className="bg-muted/30 p-6 rounded-lg">
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                <li>Upload your image or animation files</li>
                <li>Select GIF as your output format</li>
                <li>Adjust optimization settings if needed</li>
                <li>Click "Convert" to process your files</li>
                <li>Download your converted GIF animations</li>
              </ol>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-semibold mb-6">GIF Converter FAQs</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I convert images to GIF format?</AccordionTrigger>
                <AccordionContent>
                  Simply upload your image, select GIF as the output format, and click convert. Our tool will process your image and create an optimized GIF file.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Can I reduce the size of my GIF files?</AccordionTrigger>
                <AccordionContent>
                  Yes! Our GIF converter includes optimization features that can reduce file size while maintaining good visual quality. This is perfect for web use.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>What types of files can I convert to GIF?</AccordionTrigger>
                <AccordionContent>
                  You can convert various image formats including JPG, PNG, and WebP to GIF. You can also optimize existing GIF files for better performance.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Is there a file size limit for GIF conversion?</AccordionTrigger>
                <AccordionContent>
                  We accept files up to 10MB per image. For larger files, we recommend using our optimization features to reduce the size first.
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