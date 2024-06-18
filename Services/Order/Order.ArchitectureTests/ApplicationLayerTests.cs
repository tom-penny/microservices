namespace Order.ArchitectureTests;

public class ApplicationLayerTests
{
    private readonly Assembly _api = API.AssemblyMarker.Assembly;
    private readonly Assembly _application = Application.AssemblyMarker.Assembly;
    private readonly Assembly _domain = Domain.AssemblyMarker.Assembly;
    private readonly Assembly _infrastructure = Infrastructure.AssemblyMarker.Assembly;
    
    [Fact]
    public void ApplicationLayer_ShouldNotDependOn_ApiLayer()
    {
        var name = _api.GetName().Name;

        _application.GetReferencedAssemblies()
            .Should().NotContain(a => a.Name == name);
    }
    
    [Fact]
    public void ApplicationLayer_ShouldDependOn_DomainLayer()
    {
        var name = _domain.GetName().Name;
        
        _application.GetReferencedAssemblies()
            .Should().Contain(a => a.Name == name);
    }
    
    [Fact]
    public void ApplicationLayer_ShouldNotDependOn_InfrastructureLayer()
    {
        var name = _infrastructure.GetName().Name;

        _application.GetReferencedAssemblies()
            .Should().NotContain(a => a.Name == name);
    }
}