namespace Order.Infrastructure.Persistence;

using Application.Interfaces;
using Domain.Entities;
using Domain.Primitives;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    private readonly IMediator _mediator;
    
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<Provider> Providers { get; set; }
    public DbSet<Shipment> Shipments { get; set; }
    public DbSet<Return> Returns { get; set; }
    public DbSet<Refund> Refunds { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IMediator mediator) : base(options)
    {
        _mediator = mediator;
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        var domainEntities = ChangeTracker.Entries<BaseEntity>()
            .Where(e => e.Entity.Events.Any()).ToList();
        
        // Retrieve domain events for updated entities.

        var domainEvents = domainEntities.SelectMany(e => e.Entity.Events).ToList();
        
        // Clear domain events for updated entities.

        domainEntities.ForEach(e => e.Entity.ClearDomainEvents());
        
        var result = await base.SaveChangesAsync(cancellationToken);
        
        // Publish domain events after changes persisted.
        
        foreach (var domainEvent in domainEvents)
        {
            await _mediator.Publish(domainEvent, cancellationToken);
        }
        
        // domainEntities.ForEach(e => e.Entity.ClearDomainEvents());
        
        return result;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Order>(entity =>
        {
            entity.Property(e => e.Id).HasConversion(v => v.Value, v => new OrderId(v));
            entity.Property(e => e.CheckoutId).HasConversion(v => v.Value, v => new CheckoutId(v));
            entity.Property(e => e.CustomerId).HasConversion(v => v.Value, v => new CustomerId(v));
            entity.Property(e => e.AddressId).HasConversion(v => v.Value, v => new AddressId(v));
            entity.Property(e => e.PaymentId).HasConversion(v => v.Value, v => new PaymentId(v));
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.Property(e => e.Id).HasConversion(v => v.Value, v => new OrderItemId(v));
            entity.Property(e => e.OrderId).HasConversion(v => v.Value, v => new OrderId(v));
            entity.Property(e => e.ProductId).HasConversion(v => v.Value, v => new ProductId(v));
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.Property(e => e.Id).HasConversion(v => v.Value, v => new PaymentId(v));
            entity.Property(e => e.CheckoutId).HasConversion(v => v.Value, v => new CheckoutId(v));
            entity.Property(e => e.ProviderId).HasConversion(v => v.Value, v => new ProviderId(v));
        });
        
        modelBuilder.Entity<Provider>(entity =>
        {
            entity.Property(e => e.Id).HasConversion(v => v.Value, v => new ProviderId(v));
        });

        modelBuilder.Entity<Refund>(entity =>
        {
            entity.Property(e => e.Id).HasConversion(v => v.Value, v => new RefundId(v));
        });
        
        modelBuilder.Entity<Return>(entity =>
        {
            entity.Property(e => e.Id).HasConversion(v => v.Value, v => new ReturnId(v));
            entity.Property(e => e.OrderItemId).HasConversion(v => v.Value, v => new OrderItemId(v));
            entity.Property(e => e.RefundId).HasConversion(v => v.Value, v => new RefundId(v));
        });
        
        modelBuilder.Entity<Shipment>(entity =>
        {
            entity.Property(e => e.Id).HasConversion(v => v.Value, v => new ShipmentId(v));
            entity.Property(e => e.OrderId).HasConversion(v => v.Value, v => new OrderId(v));
            entity.Property(e => e.CarrierId).HasConversion(v => v.Value, v => new CarrierId(v));
        });
        
        base.OnModelCreating(modelBuilder);
    }
}