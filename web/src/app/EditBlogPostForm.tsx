"use client";

import { useState, useEffect } from "react";
import { useGetBlogPostBySlugQuery, useUpdateBlogPostMutation } from "@/store/api/enhanced/blogPosts";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

export default function EditBlogPostForm() {
  const params = useParams();
  const slug = params?.slug as string;
  const { data: post, isLoading } = useGetBlogPostBySlugQuery({ slug });
  const [updateBlogPost, { isLoading: isUpdating, isSuccess, error }] = useUpdateBlogPostMutation();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
    coverImageUrl: "",
  });

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title ?? "",
        content: post.content ?? "",
        tags: post.tags?.join(", ") ?? "",
        coverImageUrl: post.coverImageUrl ?? "",
      });
    }
  }, [post]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBlogPost({
      id: post!.id!,
      updateBlogPostDto: {
        title: form.title,
        content: form.content,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        coverImageUrl: form.coverImageUrl || null,
      },
    }).unwrap();
    router.push("/");
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <Textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} required />
      <Input name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} />
      <Input name="coverImageUrl" placeholder="Cover Image URL" value={form.coverImageUrl} onChange={handleChange} />
      <Button type="submit" disabled={isUpdating}>Update Post</Button>
      {isSuccess && <div className="text-green-600">Post updated!</div>}
      {error && <div className="text-red-500">Error updating post</div>}
    </form>
  );
}