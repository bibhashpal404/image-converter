import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBlogPostSchema, type BlogPost } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { Loader2, Pencil, Trash, Upload } from "lucide-react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Switch } from "@/components/ui/switch";

export default function AdminDashboard() {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertBlogPostSchema),
    defaultValues: {
      title: "",
      content: "",
      metaTitle: "",
      metaDescription: "",
      slug: "",
      published: false,
      authorId: user?.id,
      bannerImage: "",
      coverImage: ""
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
  });

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('format', 'webp');

    const response = await fetch('/api/convert', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Failed to upload image');
    const data = await response.json();
    return data.result;
  };

  const onDropBanner = useCallback(async (acceptedFiles: File[]) => {
    try {
      const file = acceptedFiles[0];
      const imageUrl = await uploadImage(file);
      form.setValue('bannerImage', imageUrl);
      toast({
        title: "Success",
        description: "Banner image uploaded successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload banner image",
        variant: "destructive"
      });
    }
  }, []);

  const onDropCover = useCallback(async (acceptedFiles: File[]) => {
    try {
      const file = acceptedFiles[0];
      const imageUrl = await uploadImage(file);
      form.setValue('coverImage', imageUrl);
      toast({
        title: "Success",
        description: "Cover image uploaded successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload cover image",
        variant: "destructive"
      });
    }
  }, []);

  const { getRootProps: getBannerProps, getInputProps: getBannerInputProps } = useDropzone({
    onDrop: onDropBanner,
    accept: { 'image/*': [] },
    maxFiles: 1
  });

  const { getRootProps: getCoverProps, getInputProps: getCoverInputProps } = useDropzone({
    onDrop: onDropCover,
    accept: { 'image/*': [] },
    maxFiles: 1
  });

  const createPostMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!editor?.getHTML()) {
        throw new Error("Content cannot be empty");
      }

      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          content: editor?.getHTML() || '',
          authorId: user?.id
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create post');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/all"] });
      form.reset();
      editor?.commands.setContent('');
      toast({
        title: "Success",
        description: "Blog post created successfully"
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Failed to delete post");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/all"] });
      toast({
        title: "Success",
        description: "Blog post deleted successfully"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const onSubmit = form.handleSubmit((data) => {
    createPostMutation.mutate(data);
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/all"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Dashboard</h1>
        <Button
          variant="outline"
          onClick={() => logoutMutation.mutate()}
        >
          Logout
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6 mb-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          form.setValue('slug', generateSlug(e.target.value));
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Slug</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div {...getBannerProps()} className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer">
                  <input {...getBannerInputProps()} />
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2">Drop banner image here or click to upload</p>
                  {form.watch('bannerImage') && (
                    <img src={form.watch('bannerImage')} alt="Banner preview" className="mt-4 max-h-32 mx-auto" />
                  )}
                </div>

                <div {...getCoverProps()} className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer">
                  <input {...getCoverInputProps()} />
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2">Drop cover image here or click to upload</p>
                  {form.watch('coverImage') && (
                    <img src={form.watch('coverImage')} alt="Cover preview" className="mt-4 max-h-32 mx-auto" />
                  )}
                </div>
              </div>

              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Publish
                      </FormLabel>
                      <FormDescription>
                        Make this post public on your blog
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Content</FormLabel>
                <div className="border rounded-md p-2">
                  <div className="border-b pb-2 mb-2 flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                    >
                      H1
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                    >
                      H2
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => editor?.chain().focus().toggleBold().run()}
                    >
                      Bold
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => editor?.chain().focus().toggleItalic().run()}
                    >
                      Italic
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    >
                      Bullet List
                    </Button>
                  </div>
                  <EditorContent editor={editor} className="min-h-[200px] prose max-w-none" />
                </div>
              </div>

              <Button type="submit" disabled={createPostMutation.isPending}>
                {createPostMutation.isPending && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Publish Post
              </Button>
            </div>
          </Card>
        </form>
      </Form>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">All Posts</h2>
        {posts?.map((post) => (
          <Card key={post.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    form.reset(post);
                    editor?.commands.setContent(post.content);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => deletePostMutation.mutate(post.id)}
                  disabled={deletePostMutation.isPending}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}