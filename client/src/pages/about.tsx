import { SiConvertio } from "react-icons/si";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <header className="relative py-16 bg-gradient-to-r from-primary/5 to-primary/10 border-b">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <SiConvertio className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            About Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn more about our image conversion service
          </p>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -right-4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <div className="prose prose-lg mx-auto">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              We provide a fast, free, and secure image conversion service to help users transform their images
              into any format they need. Our platform is designed to be user-friendly and accessible to everyone,
              whether you're a professional designer or just need to convert a few personal photos.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Quick and easy image format conversion</li>
              <li>Support for multiple image formats including JPEG, PNG, WebP, and SVG</li>
              <li>Batch processing capabilities</li>
              <li>Secure and private file handling</li>
              <li>No registration required</li>
              <li>Free to use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Security & Privacy</h2>
            <p className="text-muted-foreground">
              Your privacy and security are our top priorities. All file processing is done in your browser,
              and we don't store any of your images on our servers. Files are automatically deleted after
              conversion is complete.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Fast, free, and secure image conversion</p>
        </div>
      </footer>
    </div>
  );
}
