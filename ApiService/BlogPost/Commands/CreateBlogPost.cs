using Blog.DTO;
using Data;
using MediatR;

namespace ApiService.BlogPost.Commands
{
    public record CreateBlogPostCommand(CreateBlogPostDto Dto) : IRequest<int>;
    public class CreateBlogPostHandler(BlogDbContext db) : IRequestHandler<CreateBlogPostCommand, int>
    {
        public async Task<int> Handle(CreateBlogPostCommand request, CancellationToken cancellationToken)
        {
            var entity = new Data.BlogPost
            {
                Title = request.Dto.Title,
                Slug = request.Dto.Slug,
                Content = request.Dto.Content,
                Tags = request.Dto.Tags,
                CoverImageUrl = request.Dto.CoverImageUrl,
                CreatedAt = DateTime.UtcNow
            };
            db.BlogPosts.Add(entity);
            await db.SaveChangesAsync(cancellationToken);
            return entity.Id;
        }
    }
}
