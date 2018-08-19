
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.OData;
using System.Web.OData.Query;
using Data;
using Microsoft.Data.OData;
using System.Diagnostics;

namespace API.Controllers
{

    public class UsersController : BaseOdataController
    {
        private static ODataValidationSettings _validationSettings = new ODataValidationSettings();
        [HttpGet]
        [EnableQuery(MaxExpansionDepth = 5)]
        // GET: api/Users
        public IHttpActionResult GetUsers(ODataQueryOptions<User> queryOptions)
        {            
            IHttpActionResult result = BadRequest();
            try
            {
                queryOptions.Validate(_validationSettings);
                var query = default(IQueryable<User>);
                query = Context.Users;
                result = Ok(query);
            }
            catch (ODataException ex)
            {
                Trace.WriteLine(ex);
                result = BadRequest(ex.Message);
            }
            return result;
        }

        // GET: api/Users(5)
        [HttpGet]
        [EnableQuery(MaxExpansionDepth = 5)]
        public IHttpActionResult GetUser([FromODataUri] int key, ODataQueryOptions<User> queryOptions)
        {
            IHttpActionResult result = BadRequest();
            // validate the query.
            try
            {                
                //queryOptions.Validate(_validationSettings);
                var query = default(User);
                query = Context.Users.Find(key);
                result = Ok(query);
            }
            catch (ODataException ex)
            {
                Trace.WriteLine(ex);
                result = BadRequest(ex.Message);
            }
            return result;
        }

        [EnableQuery(MaxExpansionDepth = 5)]
        public IHttpActionResult GetPhoneNumbers([FromODataUri] int key, ODataQueryOptions<User> queryOptions)
        {
            IHttpActionResult result = BadRequest();
            // validate the query.
            try
            {
                queryOptions.Validate(_validationSettings);
                result = Ok(Context.Users.Find(key).PhoneNumbers);
            }
            catch (ODataException ex)
            {
                Trace.WriteLine(ex);
                result = BadRequest(ex.Message);
            }
            return result;
        }

        [EnableQuery(AllowedQueryOptions = AllowedQueryOptions.None)]
        public IHttpActionResult GetAddresses([FromODataUri] int key, ODataQueryOptions<User> queryOptions)
        {
            IHttpActionResult result = BadRequest();
            // validate the query.
            try
            {
                queryOptions.Validate(_validationSettings);
                result = Ok(Context.Users.Find(key).Addresses);
            }
            catch (ODataException ex)
            {
                Trace.WriteLine(ex);
                result = BadRequest(ex.Message);
            }
            return result;
        }

        [EnableQuery(MaxExpansionDepth = 5)]
        public IHttpActionResult GetJobs([FromODataUri] int key, ODataQueryOptions<User> queryOptions)
        {
            IHttpActionResult result = BadRequest();
            // validate the query.
            try
            {
                //queryOptions.Validate(_validationSettings);
                result = Ok(Context.Users.Find(key).Jobs);
            }
            catch (ODataException ex)
            {
                Trace.WriteLine(ex);
                result = BadRequest(ex.Message);
            }
            return result;
        }

        [EnableQuery(MaxExpansionDepth = 5)]
        public IHttpActionResult GetDegrees([FromODataUri] int key, ODataQueryOptions<User> queryOptions)
        {
            IHttpActionResult result = BadRequest();
            // validate the query.
            try
            {
                result = Ok(Context.Users.Find(key).Degrees);
            }
            catch (ODataException ex)
            {
                Trace.WriteLine(ex);
                result = BadRequest(ex.Message);
            }
            return result;
        }

        [EnableQuery(AllowedQueryOptions = AllowedQueryOptions.None)]
        public IHttpActionResult GetSkills([FromODataUri] int key, ODataQueryOptions<User> queryOptions)
        {
            IHttpActionResult result = BadRequest();
            // validate the query.
            try
            {
                queryOptions.Validate(_validationSettings);
                result = Ok(Context.Users.Find(key).Skills);
            }
            catch (ODataException ex)
            {
                Trace.WriteLine(ex);
                result = BadRequest(ex.Message);
            }
            return result;
        }

        [EnableQuery(AllowedQueryOptions = AllowedQueryOptions.None)]
        public IHttpActionResult GetHobbies([FromODataUri] int key, ODataQueryOptions<User> queryOptions)
        {
            IHttpActionResult result = BadRequest();
            // validate the query.
            try
            {
                queryOptions.Validate(_validationSettings);
                result = Ok(Context.Users.Find(key).Hobbies);
            }
            catch (ODataException ex)
            {
                Trace.WriteLine(ex);
                result = BadRequest(ex.Message);
            }
            return result;
        }

        // PUT: odata/Users(5)
        //public IHttpActionResult Put([FromODataUri] int key, Delta<User> delta)
        //{
        //    Validate(delta.GetEntity());

        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    // TODO: Get the entity here.

        //    // delta.Put(user);

        //    // TODO: Save the patched entity.

        //    // return Updated(user);
        //    return StatusCode(HttpStatusCode.NotImplemented);
        //}

        // POST: odata/Users
        //public IHttpActionResult Post(User user)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    // TODO: Add create logic here.

        //    // return Created(user);
        //    return StatusCode(HttpStatusCode.NotImplemented);
        //}

        // PATCH: odata/Users(5)
        //[AcceptVerbs("PATCH", "MERGE")]
        //public IHttpActionResult Patch([FromODataUri] int key, Delta<User> delta)
        //{
        //    Validate(delta.GetEntity());

        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    // TODO: Get the entity here.

        //    // delta.Patch(user);

        //    // TODO: Save the patched entity.

        //    // return Updated(user);
        //    return StatusCode(HttpStatusCode.NotImplemented);
        //}

        // DELETE: odata/Users(5)
        //public IHttpActionResult Delete([FromODataUri] int key)
        //{
        //    // TODO: Add delete logic here.

        //    // return StatusCode(HttpStatusCode.NoContent);
        //    return StatusCode(HttpStatusCode.NotImplemented);
        //}
    }
}
