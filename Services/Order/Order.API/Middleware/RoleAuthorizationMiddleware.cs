using System.Security.Claims;

namespace Order.API.Middleware;

public class RoleAuthorizationMiddleware
{
    private readonly RequestDelegate _next;

    public RoleAuthorizationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Headers.TryGetValue("x-user-roles", out var rolesHeader))
        {
            var roles = rolesHeader.ToString().Split(',');
            
            var identity = context.User.Identity as ClaimsIdentity;

            foreach (var role in roles)
            {
                identity?.AddClaim(new Claim(ClaimTypes.Role, role));
            }
        }

        await _next(context);
    }
}