using System.Web.OData;
using Data;

namespace API.Controllers
{
    public class BaseOdataController : ODataController
    {
        private ResumeContext context = default(ResumeContext);

        public ResumeContext Context
        {
            get
            {
                if (context == default(ResumeContext))
                {
                    context = new ResumeContext();                    
                }
                return context;
            }
        }

        protected override void Dispose(bool disposing)
        {
            Context.Dispose();
            base.Dispose(disposing);
        }
    }
}