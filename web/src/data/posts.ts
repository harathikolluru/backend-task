export interface Post {
  title: string;
  slug: string;
  content: string;
  tags: string[];
  coverImageUrl?: string;
}

export const posts: Post[] = [
  {
    title: "Advanced React Patterns",
    slug: "advanced-react-patterns",
    content: "Learn advanced patterns for building React apps...",
    tags: ["react", "patterns"],
    coverImageUrl: "/react.png",
  },
  {
    title: "TypeScript Tips",
    slug: "typescript-tips",
    content: "Boost your productivity with these TypeScript tips...",
    tags: ["typescript", "tips"],
    coverImageUrl: "/typescript.jpg",
  }
];