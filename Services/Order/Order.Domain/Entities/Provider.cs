namespace Order.Domain.Entities;

using Primitives;

public record ProviderId(Guid Value);

public class Provider : BaseEntity
{
    public required ProviderId Id { get; init; }
    public required string Name { get; set; }
}