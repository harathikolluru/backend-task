"use client";

import { useState } from "react";
import { useCreateBlogPostMutation } from "@/store/api/enhanced/blogPosts";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type FormState = {
  title: string;
  slug: string;
  content: string;
  tags: string;
  coverImageUrl: string;
};

export default function CreateBlogPostForm() {
  const [createBlogPost, { isLoading, error, isSuccess }] = useCreateBlogPostMutation();
  const [form, setForm] = useState<FormState>({
    title: "",
    slug: "",
    content: "",
    tags: "",
    coverImageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBlogPost({
      createBlogPostDto: {
        ...form,
        tags: form.tags
          ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
        coverImageUrl: form.coverImageUrl || null,
      },
    }).unwrap()
      .then(() => {
        setForm({
          title: "",
          slug: "",
          content: "",
          tags: "",
          coverImageUrl: "",
        });
      })
      .catch(() => {
        // Error handled by error state
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <Input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} required />
      <Textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} required />
      <Input name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} />
      <Input name="coverImageUrl" placeholder="Cover Image URL" value={form.coverImageUrl} onChange={handleChange} />
      <Button type="submit" disabled={isLoading}>Create Post</Button>
      {isSuccess && <div className="text-green-600">Post created successfully!</div>}
      {error && (
        <div className="text-red-500">
          {typeof error === "object" && "status" in error
            ? "Error creating post"
            : String(error)}
        </div>
      )}
    </form>
  );
}