using System.Reflection;

namespace Order.Application;

// Marker class for Order.Application assembly.

public static class AssemblyMarker
{
    public static Assembly Assembly => Assembly.GetAssembly(typeof(AssemblyMarker))!;
}