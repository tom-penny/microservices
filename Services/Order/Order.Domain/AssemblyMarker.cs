using System.Reflection;

namespace Order.Domain;

// Marker class for Order.Domain assembly.

public static class AssemblyMarker
{
    public static Assembly Assembly => Assembly.GetAssembly(typeof(AssemblyMarker))!;
}