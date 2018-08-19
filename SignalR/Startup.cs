using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Owin;
using SignalR;
using System;

[assembly: OwinStartup(typeof(Startup))]
namespace SignalR
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var hubConfiguration = new HubConfiguration();


#if DEBUG
            hubConfiguration.EnableDetailedErrors = true;
#endif

#if !DEBUG            
           hubConfiguration.EnableDetailedErrors = false;
#endif
            app.MapSignalR("", hubConfiguration);
            //GlobalHost.DependencyResolver.Register(typeof(JsonSerializer), () => JsonSerializerFactory.Value);
            //var poll = new Poll(2000);

        }


    }
}