import { SiConvertio } from "react-icons/si";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { SharedFooter } from "@/components/shared-footer";
import { SEO } from "@/components/seo";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Free Online Image Converter - Convert Images Between Multiple Formats"
        description="Free online image converter. Convert between JPG, PNG, WebP, and more formats instantly. No registration required."
        keywords="image converter, convert image format, jpg converter, png converter, webp converter"
        canonicalUrl="/"
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
            Convert your images between formats instantly. Supporting JPEG, PNG, WebP, 
            and more formats. No registration required.
          </p>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Photo Converter */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center space-y-4">
                <ImageIcon className="w-12 h-12 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Photo Converter</h2>
                  <p className="text-muted-foreground mb-4">
                    Convert between JPEG, PNG, and WebP formats. Optimize your images for web use.
                  </p>
                  <Link href="/photo">
                    <Button className="w-full">Convert Photos</Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Animation Converter */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center space-y-4">
                <ImageIcon className="w-12 h-12 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Animation Converter</h2>
                  <p className="text-muted-foreground mb-4">
                    Convert and optimize animated GIFs. Reduce file size while maintaining quality.
                  </p>
                  <Link href="/animation">
                    <Button className="w-full">Convert Animations</Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Vector Converter */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center space-y-4">
                <ImageIcon className="w-12 h-12 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Vector Converter</h2>
                  <p className="text-muted-foreground mb-4">
                    Convert and optimize vector graphics. Perfect for logos and illustrations.
                  </p>
                  <Link href="/vector">
                    <Button className="w-full">Convert Vectors</Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-6">
            {/* Background Remover */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center space-y-4">
                <ImageIcon className="w-12 h-12 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Background Remover</h2>
                  <p className="text-muted-foreground mb-4">
                    Remove image backgrounds instantly using AI technology. 100% free and automatic.
                  </p>
                  <Link href="/remove-background-from-image">
                    <Button className="w-full">Remove Background</Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Image Resizer */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center space-y-4">
                <ImageIcon className="w-12 h-12 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Image Resizer</h2>
                  <p className="text-muted-foreground mb-4">
                    Resize your images to any dimension while maintaining quality. Perfect for social media.
                  </p>
                  <Link href="/image-resizer">
                    <Button className="w-full">Resize Images</Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <SharedFooter />
    </div>
  );
}