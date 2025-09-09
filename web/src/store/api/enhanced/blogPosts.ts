import { blogPostsApi } from "../generated/blogPosts";

const enhancedBlogPostsApi = blogPostsApi.enhanceEndpoints({
  addTagTypes: ["BlogPosts"],
  endpoints: {
    getBlogPosts: {
      providesTags: ['BlogPosts'],
    },
    createBlogPost: {
      invalidatesTags: ["BlogPosts"],
    },
    deleteBlogPost: {
      invalidatesTags: ["BlogPosts"],
    },
    updateBlogPost: {
      invalidatesTags: ["BlogPosts"],
    },
  },
});

export const {
  useGetBlogPostsQuery,
  useCreateBlogPostMutation,
  useGetBlogPostBySlugQuery,
  useUpdateBlogPostMutation,
  useDeleteBlogPostMutation,
} = enhancedBlogPostsApi;