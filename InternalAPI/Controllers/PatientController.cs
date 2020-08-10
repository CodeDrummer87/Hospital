using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntityLibrary;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace InternalAPI.Controllers
{
    [Route("api/patient")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        [Route("create")]
        [HttpPost]
        public string Post([FromBody]object data)
        {
            Patient patient = JsonConvert.DeserializeObject<Patient>(data.ToString());

            return null;
        }
    }
}