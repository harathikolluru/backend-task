"use client";
import { useGetBlogPostsQuery, useDeleteBlogPostMutation } from "@/store/api/enhanced/blogPosts";
import { Button } from "@/components/ui/button";

export default function BlogPostList() {
  const { data: posts, isLoading, error } = useGetBlogPostsQuery({});
  const [deleteBlogPost, { isLoading: isDeleting }] = useDeleteBlogPostMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id} className="mb-4 border p-4 rounded">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p>{post.content}</p>
          <div className="flex gap-2 mt-2">
            <Button
              variant="destructive"
              onClick={() => deleteBlogPost({ id: post.id! })}
              disabled={isDeleting}
            >
              Delete
            </Button>
            {/* Add Edit button here */}
            <Button
              variant="secondary"
              onClick={() => window.location.href = `/edit/${post.slug}`}
            >
              Edit
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}