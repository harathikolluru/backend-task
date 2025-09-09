using Blog.DTO;
using FluentValidation;

namespace ApiService.BlogPost.Validators
{
    public class CreateBlogPostDtoValidator : AbstractValidator<CreateBlogPostDto>
    {
        public CreateBlogPostDtoValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required.")
                .MaximumLength(200);

            RuleFor(x => x.Slug)
                .NotEmpty().WithMessage("Slug is required.")
                .MaximumLength(100);

            RuleFor(x => x.Content)
                .NotEmpty().WithMessage("Content is required.");

            RuleFor(x => x.Tags)
                .NotNull()
                .Must(tags => tags.Count > 0).WithMessage("At least one tag is required.");

            RuleForEach(x => x.Tags)
                .NotEmpty().WithMessage("Tags cannot be empty.");
        }
    }
}
