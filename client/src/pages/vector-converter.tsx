import { ImageConverter } from "@/components/image-converter";
import { SiConvertio } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ImageIcon, Home } from "lucide-react";
import { SharedFooter } from "@/components/shared-footer";
import { SEO } from "@/components/seo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function VectorConverter() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Free SVG Converter Online - Convert Vector Graphics & Icons | Image Converter"
        description="Free SVG converter online. Convert between vector formats, optimize SVG files. Best free svg converter for icons and vector graphics. No registration required."
        keywords="svg converter, free svg converter, convert to svg, icon converter, png to ico, convert to ico, svg converter free"
        canonicalUrl="/vector"
      />

      <header className="relative py-16 bg-gradient-to-r from-primary/5 to-primary/10 border-b">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <SiConvertio className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            Vector & Icon Converter
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Convert and optimize your vector graphics and icons.
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
              <Button variant="ghost" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Animation Converter
              </Button>
            </Link>
            <Link href="/vector">
              <Button variant="default" className="flex items-center gap-2">
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
            <h2 className="text-2xl font-semibold mb-6">Vector Conversion Features</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">SVG Conversion</h3>
                <p className="text-sm text-muted-foreground">
                  Convert between SVG and other vector formats
                </p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Icon Converter</h3>
                <p className="text-sm text-muted-foreground">
                  Convert images to ICO format for website favicons
                </p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Vector Optimization</h3>
                <p className="text-sm text-muted-foreground">
                  Optimize SVG files for web use
                </p>
              </div>
            </div>
          </section>

          <ImageConverter 
            supportedFormats={["svg", "ico", "png"]} 
            showCompressionOptions={true}
          />

          <section className="mt-12">
            <h2 className="text-3xl font-semibold mb-6">How to Convert Vector Graphics</h2>
            <div className="bg-muted/30 p-6 rounded-lg">
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                <li>Upload your vector graphic or icon file</li>
                <li>Select your desired output format (SVG, ICO)</li>
                <li>Adjust optimization settings if needed</li>
                <li>Click "Convert" to process your file</li>
                <li>Download your converted vector graphic</li>
              </ol>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-semibold mb-6">Vector Converter FAQs</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I convert images to SVG format?</AccordionTrigger>
                <AccordionContent>
                  For best results, upload a vector-based file or a high-quality image. Select SVG as the output format and click convert. Note that converting raster images to SVG may not produce ideal results.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Can I convert PNG to ICO for my website favicon?</AccordionTrigger>
                <AccordionContent>
                  Yes! Upload your PNG image and select ICO as the output format. We'll create a properly sized favicon for your website.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>What's the difference between vector and raster graphics?</AccordionTrigger>
                <AccordionContent>
                  Vector graphics (like SVG) use mathematical formulas to draw shapes, making them infinitely scalable without losing quality. Raster graphics (like PNG, JPG) use pixels and can become blurry when enlarged.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How can I optimize my SVG files?</AccordionTrigger>
                <AccordionContent>
                  Our converter automatically optimizes SVG files by removing unnecessary code and compressing the output while maintaining quality and functionality.
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