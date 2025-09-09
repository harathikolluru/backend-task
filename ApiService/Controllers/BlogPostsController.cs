using MediatR;
using Microsoft.AspNetCore.Mvc;
using Blog.DTO;
using ApiService.BlogPost.Queries;
using ApiService.BlogPost.Commands;

namespace ApiService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogPostsController(IMediator mediator) : ControllerBase
{
    [HttpGet(Name = nameof(GetBlogPosts))]
    public async Task<IEnumerable<BlogPostDto>> GetBlogPosts([FromQuery] string? tag, [FromQuery] string? search)
        => await mediator.Send(new GetBlogPostsQuery(tag, search));

    [HttpGet("{slug}", Name = nameof(GetBlogPostBySlug))]
    public async Task<ActionResult<BlogPostDto>> GetBlogPostBySlug(string slug)
    {
        var post = await mediator.Send(new GetBlogPostBySlugQuery(slug));
        return post is null ? NotFound() : Ok(post);
    }

    [HttpPost(Name = nameof(CreateBlogPost))]
    public async Task<ActionResult<int>> CreateBlogPost([FromBody] CreateBlogPostDto dto)
    {
        var id = await mediator.Send(new CreateBlogPostCommand(dto));
        return CreatedAtAction(nameof(GetBlogPostBySlug), new { slug = dto.Slug }, id);
    }

    [HttpPut("{id}", Name = nameof(UpdateBlogPost))]
    public async Task<IActionResult> UpdateBlogPost(int id, [FromBody] UpdateBlogPostDto dto)
    {
        await mediator.Send(new UpdateBlogPostCommand(id, dto));
        return NoContent();
    }

    [HttpDelete("{id}", Name = nameof(DeleteBlogPost))]
    public async Task<IActionResult> DeleteBlogPost(int id)
    {
        await mediator.Send(new DeleteBlogPostCommand(id));
        return NoContent();
    }
}
