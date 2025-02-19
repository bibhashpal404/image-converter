import { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";
import { Link } from "wouter";
import { SiConvertio } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { ImageIcon, Home, ExternalLink } from "lucide-react";
import { SharedFooter } from "@/components/shared-footer";
import { SEO } from "@/components/seo";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { type BlogPost } from "@shared/schema";

interface NewsItem {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export default function Blog() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const { data: blogPosts, isLoading: isLoadingPosts } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news');
        setNews(response.data.articles);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const toolsList = [
    { name: "Photo Converter", path: "/photo" },
    { name: "Animation Converter", path: "/animation" },
    { name: "Vector Converter", path: "/vector" },
    { name: "Background Remover", path: "/remove-background-from-image" },
    { name: "Image Resizer", path: "/image-resizer" },
  ];

  const formatNewsUrl = (title: string) => {
    return `/news/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`;
  };

  const getFirstParagraph = (text: string) => {
    return text.split('. ')[0] + '.';
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Image Processing & AI News - Latest Updates | Image Converter Blog"
        description="Stay updated with the latest news about image processing, AI tools, and video technology. Plus, access our free image conversion tools."
        keywords="image processing news, AI news, image conversion tools, free image converter, image processing updates"
        canonicalUrl="/blog"
      />

      <header className="relative py-16 bg-gradient-to-r from-primary/5 to-primary/10 border-b">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <SiConvertio className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            Latest Image Processing & AI News
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest developments in image processing, AI tools, and video technology
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
            <Link href="/blog">
              <Button variant="default" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Blog
              </Button>
            </Link>
            {user && (
              <Link href="/admin/dashboard">
                <Button variant="ghost" className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Admin Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {!isLoadingPosts && blogPosts && blogPosts.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-semibold mb-8">Latest Blog Posts</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {blogPosts.map((post) => (
                  <article key={post.id} className="bg-card rounded-lg overflow-hidden shadow-sm h-full flex flex-col">
                    {post.bannerImage && (
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={post.bannerImage}
                          alt={post.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {format(new Date(post.createdAt), 'MMMM dd, yyyy')}
                      </p>
                      <div 
                        className="text-muted-foreground mb-6 flex-1 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />
                      <Link href={`/blog/${post.slug}`}>
                        <Button className="w-full">Read More</Button>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-8">Latest News</h2>
            {loading ? (
              <div className="grid gap-8 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse bg-card rounded-lg overflow-hidden">
                    <div className="h-48 bg-muted" />
                    <div className="p-6">
                      <div className="h-6 bg-muted rounded w-3/4 mb-4" />
                      <div className="h-4 bg-muted rounded w-1/4 mb-4" />
                      <div className="h-20 bg-muted rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2">
                {news.map((item, index) => (
                  <article key={index} className="bg-card rounded-lg overflow-hidden shadow-sm h-full flex flex-col">
                    {item.urlToImage && (
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={item.urlToImage}
                          alt={item.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold mb-2 line-clamp-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {format(new Date(item.publishedAt), 'MMMM dd, yyyy')} • {item.source.name}
                      </p>
                      <p className="text-muted-foreground mb-6 flex-1">
                        {getFirstParagraph(item.description)}
                      </p>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="dofollow noreferrer"
                        className="inline-block"
                      >
                        <Button className="flex items-center gap-2 w-full justify-center">
                          Read Full Article
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Ad placement before tools section */}
          <div className="my-8">
            <ins className="adsbygoogle"
                 style={{ display: 'block' }}
                 data-ad-client="ca-pub-9401558657961246"
                 data-ad-slot="auto"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
          </div>

          <section className="mt-16 p-8 bg-muted/30 rounded-lg">
            <h2 className="text-3xl font-semibold mb-6">Convert Your Images for Free</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Use our world-class image conversion tools to transform your images into any format you need. 
              All tools are completely free and require no registration.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {toolsList.map((tool) => (
                <Link key={tool.path} href={tool.path}>
                  <Button variant="secondary" className="w-full">
                    {tool.name}
                  </Button>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <SharedFooter />
    </div>
  );
}