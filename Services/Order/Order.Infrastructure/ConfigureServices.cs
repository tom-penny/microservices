using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Order.Infrastructure;

using Messaging;
using Messaging.Consumers;
using Persistence;
using Application.Interfaces;
using IntegrationEvents;

// Service registration for Order.Infrastructure dependencies.

public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        // Register EF Core with Postgres database.
        
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseNpgsql(configuration["Database:ConnectionString"]);
        });

        services.AddScoped<IApplicationDbContext>(provider =>
            provider.GetRequiredService<ApplicationDbContext>());

        // Register Mass Transit message bus with RabbitMQ.
        
        services.AddMassTransit(x =>
        {
            x.AddConsumer<OrderCheckoutConsumer>();
            x.AddConsumer<OrderValidationConsumer>();
            
            x.UsingRabbitMq((context, cfg) =>
            {
                cfg.Host(new Uri(configuration["MessageBroker:Host"]!), h =>
                {
                    // h.Username(configuration["MessageBroker:Username"]);
                    // h.Password(configuration["MessageBroker:Password"]);
                });
                
                cfg.Message<OrderConfirmedEvent>(m =>
                {
                    m.SetEntityName("order_confirmed");
                });
                
                cfg.Message<OrderShippedEvent>(m =>
                {
                    m.SetEntityName("order_shipped");
                });

                cfg.ReceiveEndpoint("checkout", e =>
                {
                    e.ConfigureConsumer<OrderCheckoutConsumer>(context);
                    e.ConfigureConsumeTopology = false;
                    e.ClearSerialization();
                    e.UseRawJsonSerializer();
                });
                
                cfg.ReceiveEndpoint("validation", e =>
                {
                    e.ConfigureConsumer<OrderValidationConsumer>(context);
                    e.ConfigureConsumeTopology = false;
                    e.ClearSerialization();
                    e.UseRawJsonSerializer();
                });
                
                cfg.UseRawJsonSerializer();
            });
        });

        services.AddScoped<IEventBus, MassTransitEventBus>();
        services
            .AddTransient<INotificationHandler<Order.Domain.Events.OrderConfirmed>,
                Order.Application.Orders.Events.OrderConfirmedHandler>();
        
        return services;
    }
}