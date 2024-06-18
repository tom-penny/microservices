namespace Order.Infrastructure.Messaging.Messages;

public record OrderValidationMessage(Guid OrderId, bool IsValid);