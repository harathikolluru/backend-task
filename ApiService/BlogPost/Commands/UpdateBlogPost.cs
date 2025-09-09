using Blog.DTO;
using Data;
using MediatR;

namespace ApiService.BlogPost.Commands
{
    public record UpdateBlogPostCommand(int Id, UpdateBlogPostDto Dto) : IRequest;
    public class UpdateBlogPostHandler(BlogDbContext db) : IRequestHandler<UpdateBlogPostCommand>
    {
        public async Task Handle(UpdateBlogPostCommand request, CancellationToken cancellationToken)
        {
            var entity = await db.BlogPosts.FindAsync([request.Id], cancellationToken);
            if (entity is null) throw new KeyNotFoundException();
            entity.Title = request.Dto.Title;
            entity.Content = request.Dto.Content;
            entity.Tags = request.Dto.Tags;
            entity.CoverImageUrl = request.Dto.CoverImageUrl;
            await db.SaveChangesAsync(cancellationToken);
        }
    }
}
