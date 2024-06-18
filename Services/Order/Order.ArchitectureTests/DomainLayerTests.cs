namespace Order.ArchitectureTests;

public class DomainLayerTests
{
    private readonly Assembly _api = API.AssemblyMarker.Assembly;
    private readonly Assembly _application = Application.AssemblyMarker.Assembly;
    private readonly Assembly _domain = Domain.AssemblyMarker.Assembly;
    private readonly Assembly _infrastructure = Infrastructure.AssemblyMarker.Assembly;
    
    [Fact]
    public void DomainLayer_ShouldNotDependOn_ApiLayer()
    {
        var name = _api.GetName().Name;

        _domain.GetReferencedAssemblies()
            .Should().NotContain(a => a.Name == name);
    }
    
    [Fact]
    public void DomainLayer_ShouldNotDependOn_ApplicationLayer()
    {
        var name = _application.GetName().Name;
        
        _domain.GetReferencedAssemblies()
            .Should().NotContain(a => a.Name == name);
    }
    
    [Fact]
    public void DomainLayer_ShouldNotDependOn_InfrastructureLayer()
    {
        var name = _infrastructure.GetName().Name;

        _domain.GetReferencedAssemblies()
            .Should().NotContain(a => a.Name == name);
    }
}