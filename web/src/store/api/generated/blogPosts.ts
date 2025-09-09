/* eslint-disable -- Auto Generated File */
import { emptySplitApi as api } from "../empty-api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBlogPosts: build.query<GetBlogPostsApiResponse, GetBlogPostsApiArg>({
      query: (queryArg) => ({
        url: `/api/BlogPosts`,
        params: {
          tag: queryArg.tag,
          search: queryArg.search,
        },
      }),
    }),
    createBlogPost: build.mutation<
      CreateBlogPostApiResponse,
      CreateBlogPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/BlogPosts`,
        method: "POST",
        body: queryArg.createBlogPostDto,
      }),
    }),
    getBlogPostBySlug: build.query<
      GetBlogPostBySlugApiResponse,
      GetBlogPostBySlugApiArg
    >({
      query: (queryArg) => ({ url: `/api/BlogPosts/${queryArg.slug}` }),
    }),
    updateBlogPost: build.mutation<
      UpdateBlogPostApiResponse,
      UpdateBlogPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/BlogPosts/${queryArg.id}`,
        method: "PUT",
        body: queryArg.updateBlogPostDto,
      }),
    }),
    deleteBlogPost: build.mutation<
      DeleteBlogPostApiResponse,
      DeleteBlogPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/BlogPosts/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as blogPostsApi };
export type GetBlogPostsApiResponse = /** status 200  */ BlogPostDto[];
export type GetBlogPostsApiArg = {
  tag?: string | null;
  search?: string | null;
};
export type CreateBlogPostApiResponse = /** status 200  */ number;
export type CreateBlogPostApiArg = {
  createBlogPostDto: CreateBlogPostDto;
};
export type GetBlogPostBySlugApiResponse = /** status 200  */ BlogPostDto;
export type GetBlogPostBySlugApiArg = {
  slug: string;
};
export type UpdateBlogPostApiResponse = unknown;
export type UpdateBlogPostApiArg = {
  id: number;
  updateBlogPostDto: UpdateBlogPostDto;
};
export type DeleteBlogPostApiResponse = unknown;
export type DeleteBlogPostApiArg = {
  id: number;
};
export type BlogPostDto = {
  id?: number;
  title?: string;
  slug?: string;
  content?: string;
  tags?: string[];
  coverImageUrl?: string | null;
  createdAt?: string;
};
export type CreateBlogPostDto = {
  title?: string;
  slug?: string;
  content?: string;
  tags?: string[];
  coverImageUrl?: string | null;
};
export type UpdateBlogPostDto = {
  title?: string;
  content?: string;
  tags?: string[];
  coverImageUrl?: string | null;
};
export const {
  useGetBlogPostsQuery,
  useCreateBlogPostMutation,
  useGetBlogPostBySlugQuery,
  useUpdateBlogPostMutation,
  useDeleteBlogPostMutation,
} = injectedRtkApi;
