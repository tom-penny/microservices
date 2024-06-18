namespace Order.ArchitectureTests;

public class InfrastructureLayerTests
{
    private readonly Assembly _api = API.AssemblyMarker.Assembly;
    private readonly Assembly _application = Application.AssemblyMarker.Assembly;
    private readonly Assembly _domain = Domain.AssemblyMarker.Assembly;
    private readonly Assembly _infrastructure = Infrastructure.AssemblyMarker.Assembly;
    
    [Fact]
    public void InfrastructureLayer_ShouldNotDependOn_ApiLayer()
    {
        var name = _api.GetName().Name;

        _infrastructure.GetReferencedAssemblies()
            .Should().NotContain(a => a.Name == name);
    }
    
    [Fact]
    public void InfrastructureLayer_ShouldDependOn_ApplicationLayer()
    {
        var name = _application.GetName().Name;
        
        _infrastructure.GetReferencedAssemblies()
            .Should().Contain(a => a.Name == name);
    }
    
    [Fact]
    public void InfrastructureLayer_ShouldDependOn_DomainLayer()
    {
        var name = _domain.GetName().Name;
        
        _infrastructure.GetReferencedAssemblies()
            .Should().Contain(a => a.Name == name);
    }
}