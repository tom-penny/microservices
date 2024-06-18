namespace Order.Domain.Enums;

public enum OrderStatus
{
    Pending,
    Confirmed,
    Processing,
    Completed,
    Cancelled,
    Failed
}