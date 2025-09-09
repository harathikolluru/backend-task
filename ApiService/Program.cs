using System;
using System.Reflection;
using ApiService.BlogPost.Commands;
using ApiService.Python;
using Data;
using FluentValidation.AspNetCore;
using FluentValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;

var builder = WebApplication.CreateBuilder(args);

// Add service defaults & Aspire client integrations.
builder.AddServiceDefaults();

// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
});
builder.Services.AddFluentValidationAutoValidation()
                .AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssemblyContaining<Program>();
builder.Services.AddProblemDetails();
builder.Services.AddCors();
builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
});
builder.Services.AddEndpointsApiExplorer();

// Add database context
builder.Services.AddDbContext<BlogDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("blogdb")));

// Handlers (CQRS)
builder.Services.AddScoped<CreateBlogPostHandler>();
builder.Services.AddScoped<UpdateBlogPostHandler>();
builder.Services.AddScoped<DeleteBlogPostHandler>();

builder.Services.AddOpenApiDocument(options =>
{
    options.DocumentName = "v1";
    options.Title = "BlogPost API";
    options.Version = "v1";
    options.UseHttpAttributeNameAsOperationId = true;

    options.PostProcess = document =>
    {
        document.BasePath = "/";
    };
});

builder.Services.AddHttpClient<PythonClient>(
    static client => client.BaseAddress = new("http://pythonapi"));

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseExceptionHandler();
app.UseCors(static builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader()
           .WithExposedHeaders("*");
});
app.MapDefaultEndpoints();


// Auto-migrate & seed
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<BlogDbContext>();
    db.Database.Migrate();

    if (!db.BlogPosts.Any())
    {
        db.BlogPosts.AddRange(
        new BlogPost
        {
            Title = "React Patterns",
            Slug = "react-patterns",
            Content = "Learn advanced patterns for building React apps.",
            Tags = new List<string> { "react", "patterns", "frontend" },
            CoverImageUrl = "https://example.com/images/react-patterns.png",
            CreatedAt = DateTime.UtcNow
        },
        new BlogPost
        {
            Title = "TypeScript Tips",
            Slug = "typescript-tips",
            Content = "Boost your productivity with TypeScript tips.",
            Tags = new List<string> { "typescript", "tips", "javascript" },
            CoverImageUrl = "https://example.com/images/typescript-tips.png",
            CreatedAt = DateTime.UtcNow
        }
    );
        db.SaveChanges();
    }
    db.SaveChanges();
}
app.UseOpenApi();
app.UseSwaggerUi();
app.MapControllers();
app.Run();