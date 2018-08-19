using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace SignalR
{
    public class Hub : Microsoft.AspNet.SignalR.Hub
    {
        private static IHubContext context = GlobalHost.ConnectionManager.GetHubContext<Hub>();
        public async override System.Threading.Tasks.Task OnConnected()
        {
            ////adds users to group with user name.  this allows users to be connected to multiple devices.
            string name = Context.User.Identity.Name;
            var agent = Context.Request.Headers["user-agent"] ?? String.Empty;            
            await context.Groups.Add(Context.ConnectionId, name);
            await base.OnConnected();
        }

        public override System.Threading.Tasks.Task OnReconnected()
        {
            string name = Context.User.Identity.Name;
            var agent = Context.Request.Headers["user-agent"] ?? String.Empty;
            context.Groups.Add(Context.ConnectionId, name);            
            return base.OnReconnected();
        }

        public override System.Threading.Tasks.Task OnDisconnected(bool stopCalled)
        {
            return base.OnDisconnected(stopCalled);
        }
    }
}