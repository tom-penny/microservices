namespace Order.Application.Interfaces;

using Domain.Entities;

// Abstraction of EF database context, implemented in Order.Infrastructure.

public interface IApplicationDbContext
{
    DbSet<Order> Orders { get; }
    DbSet<OrderItem> OrderItems { get; }
    DbSet<Payment> Payments { get; }
    DbSet<Provider> Providers { get; }
    DbSet<Shipment> Shipments { get; }
    DbSet<Return> Returns { get; }
    DbSet<Refund> Refunds { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}   