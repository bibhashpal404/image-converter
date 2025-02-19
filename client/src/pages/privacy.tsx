import { SiConvertio } from "react-icons/si";
import { SharedFooter } from "@/components/shared-footer";
import { SEO } from "@/components/seo";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Privacy Policy - Free Image Converter"
        description="Learn how we protect your privacy while using our free image conversion service. No data collection, secure processing, and instant file deletion after conversion."
        keywords="image converter privacy, secure image conversion, private image processing, no data collection, secure file handling"
        canonicalUrl="/privacy"
      />

      <header className="relative py-16 bg-gradient-to-r from-primary/5 to-primary/10 border-b">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <SiConvertio className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn how we protect your privacy
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
            <h2 className="text-3xl font-bold mb-4">Data Collection</h2>
            <p className="text-muted-foreground">
              We do not collect or store any personal information. The images you upload for conversion
              are processed entirely in your browser and are not stored on our servers. We don't use
              cookies or tracking mechanisms to monitor user behavior.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Image Processing</h2>
            <p className="text-muted-foreground">
              All image processing is done locally in your browser. Your files never leave your device
              during the conversion process. After conversion is complete, both the original and
              converted images are immediately removed from memory.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Third-Party Services</h2>
            <p className="text-muted-foreground">
              We don't use any third-party analytics or tracking services. Our website is hosted on
              secure servers, but we don't store any user data or conversion history.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about our privacy policy or how we handle your data,
              please feel free to contact us.
            </p>
          </section>
        </div>
      </main>

      <SharedFooter />
    </div>
  );
}