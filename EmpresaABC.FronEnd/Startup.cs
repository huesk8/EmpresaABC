using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EmpresaABC.FronEnd.Startup))]
namespace EmpresaABC.FronEnd
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
