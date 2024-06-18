using System.Reflection;

namespace Order.API;

// Marker class for Order.API assembly.

public static class AssemblyMarker
{
    public static Assembly Assembly => Assembly.GetAssembly(typeof(AssemblyMarker))!;
}