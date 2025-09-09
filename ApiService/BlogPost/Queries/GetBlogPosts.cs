using Blog.DTO;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ApiService.BlogPost.Queries
{
    public record GetBlogPostsQuery(string? Tag = null, string? Search = null) : IRequest<IEnumerable<BlogPostDto>>;
    public record GetBlogPostBySlugQuery(string Slug) : IRequest<BlogPostDto?>;
    public class GetBlogPostsHandler(BlogDbContext db) : IRequestHandler<GetBlogPostsQuery, IEnumerable<BlogPostDto>>
    {
        public async Task<IEnumerable<BlogPostDto>> Handle(GetBlogPostsQuery request, CancellationToken cancellationToken)
        {
            var query = db.BlogPosts.AsQueryable();
            if (!string.IsNullOrEmpty(request.Tag))
                query = query.Where(p => p.Tags.Contains(request.Tag));
            if (!string.IsNullOrEmpty(request.Search))
                query = query.Where(p => p.Title.Contains(request.Search) || p.Content.Contains(request.Search));
            return await query
                .OrderByDescending(p => p.CreatedAt)
                .Select(p => new BlogPostDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    Slug = p.Slug,
                    Content = p.Content,
                    Tags = p.Tags,
                    CoverImageUrl = p.CoverImageUrl,
                    CreatedAt = p.CreatedAt
                })
                .ToListAsync(cancellationToken);
        }
    }

    public class GetBlogPostBySlugHandler(BlogDbContext db) : IRequestHandler<GetBlogPostBySlugQuery, BlogPostDto?>
    {
        public async Task<BlogPostDto?> Handle(GetBlogPostBySlugQuery request, CancellationToken cancellationToken)
        {
            var post = await db.BlogPosts.FirstOrDefaultAsync(p => p.Slug == request.Slug, cancellationToken);
            return post is null ? null : new BlogPostDto
            {
                Id = post.Id,
                Title = post.Title,
                Slug = post.Slug,
                Content = post.Content,
                Tags = post.Tags,
                CoverImageUrl = post.CoverImageUrl,
                CreatedAt = post.CreatedAt
            };
        }
    }
}
