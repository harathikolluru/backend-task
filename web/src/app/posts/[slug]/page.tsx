"use client";
import { posts } from "@/data/posts";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";

export default function PostPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0];
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
    return null;
  }

  // Example inside your component's return
return (
  <main className="max-w-xl mx-auto p-8">
    {post.coverImageUrl && (
      <div className="w-full h-48 mb-4 rounded overflow-hidden">
        <img
          src={post.coverImageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
    )}
    <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
    <div className="prose">{post.content}</div>
  </main>
);
}