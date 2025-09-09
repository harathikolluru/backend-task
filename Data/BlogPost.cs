namespace Data;

public class BlogPost
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public List<string> Tags { get; set; } = new();
    public string? CoverImageUrl { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
