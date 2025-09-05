"use client";
import { posts } from "@/data/posts";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Input } from "@/components/ui/input"; // Shadcn Input

const POSTS_PER_PAGE = 5;
const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const search = searchParams.get("search")?.toLowerCase() || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  // Filter by tag and search
  const filteredPosts = useMemo(() => {
    let filtered = posts;
    if (tag) filtered = filtered.filter((p) => p.tags.includes(tag));
    if (search)
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.content.toLowerCase().includes(search) ||
          p.tags.some((t) => t.toLowerCase().includes(search))
      );
    return filtered;
  }, [tag, search]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  // Handlers
  const handleTag = (t?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (t) params.set("tag", t);
    else params.delete("tag");
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) params.set("search", e.target.value);
    else params.delete("search");
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  const handlePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/?${params.toString()}`);
  };

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div className="mb-4 flex gap-2">
        <button
          className={`px-3 py-1 rounded ${!tag ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => handleTag(undefined)}
        >
          All
        </button>
        {allTags.map((t) => (
          <button
            key={t}
            className={`px-3 py-1 rounded ${tag === t ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => handleTag(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mb-6">
        <Input
          placeholder="Search posts..."
          defaultValue={searchParams.get("search") || ""}
          onChange={handleSearch}
          className="w-full"
        />
      </div>
      <div className="grid gap-6">
        {paginatedPosts.map((post) => (
          <a
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="block border rounded-lg p-4 hover:shadow transition"
          >
            {post.coverImageUrl && (
              <img src={post.coverImageUrl} alt={post.title} className="mb-2 rounded" />
            )}
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <div className="text-sm text-gray-500 mb-2">{post.tags.join(", ")}</div>
            <p className="text-gray-700">{post.content.slice(0, 80)}...</p>
          </a>
        ))}
        {paginatedPosts.length === 0 && (
          <div className="text-gray-500">No posts found.</div>
        )}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            onClick={() => handlePage(page - 1)}
            disabled={page <= 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded ${page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => handlePage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            onClick={() => handlePage(page + 1)}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}