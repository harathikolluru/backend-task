using Data;
using MediatR;

namespace ApiService.BlogPost.Commands
{
    public record DeleteBlogPostCommand(int Id) : IRequest;
    public class DeleteBlogPostHandler(BlogDbContext db) : IRequestHandler<DeleteBlogPostCommand>
    {
        public async Task Handle(DeleteBlogPostCommand request, CancellationToken cancellationToken)
        {
            var entity = await db.BlogPosts.FindAsync([request.Id], cancellationToken);
            if (entity is null) throw new KeyNotFoundException();
            db.BlogPosts.Remove(entity);
            await db.SaveChangesAsync(cancellationToken);
        }
    }
}
