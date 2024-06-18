using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication;

namespace Order.API;

using Security;

// Service registration for Order.API dependencies.

public static class ConfigureServices
{
    public static IServiceCollection AddApiServices(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("AllowAll",
                builder => builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
            );
        });

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = "ApiKey";
            options.DefaultChallengeScheme = "ApiKey";
        }).AddScheme<AuthenticationSchemeOptions, KeyAuthenticationHandler>("ApiKey", null);

        services.AddAuthorization();
        
        services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        });
        
        services.AddEndpointsApiExplorer();
        
        services.AddSwaggerGen();

        return services;
    }
}