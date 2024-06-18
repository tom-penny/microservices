namespace Order.ArchitectureTests;

public class ApiLayerTests
{
    private readonly Assembly _api = API.AssemblyMarker.Assembly;
    private readonly Assembly _application = Application.AssemblyMarker.Assembly;
    private readonly Assembly _domain = Domain.AssemblyMarker.Assembly;
    private readonly Assembly _infrastructure = Infrastructure.AssemblyMarker.Assembly;
    
    [Fact]
    public void ApiLayer_ShouldDependOn_ApplicationLayer()
    {
        var name = _application.GetName().Name;

        _api.GetReferencedAssemblies()
            .Should().Contain(a => a.Name == name);
    }
    
    [Fact]
    public void ApiLayer_ShouldDependOn_DomainLayer()
    {
        var name = _domain.GetName().Name;
        
        _api.GetReferencedAssemblies()
            .Should().Contain(a => a.Name == name);
    }
}