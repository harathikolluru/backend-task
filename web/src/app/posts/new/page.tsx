"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { posts, Post } from "@/data/posts";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be URL-friendly"),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).min(1, "Select at least one tag"),
  coverImageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type PostFormValues = z.infer<typeof postSchema>;

const TAG_OPTIONS = ["react", "typescript", "patterns", "tips", "nextjs"];

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function NewPostPage() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      tags: [],
      coverImageUrl: "",
    },
  });

  // Auto-generate slug from title unless user has manually edited slug
  const titleValue = watch("title");
  const slugValue = watch("slug");

  useEffect(() => {
    if (!slugManuallyEdited) {
      setValue("slug", slugify(titleValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleValue, slugManuallyEdited, setValue]);

  const onSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlugManuallyEdited(true);
    setValue("slug", slugify(e.target.value));
  };

  const onTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentTags = getValues("tags") || [];
    if (e.target.checked) {
      setValue("tags", [...currentTags, e.target.value]);
    } else {
      setValue("tags", currentTags.filter((tag) => tag !== e.target.value));
    }
  };

  const onSubmit = (data: PostFormValues) => {
    if (posts.some((p) => p.slug === data.slug)) {
      setFormError("A post with this slug already exists.");
      return;
    }
    posts.unshift({
      title: data.title,
      slug: data.slug,
      content: data.content,
      tags: data.tags,
      coverImageUrl: data.coverImageUrl || undefined,
    } as Post);
    router.push(`/posts/${data.slug}`);
  };

  const selectedTags = watch("tags") || [];

  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">New Blog Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {formError && (
          <Alert variant="destructive">
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}
        <div>
          <label className="block font-medium mb-1" htmlFor="title">
            Title<span className="text-red-500">*</span>
          </label>
          <Input id="title" {...register("title")} />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block font-medium mb-1" htmlFor="slug">
            Slug<span className="text-red-500">*</span>
          </label>
          <Input
            id="slug"
            {...register("slug")}
            value={slugValue}
            onChange={onSlugChange}
          />
          {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
        </div>
        <div>
          <label className="block font-medium mb-1" htmlFor="content">
            Content<span className="text-red-500">*</span>
          </label>
          <Textarea id="content" rows={6} {...register("content")} />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
        </div>
        <div>
          <label className="block font-medium mb-1">Tags<span className="text-red-500">*</span></label>
          <div className="flex flex-wrap gap-2">
            {TAG_OPTIONS.map((tag) => (
              <label key={tag} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={tag}
                  checked={selectedTags.includes(tag)}
                  onChange={onTagChange}
                  className="accent-blue-500"
                />
                <span>{tag}</span>
              </label>
            ))}
          </div>
          {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags.message as string}</p>}
        </div>
        <div>
          <label className="block font-medium mb-1" htmlFor="coverImageUrl">
            Cover Image URL
          </label>
          <Input id="coverImageUrl" {...register("coverImageUrl")} />
          {errors.coverImageUrl && <p className="text-red-500 text-sm mt-1">{errors.coverImageUrl.message}</p>}
        </div>
        <Button type="submit" className="w-full">Create Post</Button>
      </form>
    </main>
  );
}