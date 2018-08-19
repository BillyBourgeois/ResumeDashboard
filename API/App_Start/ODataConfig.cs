using Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Web.Http;
using System.Web.OData.Builder;
using System.Web.OData.Extensions;

namespace API
{
    public static class ODataConfig
    {
        public static HttpConfiguration Register()
        {
            HttpConfiguration config = new HttpConfiguration();

            //// Attribute routing.
            config.MapHttpAttributeRoutes();
            var builder = new ODataConventionModelBuilder();

            builder.EntitySet<User>("Users");
            builder.EntitySet<Address>("Addresses");
            builder.EntitySet<Company>("Companies");
            builder.EntitySet<Degree>("Degrees");
            builder.EntitySet<Job>("Jobs");
            builder.EntitySet<PhoneNumber>("PhoneNumbers");
            builder.EntitySet<Responsibility>("Responsibilities");
            builder.EntitySet<School>("Schools");
            builder.EntitySet<Skill>("Skills");


            builder.EnableLowerCamelCase();
            config.MapODataServiceRoute("ODataRoute", null, builder.GetEdmModel());
            config.Count().Filter().OrderBy().Expand().Select().MaxTop(null);
            
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "{controller}"
             );

            var settings = new JsonSerializerSettings();
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            settings.Formatting = Formatting.Indented;
            settings.NullValueHandling = NullValueHandling.Ignore;
            config.Formatters.Remove(config.Formatters.XmlFormatter);
            config.Formatters.JsonFormatter.SerializerSettings = settings;

            return config;
        }
    }
}