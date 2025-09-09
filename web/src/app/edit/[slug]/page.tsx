import EditBlogPostForm from "@/app/EditBlogPostForm";

export default function EditPage() {
  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>
      <EditBlogPostForm />
    </div>
  );
}