using System.Reflection;

namespace Order.Infrastructure;

// Marker class for Order.Infrastructure assembly.

public static class AssemblyMarker
{
    public static Assembly Assembly => Assembly.GetAssembly(typeof(AssemblyMarker))!;
}