import CreateBlogPostForm from "./CreateBlogPostForm";
import BlogPostList from "./BlogPostList";

export default function HomePage() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-6">Blog Posts</h1>
      <CreateBlogPostForm />
      <BlogPostList />
    </main>
  );
}