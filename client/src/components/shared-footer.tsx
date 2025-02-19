import { Link } from "wouter";

export function SharedFooter() {
  return (
    <footer className="border-t py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-2">Image Converter</h3>
            <p className="text-sm text-muted-foreground">
              Fast, free, and secure image conversion
            </p>
          </div>

          <div className="text-center space-x-4">
            <Link href="/about">
              <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                About Us
              </span>
            </Link>
            <Link href="/privacy">
              <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Privacy Policy
              </span>
            </Link>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Image Converter. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}